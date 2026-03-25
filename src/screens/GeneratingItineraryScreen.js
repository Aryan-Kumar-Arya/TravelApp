import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { MOCK_ITINERARIES } from '../data/mockItineraries';

const { width } = Dimensions.get('window');

// Mock data generation for now until the backend is fully hooked up
const MOCK_ITINERARY = {
  title: "A Parisian Dream",
  destination: "Paris, France",
  summary: "A perfect blend of art, history, and culinary delights in the City of Light.",
  days: [
    {
      day: 1,
      date: "Day 1",
      activities: {
        morning: {
          title: "Art & Architecture",
          places: ["Louvre Museum"],
          food: "Café Marly",
          description: "Start your trip exploring the world's largest art museum and its iconic glass pyramid.",
          weatherPlaceholder: "Sunny, pack sunglasses"
        },
        afternoon: {
          title: "Stroll along the Seine",
          places: ["Notre-Dame Cathedral", "Sainte-Chapelle"],
          food: "Crêpes from a street vendor",
          description: "Take a leisurely walk along the river, visit the historic cathedral, and admire stunning stained glass.",
          weatherPlaceholder: "Mild, comfortable for walking"
        },
        evening: {
          title: "Eiffel Tower Sparkle",
          places: ["Eiffel Tower", "Trocadéro"],
          food: "Dinner at Le Jules Verne",
          description: "Experience the magic of the Eiffel Tower sparkling at night from the best vantage points.",
          weatherPlaceholder: "Cool breeze, bring a light jacket"
        }
      }
    }
  ],
  tips: ["Buy a Paris Museum Pass to skip the lines.", "Learn a few basic French phrases like 'Bonjour' and 'Merci'."]
};

export default function GeneratingItineraryScreen({ route, navigation }) {
  const { destination, startDate, endDate, selectedInterests } = route.params || {};

  // Animation Values
  const pulseScale = useSharedValue(1);
  const loadingTextOpacity = useSharedValue(0.5);
  const progressBarWidth = useSharedValue(0);

  useEffect(() => {
    // 1. Start breathing pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1, // Infinite
      true
    );

    // 2. Start pulsing text
    loadingTextOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.4, { duration: 800 })
      ),
      -1,
      true
    );

    // 3. Start fake progress bar
    progressBarWidth.value = withTiming(width * 0.8, { duration: 3000 });

    // 4. Simulate API Call (Replace with actual Supabase Edge Function call later)
    const generateItinerary = async () => {
      try {
        console.log("Generating for:", { destination, startDate, endDate, selectedInterests });
        
        // --- REAL API CALL PLACEHOLDER ---
        // const { data, error } = await supabase.functions.invoke('generate-itinerary', {
        //   body: { destination, startDate, endDate, interests: selectedInterests }
        // });
        // if (error) throw error;
        // ---------------------------------

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 3500));
        
        // Grab the matching mock itinerary from our dictionary, or fall back to the generic MOCK_ITINERARY
        const matchedItinerary = destination && MOCK_ITINERARIES[destination] 
          ? MOCK_ITINERARIES[destination] 
          : MOCK_ITINERARY;

        // Navigate to results
        navigation.replace('ItineraryDetailScreen', { itinerary: matchedItinerary });
        
      } catch (err) {
        console.error("Failed to generate itinerary:", err);
        alert("Something went wrong generating your trip. Please try again.");
        navigation.goBack();
      }
    };

    generateItinerary();
  }, [destination, startDate, endDate, selectedInterests]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: loadingTextOpacity.value,
  }));

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: progressBarWidth.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Animated.View style={[styles.iconContainer, animatedLogoStyle]}>
          <Text style={styles.iconElement}>✨</Text>
        </Animated.View>

        <Animated.Text style={[styles.mainTitle, animatedTextStyle]}>
          Crafting Your Journey...
        </Animated.Text>
        
        <Text style={styles.subtitle}>
          Our AI is scanning {destination || "the globe"} for the best spots, workspaces, and hidden gems.
        </Text>

        <View style={styles.progressTrack}>
           <Animated.View style={[styles.progressBar, animatedProgressStyle]} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(107, 98, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#6B62FF',
  },
  iconElement: {
    fontSize: 50,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 60,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#2A2B38',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6B62FF',
    borderRadius: 3,
  }
});
