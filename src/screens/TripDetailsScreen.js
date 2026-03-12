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
    ActivityIndicator
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { theme as T } from '../theme/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function TripDetailsScreen({ navigation }) {
    const { completeTripSetup } = useAuth();
    
    // Form State
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    // Autocomplete State
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchTimeout = useRef(null);
    
    // Date Picker State
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [hasSelectedStartDate, setHasSelectedStartDate] = useState(false);
    const [hasSelectedEndDate, setHasSelectedEndDate] = useState(false);

    // --- Nominatim API Autocomplete ---
    const fetchSuggestions = async (query) => {
        if (!query || query.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        try {
            // Using OpenStreetMap Nominatim API 
            // format=json, featuretype=city to restrict to cities
            const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(query)}&format=json&limit=5&featuretype=city`;
            const response = await fetch(url, {
                headers: {
                    // Nominatim requires a User-Agent identifying the app
                    'User-Agent': 'VayaTravelApp/1.0',
                    'Accept-Language': 'en-US,en;q=0.9',
                }
            });
            
            const data = await response.json();
            
            // Map the Nominatim response to a cleaner format (City, Country)
            const formattedSuggestions = data.map(item => {
                const parts = item.display_name.split(',');
                const city = parts[0].trim();
                const country = parts.length > 1 ? parts[parts.length - 1].trim() : '';
                return {
                    id: item.place_id,
                    name: item.name,
                    displayName: country ? `${city}, ${country}` : city,
                };
            });
            
            setSuggestions(formattedSuggestions);
        } catch (error) {
            console.error('Failed to fetch cities:', error);
            // Non-fatal error, silently fail autocomplete is fine for now
        } finally {
            setIsSearching(false);
        }
    };

    const onSearchChange = (text) => {
        setSearchQuery(text);
        setDestination(''); // Clear actual selection when typing
        setShowSuggestions(true);
        
        // Debounce the API call by 400ms
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            fetchSuggestions(text);
        }, 400);
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

        await completeTripSetup(
            destination.trim(), 
            formatDate(startDate), 
            formatDate(endDate)
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <View style={styles.content}>
                {/* ── Progress & Header ── */}
                <View style={styles.header}>
                    <Text style={styles.progressText}>Step 2 of 2</Text>
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
                                placeholder="Enter a city (e.g. Paris)"
                                placeholderTextColor={T.text.tertiary}
                                value={searchQuery}
                                onChangeText={onSearchChange}
                                autoCorrect={false}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow tap
                            />
                            {isSearching && (
                                <ActivityIndicator size="small" color={T.brand.primary} style={styles.searchLoader} />
                            )}
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
                                ) : !isSearching ? (
                                    <View style={styles.suggestionItem}>
                                        <Text style={styles.noResultsText}>No cities found.</Text>
                                    </View>
                                ) : null}
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
                    <Text style={styles.submitBtnText}>Get Started ✈️</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    content: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 40,
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
});
