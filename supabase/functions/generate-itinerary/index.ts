import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// CORS Headers for React Native / Web compatibility
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Parse Request Payload
    const { destination, startDate, endDate, interests } = await req.json()

    // Basic Validation
    if (!destination || !startDate || !endDate) {
      throw new Error("Missing required fields: destination, startDate, and endDate.")
    }

    // 3. Access Environment Variables Securely
    // Add these via Supabase CLI: supabase secrets set OPENAI_API_KEY=your_key
    const openWeatherApiKey = Deno.env.get('OPENWEATHER_API_KEY')
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')

    if (!openaiApiKey) {
      throw new Error("OpenAI API key not configured in Edge Function environments.")
    }

    // 4. Fetch Weather Data (OpenWeatherMap)
    let weatherDescription = "Weather data unavailable."
    if (openWeatherApiKey) {
      try {
        // Fetch current weather as a simplified example. 
        // For production, consider using a 5-day forecast API or passing geo-coords.
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(destination)}&appid=${openWeatherApiKey}&units=metric`
        const weatherRes = await fetch(weatherUrl)
        if (weatherRes.ok) {
          const weatherData = await weatherRes.json()
          weatherDescription = `${weatherData.weather[0].description}, ${weatherData.main.temp}°C`
        }
      } catch (err) {
        console.error("Error fetching weather:", err)
      }
    }

    // 5. Build the AI System Prompt
    // Formatted to ensure the AI behaves as a world-class guide and outputs strict JSON.
    const systemPrompt = `
You are a world-class travel guide and concierge with deep knowledge of global destinations, local secrets, and optimal travel pacing. Your goal is to create realistic, engaging, and perfectly paced itineraries for digital nomads and solo travelers. 

Return your response STRICTLY as a JSON object matching the exact schema provided below. Do not include any conversational text, markdown formatting blocks (e.g., \`\`\`json), or explanations outside of the JSON.

Context for this itinerary:
- Destination: ${destination}
- Dates: ${startDate} to ${endDate}
- Interests: ${interests && interests.length > 0 ? interests.join(', ') : 'General exploration, culture, and local food'}
- Expected Weather at Destination: ${weatherDescription}

JSON Schema Requirements:
{
  "title": "String - Catchy title for the trip",
  "destination": "String",
  "summary": "String - A brief appealing overview of the itinerary considering the weather",
  "days": [
    {
      "day": "Number - Day index (1, 2, ...)",
      "date": "String - The chronological date (e.g., 'YYYY-MM-DD' or readable 'Mon, Jan 15')",
      "activities": {
        "morning": {
          "title": "String - Brief title for morning",
          "places": ["String - Specific place or venue"],
          "food": "String - Breakfast/coffee recommendation",
          "description": "String - Detailed plan for the morning",
          "weatherPlaceholder": "String - Note based on Expected Weather (e.g., 'Pack sunscreen')"
        },
        "afternoon": {
          "title": "String",
          "places": ["String"],
          "food": "String - Lunch/snack recommendation",
          "description": "String",
          "weatherPlaceholder": "String"
        },
        "evening": {
          "title": "String",
          "places": ["String"],
          "food": "String - Dinner/drinks recommendation",
          "description": "String",
          "weatherPlaceholder": "String"
        }
      }
    }
  ],
  "tips": ["String - Assorted travel tips specific to this destination and a solo traveler/digital nomad"]
}
`

    // 6. Call the AI Model (OpenAI)
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Recommended for reliable JSON adherence
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please generate my itinerary for ${destination} from ${startDate} to ${endDate}.` }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text()
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const aiData = await aiResponse.json()
    const generatedContent = aiData.choices[0].message.content

    // 7. Parse AI Output to Validate JSON
    let parsedItinerary;
    try {
      parsedItinerary = JSON.parse(generatedContent)
    } catch(e) {
      // Fallback: Strip markdown if the AI mistakenly includes it
      const cleaned = generatedContent.replace(/```json/g, '').replace(/```/g, '').trim()
      parsedItinerary = JSON.parse(cleaned)
    }

    // 8. Return JSON Response to Frontend
    return new Response(JSON.stringify(parsedItinerary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    // Return friendly error structure if anything fails
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
