# City Recommendation Research Prompt

Copy the prompt below and replace `[CITY]` with the city name. Paste it into a new Claude Code conversation.

---

## Prompt

```
Research and replace recommendation cards for [CITY] in `src/data/recommendations.js`.

Follow the template at `scripts/recommendation-research-template.md` exactly. Read that file first.

### What to do

1. **Read the template** — `scripts/recommendation-research-template.md` has the exact schema, field rules, slot mix, writing guide, and anti-patterns.

2. **Read the existing [CITY] data** — Search `recommendations.js` for the current `[city-slug]-cuisine-001` through `[city-slug]-stays-010` entries. Note the `region`, `country`, `timezone`, and coordinate range so you match them in the new data.

3. **Research all 3 categories using web search** — Search for real, top-rated, currently operating places:
   - **Cuisine (10):** Search "best restaurants [CITY]", "best food [CITY]", "where locals eat [CITY]", "top restaurants [CITY] TripAdvisor". Fetch blog articles for deeper detail. Mix: 3 iconic local dishes, 2 traveller cafes, 3 hyper-local/street food, 2 unique finds.
   - **Experience (10):** Search "best things to do [CITY]", "top attractions [CITY]", "hidden gems [CITY]". Mix: 2 iconic, 2 adventure, 2 cultural/spiritual, 2 offbeat, 2 sunset/nature.
   - **Stays (10):** Search "best hostels [CITY]", "best hotels [CITY]", "where to stay [CITY]", "homestays [CITY]". Mix: 3 budget hostels, 2 mid-range, 2 character/heritage, 1 unique, 1 mid-premium, 1 luxury.

4. **Present as 3 review tables** before writing any code. Each table has columns:

   | # | Source | Title | Location | Description |

   No price column. No webLink column. Pricing info lives inside description.

5. **Wait for my approval.** I may ask to swap, edit, or adjust entries.

6. **Only after approval**, replace the old [CITY] entries in `recommendations.js` with the new data. Match the exact JS object structure from the template — no extra fields, no missing fields.

### Rules (from the template)

- **Schema:** Only these fields: uniqueId, city, region, country, coordinates, timezone, recNumber, tag, source, title, location, description, photo, webLink. No price field. No extras.
- **title:** Minimalistic — just the dish/activity/property name. Never include the venue in the title.
- **location:** Minimalistic — just the venue or spot name. No neighbourhood suffix.
- **description:** 1-3 vivid sentences. Include pricing in INR here. Practical tips. Sensory language. Write like a knowledgeable friend, not a guidebook.
- **Cuisine must reflect the actual local food culture** of the city/region. Do not recommend North Indian dishes in South Indian cities or vice versa.
- **webLink:** Real, verifiable URLs only — TripAdvisor, Booking.com, Hostelworld, official sites, tourism boards.
- **coordinates:** Specific to each spot, not city centre.
- **source:** Roughly 50/50 split between 'local' and 'traveller' per category.
- **Anti-patterns to avoid:** Generic templates, vague praise, same description with swapped nouns, filler phrases like "arrive early before they sell out".
```

---

## Usage

```
Research and replace recommendation cards for Puducherry in src/data/recommendations.js.
Follow the template at scripts/recommendation-research-template.md exactly. Read that file first.
...
```

Or shorter — if you've already used this prompt before in the project and Claude has context:

```
Same process as Varkala — research and replace recommendations for Puducherry.
Read scripts/recommendation-research-template.md first.
```
