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
    ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { theme as T } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileSetupScreen({ navigation }) {
    const { currentUser, completeProfileSetup } = useAuth();
    
    // Photo state: Array of 3 slots (null if empty, string URI if filled)
    const [photos, setPhotos] = useState([null, null, null]);
    const [bio, setBio] = useState('');
    
    // Autocomplete State for Home Location
    const [homeCity, setHomeCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchTimeout = useRef(null);

    // Get first name from full name
    const firstName = currentUser?.name?.split(' ')[0] || '';

    // --- Nominatim API Autocomplete (Shared logic with Trip Details) ---
    const fetchSuggestions = async (query) => {
        if (!query || query.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        try {
            const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(query)}&format=json&limit=5&featuretype=city`;
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'VayaTravelApp/1.0',
                    'Accept-Language': 'en-US,en;q=0.9',
                }
            });
            
            const data = await response.json();
            
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
        } finally {
            setIsSearching(false);
        }
    };

    const onSearchChange = (text) => {
        setSearchQuery(text);
        setHomeCity(''); // Clear actual selection when typing
        setShowSuggestions(true);
        
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            fetchSuggestions(text);
        }, 400);
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

    const hasRequiredFields = () => {
        const hasPhoto = photos.some(p => p !== null);
        return hasPhoto && bio.trim().length > 0 && homeCity.trim().length > 0;
    };

    const handleContinue = async () => {
        if (!hasRequiredFields()) return;
        
        const uploadedPhotos = photos.filter(p => p !== null);
        
        await completeProfileSetup(uploadedPhotos, bio.trim(), homeCity.trim());
        navigation.replace('TripDetails');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView 
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                {/* ── Progress & Header ── */}
                <View style={styles.header}>
                    <Text style={styles.progressText}>Step 1 of 2</Text>
                    <Text style={styles.title}>
                        Hello{firstName ? ` ${firstName}` : ''}!
                    </Text>
                    <Text style={styles.subtitle}>Set up your profile to show off your travel style (1 photo min).</Text>
                </View>

                {/* ── Photo Picker ── */}
                <View style={styles.photoGrid}>
                    {photos.map((uri, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.photoSlot,
                                index === 0 && styles.photoSlotMain, // First slot is larger
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
                            placeholder="Where do you live? (e.g. New York)"
                            placeholderTextColor={T.text.tertiary}
                            value={searchQuery}
                            onChangeText={onSearchChange}
                            autoCorrect={false}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
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

                {/* ── Bio Input ── */}
                <View style={[styles.inputContainer, { zIndex: 1, marginTop: showSuggestions && suggestions.length > 0 ? 0 : 0 }]}>
                    <Text style={styles.label}>Your Bio</Text>
                    <TextInput
                        style={styles.bioInput}
                        placeholder="What kind of traveler are you? e.g. 'Coffee snob looking for the best cafes in town...'"
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    content: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 32,
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
        gap: 12,
        marginBottom: 32,
    },
    photoSlot: {
        width: '48%', // Adjusted slightly to account for gap reliably
        aspectRatio: 3/4,
        backgroundColor: T.bg.input,
        borderRadius: T.radius.md,
        borderWidth: 2,
        borderColor: 'dashed',
        borderStyle: 'dashed',
        borderColor: T.border.medium,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    photoSlotMain: {
        width: '100%',
        aspectRatio: 16/10,
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
        padding: 16,
        borderRadius: T.radius.md,
        fontSize: 16,
        minHeight: 120,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    charCount: {
        color: T.text.tertiary,
        fontSize: 12,
        textAlign: 'right',
        marginTop: 8,
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
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
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
