import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    FlatList,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { theme as T } from '../theme/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { LOCATIONS } from '../data/locations';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function TripDetailsScreen({ route, navigation }) {
    const { completeTripSetup, currentUser, signUp, logIn, completeProfileSetup, addLikedRecommendation } = useAuth();
    
    // Form State
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    // Autocomplete State
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    // Date Picker State
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [hasSelectedStartDate, setHasSelectedStartDate] = useState(false);
    const [hasSelectedEndDate, setHasSelectedEndDate] = useState(false);
    
    // Animation State
    const [isGenerating, setIsGenerating] = useState(false);
    
    // New Advanced Animation Values
    const globeRotation = useSharedValue(0);
    const ring1Scale = useSharedValue(1);
    const ring1Opacity = useSharedValue(1);
    const ring2Scale = useSharedValue(1);
    const ring2Opacity = useSharedValue(1);
    const ring3Scale = useSharedValue(1);
    const ring3Opacity = useSharedValue(1);
    const textOpacity = useSharedValue(0.5);

    useEffect(() => {
        if (isGenerating) {
            globeRotation.value = withRepeat(withTiming(360, { duration: 4000 }), -1, false);
            
            // Staggered ripples
            const createRipple = (scale, opacity) => {
                scale.value = 1;
                opacity.value = 1;
                scale.value = withRepeat(withTiming(4, { duration: 2500 }), -1, false);
                opacity.value = withRepeat(withTiming(0, { duration: 2500 }), -1, false);
            };

            createRipple(ring1Scale, ring1Opacity);
            setTimeout(() => createRipple(ring2Scale, ring2Opacity), 800);
            setTimeout(() => createRipple(ring3Scale, ring3Opacity), 1600);

            textOpacity.value = withRepeat(withSequence(withTiming(1, { duration: 800 }), withTiming(0.4, { duration: 800 })), -1, true);

            
            const finalizeSetup = async () => {
                await new Promise(resolve => setTimeout(resolve, 3500));
                
                const { email, password, name, isLogin, profileData, recommendation } = route.params || {};
                
                // 1. Authenticate / Create User
                if (isLogin) {
                    await logIn(email, password);
                } else if (email) {
                    await signUp(email, password, name);
                }
                
                // 2. Hydrate Profile
                if (profileData) {
                    await completeProfileSetup(
                        profileData.photos, 
                        profileData.bio, 
                        profileData.homeCity, 
                        profileData.selectedInterests
                    );
                }
                
                // 3. Keep Home Recommendation
                if (recommendation) {
                    addLikedRecommendation(recommendation);
                }

                // 4. Create Trip and finalize session (which logs them in)
                await completeTripSetup(
                    destination.trim(), 
                    formatDate(startDate), 
                    formatDate(endDate)
                );
            };
            finalizeSetup();
        }
    }, [isGenerating]);

    const animatedGlobe = useAnimatedStyle(() => ({
        transform: [{ rotate: `${globeRotation.value}deg` }]
    }));

    const ring1Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring1Scale.value }],
        opacity: ring1Opacity.value,
    }));

    const ring2Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring2Scale.value }],
        opacity: ring2Opacity.value,
    }));

    const ring3Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring3Scale.value }],
        opacity: ring3Opacity.value,
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
      opacity: textOpacity.value,
    }));

    const onSearchChange = (text) => {
        setSearchQuery(text);
        setDestination(''); // Clear actual selection when typing
        if (text.trim().length > 0) {
            const query = text.toLowerCase();
            const filtered = LOCATIONS.filter(loc => 
                loc.city.toLowerCase().includes(query) || 
                loc.country.toLowerCase().includes(query)
            );
            const formatted = filtered.slice(0, 8).map((loc, index) => ({
                id: `${loc.city}-${index}`,
                displayName: `${loc.city}, ${loc.country}`
            }));
            setSuggestions(formatted);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelectCity = (city) => {
        setSearchQuery(city.displayName);
        setDestination(city.displayName);
        setShowSuggestions(false);
    };

    // --- Validation & Dates ---
    const hasRequiredFields = () => {
        return destination.trim().length > 0 && 
               hasSelectedStartDate && 
               hasSelectedEndDate;
    };

    const formatDate = (date) => date.toISOString().split('T')[0];

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        if (Platform.OS === 'android') setShowStartDatePicker(false);
        setStartDate(currentDate);
        setHasSelectedStartDate(true);
        
        if (hasSelectedEndDate && endDate < currentDate) {
            setEndDate(currentDate);
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        if (Platform.OS === 'android') setShowEndDatePicker(false);
        setEndDate(currentDate);
        setHasSelectedEndDate(true);
    };

    const handleGetStarted = async () => {
        if (!hasRequiredFields()) return;

        if (endDate < startDate) {
            Alert.alert('Invalid Date', 'End date cannot be before start date.');
            return;
        }
        
        const homeCityCheck = route.params?.profileData?.homeCity || currentUser?.home_city;
        if (homeCityCheck && destination.trim().toLowerCase() === homeCityCheck.toLowerCase()) {
            Alert.alert("Hold on", "You cannot select the same city you live in for your trip.");
            return;
        }

        setIsGenerating(true);
    };

    if (isGenerating) {
        return (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingContent}>
                {/* ── Buffering State (Globe + Radar) ── */}
                {isGenerating && (
                    <View style={styles.loadingOverlay}>
                        <View style={styles.radarContainer}>
                            <Animated.View style={[styles.radarRing, ring3Style]} />
                            <Animated.View style={[styles.radarRing, ring2Style]} />
                            <Animated.View style={[styles.radarRing, ring1Style]} />
                            <Animated.View style={[styles.globeContainer, animatedGlobe]}>
                                <Text style={{fontSize: 50}}>🌍</Text>
                            </Animated.View>
                        </View>
                    </View>
                )}
                <Animated.Text style={[styles.loadingMainTitle, animatedTextStyle]}>
                  Curating {destination}...
                </Animated.Text>
                <Text style={styles.loadingSubtitle}>
                  Scanning global itineraries, retrieving local picks, and finding compatible travelers.
                </Text>

              </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: T.bg.primary }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={0}
            >
                <View style={styles.content}>
                {/* ── Progress & Header ── */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={24} color={T.text.primary} />
                        </TouchableOpacity>
                        <Text style={styles.progressText}>Step 3 of 3</Text>
                        <View style={{width: 24}} /> 
                    </View>
                    <Text style={styles.title}>Plan Your Trip</Text>
                    <Text style={styles.subtitle}>Where are you going next? We'll use this to find travelers matching your path.</Text>
                </View>

                {/* ── Inputs ── */}
                <View style={[styles.formContainer, { zIndex: 10 }]}>
                    {/* Destination Autocomplete */}
                    <View style={[styles.inputGroup, { zIndex: 1000 }]}>
                        <Text style={styles.label}>Destination City</Text>
                        <View style={styles.searchContainer}>
                            <Ionicons name="search" size={20} color={T.text.tertiary} style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Enter a city"
                                placeholderTextColor={T.text.tertiary}
                                value={searchQuery}
                                onChangeText={onSearchChange}
                                autoCorrect={false}
                                onFocus={() => {
                                    if (searchQuery.trim().length > 0) setShowSuggestions(true);
                                }}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow tap
                            />
                        </View>
                        
                        {/* Dropdown Suggestions */}
                        {showSuggestions && searchQuery.length > 1 && (
                            <View style={styles.dropdown}>
                                {suggestions.length > 0 ? (
                                    <FlatList
                                        data={suggestions}
                                        keyExtractor={(item) => item.id.toString()}
                                        keyboardShouldPersistTaps="handled"
                                        renderItem={({ item }) => (
                                            <TouchableOpacity 
                                                style={styles.suggestionItem}
                                                onPress={() => handleSelectCity(item)}
                                            >
                                                <Ionicons name="location-outline" size={18} color={T.text.secondary} />
                                                <Text style={styles.suggestionText} numberOfLines={1}>
                                                    {item.displayName}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                ) : (
                                    <View style={styles.suggestionItem}>
                                        <Text style={styles.noResultsText}>No cities found.</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>

                    {/* Date Pickers */}
                    <View style={[styles.row, { zIndex: 1, marginTop: showSuggestions && suggestions.length > 0 ? 0 : 0 }]}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.label}>Start Date</Text>
                            <TouchableOpacity 
                                style={styles.dateDisplay}
                                onPress={() => {
                                    setShowSuggestions(false);
                                    if (!hasSelectedStartDate) {
                                        setStartDate(new Date()); // Default to today when opening
                                    }
                                    setShowStartDatePicker(true);
                                }}
                            >
                                <Text style={hasSelectedStartDate ? styles.dateText : styles.datePlaceholder}>
                                    {hasSelectedStartDate ? formatDate(startDate) : "Select date"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{ width: 16 }} />
                        
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.label}>End Date</Text>
                            <TouchableOpacity 
                                style={[styles.dateDisplay, !hasSelectedStartDate && styles.dateDisplayDisabled]}
                                onPress={() => {
                                    if (!hasSelectedStartDate) {
                                        Alert.alert("Hold on", "Please select a Start Date first.");
                                        return;
                                    }
                                    setShowSuggestions(false);
                                    
                                    // Default end date to start date + 1 day if not set
                                    if (!hasSelectedEndDate) {
                                        const nextDay = new Date(startDate);
                                        nextDay.setDate(nextDay.getDate() + 1);
                                        setEndDate(nextDay);
                                    }
                                    
                                    setShowEndDatePicker(true);
                                }}
                                disabled={!hasSelectedStartDate}
                            >
                                <Text style={hasSelectedEndDate ? styles.dateText : styles.datePlaceholder}>
                                    {hasSelectedEndDate ? formatDate(endDate) : "Select date"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>

            {/* iOS Date Picker Modals */}
            {(showStartDatePicker || showEndDatePicker) && Platform.OS === 'ios' && (
                <View style={styles.iosPickerModal}>
                    <View style={styles.iosPickerContainer}>
                        <View style={styles.iosPickerHeader}>
                            <TouchableOpacity 
                                onPress={() => {
                                    setShowStartDatePicker(false);
                                    setShowEndDatePicker(false);
                                }}
                            >
                                <Text style={styles.doneText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            value={showStartDatePicker ? startDate : endDate}
                            mode="date"
                            display="spinner"
                            onChange={showStartDatePicker ? handleStartDateChange : handleEndDateChange}
                            themeVariant="dark" 
                            minimumDate={showStartDatePicker ? new Date() : (() => {
                                const minEnd = new Date(startDate);
                                minEnd.setDate(minEnd.getDate() + 1); // Strictly in the future
                                return minEnd;
                            })()} 
                        />
                    </View>
                </View>
            )}

            {/* Android Date Pickers (they handle their own modal UI) */}
            {Platform.OS === 'android' && showStartDatePicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                    themeVariant="dark" 
                    minimumDate={new Date()} 
                />
            )}
            
            {Platform.OS === 'android' && showEndDatePicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={handleEndDateChange}
                    themeVariant="dark" 
                    minimumDate={(() => {
                        const minEnd = new Date(startDate);
                        minEnd.setDate(minEnd.getDate() + 1); // Strictly in the future
                        return minEnd;
                    })()} 
                />
            )}

            {/* ── Sticky Footer ── */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.submitBtn,
                        !hasRequiredFields() && styles.submitBtnDisabled
                    ]}
                    onPress={handleGetStarted}
                    disabled={!hasRequiredFields()}
                >
                    <Text style={styles.submitBtnText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    content: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 40,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backBtn: {
        padding: 4,
    },
    progressText: {
        fontSize: 13,
        fontWeight: '700',
        color: T.brand.primary,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: T.text.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: T.text.secondary,
        lineHeight: 22,
    },
    formContainer: {
        gap: 24,
        flex: 1, // Needed so dropdown can stretch downward
    },
    inputGroup: {
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        zIndex: -1, // Ensure dropdown flows over the dates
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: T.text.primary,
        marginLeft: 4,
    },
    
    // Custom Date Display (since native picker is ugly when inline)
    dateDisplay: {
        backgroundColor: T.bg.input,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: T.radius.md,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    dateText: {
        color: T.text.primary,
        fontSize: 16,
    },
    datePlaceholder: {
        color: T.text.tertiary,
        fontSize: 16,
    },
    doneBtn: {
        alignItems: 'flex-end',
        paddingTop: 8,
    },
    doneText: {
        color: T.brand.primaryLight,
        fontWeight: 'bold',
    },
    
    // --- Custom Search & Dropdown Styles ---
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: T.bg.input,
        borderWidth: 1,
        borderColor: T.border.subtle,
        borderRadius: T.radius.md,
        paddingHorizontal: 16,
        height: 56,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        color: T.text.primary,
        fontSize: 16,
        height: '100%',
    },
    searchLoader: {
        marginLeft: 8,
    },
    dropdown: {
        position: 'absolute',
        top: 80, // Height of label + input + spacing
        left: 0,
        right: 0,
        backgroundColor: T.bg.card,
        borderRadius: T.radius.md,
        borderWidth: 1,
        borderColor: T.border.subtle,
        maxHeight: 220,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        zIndex: 2000,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: T.border.subtle,
    },
    suggestionText: {
        flex: 1,
        color: T.text.primary,
        fontSize: 15,
        marginLeft: 12,
    },
    noResultsText: {
        color: T.text.tertiary,
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: 'center',
        width: '100%',
    },

    // --- iOS Date Picker Modal Styles ---
    iosPickerModal: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        zIndex: 3000,
    },
    iosPickerContainer: {
        backgroundColor: T.bg.card,
        paddingBottom: Platform.OS === 'ios' ? 40 : 0, // Safe area for newer iPhones
        borderTopLeftRadius: T.radius.lg,
        borderTopRightRadius: T.radius.lg,
    },
    iosPickerHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: T.border.subtle,
        backgroundColor: T.bg.input,
        borderTopLeftRadius: T.radius.lg,
        borderTopRightRadius: T.radius.lg,
    },
    
    // Footer
    footer: {
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        backgroundColor: T.bg.primary,
        borderTopWidth: 1,
        borderTopColor: T.border.subtle,
    },
    submitBtn: {
        backgroundColor: T.brand.primary,
        paddingVertical: 16,
        borderRadius: T.radius.md,
        alignItems: 'center',
        ...T.shadow.glow,
    },
    submitBtnDisabled: {
        backgroundColor: T.bg.input,
        shadowOpacity: 0,
        elevation: 0,
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    
    // --- Loading UI Styles ---
    loadingContainer: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    loadingContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Added this back as it was removed by the instruction's typo
        paddingHorizontal: 40,
    },
    radarContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    radarRing: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: T.brand.primaryLight,
    },
    globeContainer: {
        position: 'absolute',
        backgroundColor: T.bg.elevated,
        borderRadius: 40,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.border.subtle,
        ...T.shadow.md,
    },
    loadingMainTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 12,
        textAlign: 'center',
    },
    loadingSubtitle: {
        color: T.text.secondary,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 60,
    },
    progressTrack: {
        width: '100%',
        height: 6,
        backgroundColor: T.bg.input,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: T.brand.primary,
        borderRadius: 3,
    },
});
