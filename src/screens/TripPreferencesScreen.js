import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ALL_DEMO_CITIES } from '../data/mockData';

const INTERESTS = [
  'Foodie', 'Nightlife', 'Culture & History', 'Nature', 'Workspaces', 'Adventure', 'Relaxation', 'Shopping'
];

export default function TripPreferencesScreen({ navigation: propNavigation, isEmbedded, currentTrip }) {
  const hookNavigation = useNavigation();
  const navigation = propNavigation || hookNavigation;

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null);     
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  // Autocomplete state
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Pre-fill data if we're generating a trip based on an existing one
  React.useEffect(() => {
    if (currentTrip) {
      if (currentTrip.destination_city) setDestination(currentTrip.destination_city);
      if (currentTrip.start_date) setStartDate(currentTrip.start_date);
      if (currentTrip.end_date) setEndDate(currentTrip.end_date);
    }
  }, [currentTrip]);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) => 
      prev.includes(interest) 
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleDestinationChange = (text) => {
    setDestination(text);
    if (text.trim().length > 0) {
      const filtered = ALL_DEMO_CITIES.filter(city => 
        city.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
    }
  };

  const selectCity = (city) => {
    setDestination(city);
    setShowSuggestions(false);
    Keyboard.dismiss();
  };

  const handleContinue = () => {
    // Basic safety validation
    if (!destination.trim()) {
      alert("Please enter a destination to continue.");
      return;
    }
    
    // In a real app, you would pass these params to the GeneratingItineraryScreen
    navigation.navigate('GeneratingItineraryScreen', { destination, startDate, endDate, selectedInterests });
    console.log("Navigating to generation with:", { destination, startDate, endDate, selectedInterests });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.scrollContent, isEmbedded && styles.embeddedScrollContent]}
              keyboardShouldPersistTaps="handled" // Important so tapping pills doesn't just dismiss keyboard
            >
              {/* Header Section (Hide if embedded in Explore tab) */}
              {!isEmbedded && (
                <View style={styles.headerContainer}>
                  <Text style={styles.eyebrow}>PLAN YOUR TRIP</Text>
                  <Text style={styles.title}>Where to next?</Text>
                  <Text style={styles.subtitle}>
                    Tell us about your ideal journey & let our AI craft the perfect itinerary.
                  </Text>
                </View>
              )}

              {/* Destination Input */}
              <View style={[styles.inputSection, { zIndex: 10 }]}>
                <Text style={styles.sectionTitle}>Destination</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. 'Tokyo, Japan' or 'Bali'"
                    placeholderTextColor="#8E8E93"
                    value={destination}
                    onChangeText={handleDestinationChange}
                    onFocus={() => {
                        if (destination.trim().length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                  />
                  {showSuggestions && filteredCities.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                      <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
                        {filteredCities.map((city, index) => (
                          <TouchableOpacity 
                            key={index}
                            style={[
                                styles.suggestionItem,
                                index === filteredCities.length - 1 && styles.suggestionItemLast
                            ]}
                            onPress={() => selectCity(city)}
                          >
                            <Text style={styles.suggestionText}>{city}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>

              {/* Dates Row (Using your dashed aesthetic for empty states) */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>Dates</Text>
                <View style={styles.datesRow}>
                  <TouchableOpacity style={styles.dateButton}>
                    <Text style={[styles.dateButtonText, !startDate && styles.dateButtonTextEmpty]}>
                      {startDate ? startDate : "Add Start Date +"}
                    </Text>
                  </TouchableOpacity>
                  
                  <View style={styles.dateSpacer} />

                  <TouchableOpacity style={styles.dateButton}>
                    <Text style={[styles.dateButtonText, !endDate && styles.dateButtonTextEmpty]}>
                      {endDate ? endDate : "Add End Date +"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Interests Grid */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>Your Vibe</Text>
                <View style={styles.interestsGrid}>
                  {INTERESTS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <TouchableOpacity
                        key={interest}
                        style={[
                          styles.pill,
                          isSelected && styles.pillSelected
                        ]}
                        onPress={() => toggleInterest(interest)}
                        activeOpacity={0.7}
                      >
                        <Text style={[
                          styles.pillText,
                          isSelected && styles.pillTextSelected
                        ]}>
                          {interest}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>

            {/* Bottom Sticky Action Button */}
            <View style={[styles.footer, isEmbedded && styles.embeddedFooter]}>
              {/* Using accent color for primary CTA makes it pop */}
              <TouchableOpacity 
                style={styles.continueButton} 
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Generate AI Itinerary ✨</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 120, // Extra padding to ensure content isn't hidden behind the sticky footer
  },
  embeddedScrollContent: {
    paddingTop: 10, // Less top padding when inside a tab
    paddingBottom: 140, // A bit more room for the tab bar + sticky button
  },
  headerContainer: {
    marginBottom: 40,
  },
  eyebrow: {
    color: '#6B62FF',
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 2,
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 12,
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 16,
    lineHeight: 24,
  },
  inputSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#2A2B38',
    borderRadius: 16,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 18,
    minHeight: 56,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#1E1D33', // Slightly darker than the input for contrast
    borderRadius: 16,
    marginTop: 8,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#4A4B58',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
    overflow: 'hidden',
  },
  suggestionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2B38',
  },
  suggestionItemLast: {
    borderBottomWidth: 0,
  },
  suggestionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  datesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#2A2B38',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#4A4B58',
    minHeight: 56,
  },
  dateSpacer: {
    width: 16,
  },
  dateButtonText: {
    color: '#FFFFFF', // Color when a date is selected
    fontSize: 14,
    fontWeight: '600',
  },
  dateButtonTextEmpty: {
    color: '#8E8E93', // Color when empty ("Add Date +")
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pill: {
    backgroundColor: '#2A2B38',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillSelected: {
    borderColor: '#6B62FF',
    backgroundColor: '#1E1D33', // Your subtle tint for selected state
  },
  pillText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20, // Safe padding for home indicator
    backgroundColor: '#121212', // Solid background so scrolling text doesn't show through
    borderTopWidth: 1,
    borderTopColor: '#2A2B38', // subtle separator
  },
  embeddedFooter: {
      paddingBottom: 110, // Needs to avoid the bottom tab navigation bar of the app
  },
  continueButton: {
    backgroundColor: '#6B62FF', // High impact Accent CTA
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6B62FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
