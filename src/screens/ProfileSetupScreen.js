import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { theme as T } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { LOCATIONS } from '../data/locations';

const INTEREST_OPTIONS = [
  'Backpacking', 'Luxury', 'Foodie', 'Photography', 'Nature', 
  'Nightlife', 'Culture', 'History', 'Adventure', 'Relaxation', 
  'Shopping', 'Wellness', 'Road Trips', 'Beaches', 'Mountains', 
  'Art & Museums', 'Festivals', 'Surfing', 'Architecture', 'Solo Travel'
];

export default function ProfileSetupScreen({ route, navigation }) {
    
    // Using route params from Login
    const { name } = route.params || {};
    
    // Photo state: Array of 4 slots (null if empty, string URI if filled)
    const [photos, setPhotos] = useState([null, null, null, null]);
    const [bio, setBio] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    
    // Autocomplete State for Home Location
    const [homeCity, setHomeCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Get first name from passed name
    const firstName = name?.split(' ')[0] || '';

    const onSearchChange = (text) => {
        setSearchQuery(text);
        setHomeCity(''); // Clear actual selection when typing
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
        setHomeCity(city.displayName);
        setShowSuggestions(false);
    };

    const handlePickImage = async (index) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
            Alert.alert('Permission needed', 'We need access to your photos to set up your profile.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 5],
            quality: 0.8,
        });

        if (!result.canceled) {
            const newPhotos = [...photos];
            newPhotos[index] = result.assets[0].uri;
            setPhotos(newPhotos);
        }
    };

    const handleRemoveImage = (index) => {
        const newPhotos = [...photos];
        newPhotos[index] = null;
        setPhotos(newPhotos);
    };

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            // Remove limit so users can choose how many they want
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const hasRequiredFields = () => {
        const hasPhoto = photos.some(p => p !== null);
        const hasMinimumTags = selectedInterests.length >= 5;
        const hasBio = bio.trim().length > 0;
        return hasPhoto && homeCity.trim().length > 0 && hasMinimumTags && hasBio;
    };

    const handleContinue = async () => {
        if (!hasRequiredFields()) return;
        
        const uploadedPhotos = photos.filter(p => p !== null);
        
        // Navigate to next step instead of updating AuthContext immediately
        navigation.navigate('HomeRecommendation', {
            ...route.params,
            profileData: {
                photos: uploadedPhotos,
                bio: bio.trim(),
                homeCity: homeCity.trim(),
                selectedInterests,
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: T.bg.primary }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={0}
            >
                <ScrollView 
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* ── Progress & Header ── */}
                    <View style={styles.header}>
                        <View style={styles.headerTop}>
                            <Text style={styles.progressText}>Step 1 of 3</Text>
                        </View>
                        <Text style={styles.title}>
                            Hello{firstName ? ` ${firstName}` : ''}!
                        </Text>
                        <Text style={styles.subtitle}>Let's create your profile.</Text>
                    </View>

                {/* ── Photo Picker ── */}
                <View style={styles.photoGrid}>
                    {photos.map((uri, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.photoSlot,
                                uri && styles.photoSlotFilled
                            ]}
                            onPress={() => {
                                setShowSuggestions(false); // Close dropdown if picking photo
                                uri ? handleRemoveImage(index) : handlePickImage(index);
                            }}
                        >
                            {uri ? (
                                <>
                                    <Image source={{ uri }} style={styles.photo} />
                                    <View style={styles.removeBadge}>
                                        <Text style={styles.removeBadgeText}>✕</Text>
                                    </View>
                                </>
                            ) : (
                                <View style={styles.emptySlotContent}>
                                    <Text style={styles.addPhotoIcon}>+</Text>
                                    {index === 0 && <Text style={styles.mandatoryText}>Required</Text>}
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── Home Location ── */}
                <View style={[styles.inputContainer, { zIndex: 100 }]}>
                    <Text style={styles.label}>Home Location</Text>
                    <View style={styles.searchContainer}>
                        <Ionicons name="home-outline" size={20} color={T.text.tertiary} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Where do you live?"
                            placeholderTextColor={T.text.tertiary}
                            value={searchQuery}
                            onChangeText={onSearchChange}
                            autoCorrect={false}
                            onFocus={() => {
                                if (searchQuery.trim().length > 0) setShowSuggestions(true);
                            }}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        />
                    </View>
                    
                    {/* Dropdown Suggestions */}
                    {showSuggestions && searchQuery.length > 1 && (
                        <View style={styles.dropdown}>
                            {suggestions.length > 0 ? (
                                <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
                                    {suggestions.map((item) => (
                                        <TouchableOpacity 
                                            key={item.id.toString()}
                                            style={styles.suggestionItem}
                                            onPress={() => handleSelectCity(item)}
                                        >
                                            <Ionicons name="location-outline" size={18} color={T.text.secondary} />
                                            <Text style={styles.suggestionText} numberOfLines={1}>
                                                {item.displayName}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            ) : (
                                <View style={styles.suggestionItem}>
                                    <Text style={styles.noResultsText}>No cities found.</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {/* ── Bio Input ── */}
                <View style={[styles.inputContainer, { zIndex: 1, marginTop: showSuggestions && suggestions.length > 0 ? 0 : 0 }]}>
                    <Text style={styles.label}>Your Bio</Text>
                    <TextInput
                        style={styles.bioInput}
                        placeholder="e.g. 'Coffee snob looking for the best cafes in town...'"
                        placeholderTextColor={T.text.tertiary}
                        value={bio}
                        onChangeText={setBio}
                        multiline
                        maxLength={150}
                        textAlignVertical="top"
                        onFocus={() => setShowSuggestions(false)} // Close dropdown if tapping bio
                    />
                    <Text style={styles.charCount}>{bio.length}/150</Text>
                </View>

                {/* ── Interests ── */}
                <View style={[styles.inputContainer, { marginBottom: 40 }]}>
                    <Text style={styles.label}>Interests (5 recommended)</Text>
                    <View style={styles.interestsContainer}>
                        {INTEREST_OPTIONS.map((interest, idx) => {
                            const isSelected = selectedInterests.includes(interest);
                            return (
                                <TouchableOpacity 
                                    key={idx}
                                    style={[styles.interestPill, isSelected && styles.interestPillSelected]}
                                    onPress={() => toggleInterest(interest)}
                                >
                                    <Text style={[styles.interestText, isSelected && styles.interestTextSelected]}>
                                        {interest}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

            </ScrollView>

            {/* ── Sticky Footer ── */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.continueBtn,
                        !hasRequiredFields() && styles.continueBtnDisabled
                    ]}
                    onPress={handleContinue}
                    disabled={!hasRequiredFields()}
                >
                    <Text style={styles.continueBtnText}>Continue</Text>
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
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        marginBottom: 16,
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
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    photoSlot: {
        width: '48%', 
        aspectRatio: 1.1,
        backgroundColor: T.bg.input,
        borderRadius: T.radius.md,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: T.border.medium,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    photoSlotFilled: {
        borderStyle: 'solid',
        borderColor: T.brand.primaryMuted,
        borderWidth: 1,
    },
    photo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    emptySlotContent: {
        alignItems: 'center',
    },
    addPhotoIcon: {
        fontSize: 32,
        color: T.text.tertiary,
        marginBottom: 4,
    },
    mandatoryText: {
        fontSize: 12,
        color: T.text.tertiary,
        fontWeight: '600',
    },
    removeBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeBadgeText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
        color: T.text.primary,
        marginBottom: 12,
    },
    bioInput: {
        backgroundColor: T.bg.input,
        color: T.text.primary,
        padding: 12,
        borderRadius: T.radius.md,
        fontSize: 15,
        minHeight: 80,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    charCount: {
        color: T.text.tertiary,
        fontSize: 12,
        textAlign: 'right',
        marginTop: 4,
    },
    
    // --- Interests Styles ---
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    interestPill: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: T.bg.input,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    interestPillSelected: {
        backgroundColor: T.brand.primary,
        borderColor: T.brand.primary,
    },
    interestText: {
        color: T.text.secondary,
        fontSize: 14,
        fontWeight: '600',
    },
    interestTextSelected: {
        color: '#FFFFFF',
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
        top: 88, // Height of label + input + spacing
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

    footer: {
        padding: 16,
        paddingBottom: Platform.OS === 'ios' ? 30 : 16,
        backgroundColor: T.bg.primary,
        borderTopWidth: 1,
        borderTopColor: T.border.subtle,
    },
    continueBtn: {
        backgroundColor: T.brand.primary,
        paddingVertical: 16,
        borderRadius: T.radius.md,
        alignItems: 'center',
        ...T.shadow.glow,
    },
    continueBtnDisabled: {
        backgroundColor: T.bg.input,
        shadowOpacity: 0,
        elevation: 0,
    },
    continueBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
