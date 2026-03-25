import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { theme as T } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import ProfilePreviewModal from '../components/ProfilePreviewModal';

const INTEREST_OPTIONS = [
  'Backpacking', 'Luxury', 'Foodie', 'Photography', 'Nature', 
  'Nightlife', 'Culture', 'History', 'Adventure', 'Relaxation', 
  'Shopping', 'Wellness', 'Road Trips', 'Beaches', 'Mountains', 
  'Art & Museums', 'Festivals', 'Surfing', 'Architecture', 'Solo Travel'
];

const EditProfileScreen = ({ navigation }) => {
    const { currentUser, setCurrentUser } = useAuth();
    
    // Ensure 4 slots
    const initialPhotos = [null, null, null, null];
    if (currentUser.photos) {
        currentUser.photos.forEach((p, i) => { if (i < 4) initialPhotos[i] = p; });
    }

    const [photos, setPhotos] = useState(initialPhotos);
    const [bio, setBio] = useState(currentUser.bio || '');
    const [homeLocation, setHomeLocation] = useState(currentUser.home_city || '');
    const [selectedInterests, setSelectedInterests] = useState(currentUser.interests || currentUser.selectedInterests || []);
    const [showPreview, setShowPreview] = useState(false);
    
    // Autocomplete State
    const [searchQuery, setSearchQuery] = useState(currentUser.home_city || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchTimeout = useRef(null);

    const pickImage = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            const newPhotos = [...photos];
            newPhotos[index] = result.assets[0].uri;
            setPhotos(newPhotos);
        }
    };
    
    const removeImage = (index) => {
        const newPhotos = [...photos];
        newPhotos[index] = null;
        setPhotos(newPhotos);
    };

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    // --- City Autocomplete Logic ---
    const fetchSuggestions = async (query) => {
        if (!query || query.length < 3) {
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
        setHomeLocation(''); 
        setShowSuggestions(true);
        
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            fetchSuggestions(text);
        }, 400);
    };

    const handleSelectCity = (city) => {
        setSearchQuery(city.displayName);
        setHomeLocation(city.displayName);
        setShowSuggestions(false);
    };

    // --- Validation and Save ---
    const hasRequiredFields = () => {
        const hasAtLeastOnePhoto = photos.some(p => p !== null);
        const hasMinimumTags = selectedInterests.length >= 5;
        return hasAtLeastOnePhoto && bio.trim().length > 0 && homeLocation.trim().length > 0 && hasMinimumTags;
    };

    const handleSave = async () => {
        if (!hasRequiredFields()) {
            Alert.alert("Missing Details", "Please upload at least one photo, add a bio, select 5 interests, and set your home location.");
            return;
        }

        // Filter out empty photo slots
        const finalPhotos = photos.filter(p => p !== null);
        
        setCurrentUser({
            ...currentUser,
            photos: finalPhotos,
            bio: bio.trim(),
            home_city: homeLocation,
            selectedInterests
        });
        
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color={T.text.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Profile</Text>
                <TouchableOpacity onPress={() => setShowPreview(true)} style={styles.previewBtn}>
                    <Text style={styles.previewBtnText}>Preview</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <Text style={styles.subtitle}>Update your profile information</Text>
                
                {/* ── Photo Grid ── */}
                <View style={styles.photoGrid}>
                    {photos.map((uri, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.photoSlot, uri && styles.photoSlotFilled]}
                            onPress={() => uri ? removeImage(index) : pickImage(index)}
                        >
                            {uri ? (
                                <>
                                    <Image source={{ uri }} style={styles.photoImg} />
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
                <View style={[styles.inputGroup, { zIndex: 10 }]}>
                    <Text style={styles.label}>Home Location</Text>
                    
                    <View style={styles.searchContainer}>
                        <Ionicons name="home-outline" size={20} color={T.text.tertiary} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Where do you live?"
                            placeholderTextColor={T.text.muted}
                            value={searchQuery}
                            onChangeText={onSearchChange}
                            onFocus={() => {
                                if (searchQuery.length >= 3) setShowSuggestions(true);
                            }}
                        />
                        {isSearching && (
                            <ActivityIndicator size="small" color={T.brand.primary} style={styles.searchLoader} />
                        )}
                    </View>

                    {/* Autocomplete Dropdown */}
                    {showSuggestions && searchQuery.length > 0 && (
                        <View style={styles.dropdown}>
                            <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled" style={{ maxHeight: 220 }}>
                                {suggestions.length > 0 ? (
                                    suggestions.map(item => (
                                        <TouchableOpacity 
                                            key={item.id} 
                                            style={styles.suggestionItem}
                                            onPress={() => handleSelectCity(item)}
                                        >
                                            <Ionicons name="location" size={18} color={T.text.secondary} />
                                            <Text style={styles.suggestionText}>{item.displayName}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : !isSearching ? (
                                    <View style={styles.suggestionItem}>
                                        <Text style={styles.noResultsText}>No generic locations found.</Text>
                                    </View>
                                ) : null}
                            </ScrollView>
                        </View>
                    )}
                </View>

                {/* ── Bio Input ── */}
                <View style={[styles.inputGroup, { zIndex: 1, marginTop: showSuggestions && suggestions.length > 0 ? 0 : 0 }]}>
                    <Text style={styles.label}>About You</Text>
                    <TextInput
                        style={styles.bioInput}
                        placeholder="What's your travel style? Who are you looking to meet?"
                        placeholderTextColor={T.text.muted}
                        multiline
                        numberOfLines={4}
                        value={bio}
                        onChangeText={setBio}
                        textAlignVertical="top"
                    />
                </View>

                {/* ── Interests ── */}
                <View style={[styles.inputGroup, { marginBottom: 40 }]}>
                    <Text style={styles.label}>Interests (5 minimum)</Text>
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

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={[styles.saveBtn, !hasRequiredFields() && styles.saveBtnDisabled]}
                    disabled={!hasRequiredFields()}
                    onPress={handleSave}
                >
                    <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>
            </View>

            <ProfilePreviewModal 
                visible={showPreview}
                onClose={() => setShowPreview(false)}
                draftProfile={{
                    ...currentUser,
                    photos: photos.filter(p => p !== null),
                    bio: bio,
                    home_city: homeLocation,
                    selectedInterests
                }}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: T.bg.secondary,
        borderBottomWidth: 1,
        borderBottomColor: T.border.subtle,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: T.text.primary,
    },
    scrollContent: {
        padding: 24,
    },
    subtitle: {
        fontSize: 15,
        color: T.text.secondary,
        marginBottom: 24,
    },
    
    previewBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: T.bg.elevated,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: T.border.medium,
    },
    previewBtnText: {
        fontSize: 13,
        fontWeight: '700',
        color: T.text.primary,
    },
    
    // Photo Grid
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'space-between',
        marginBottom: 32,
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
    photoImg: {
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

    // Inputs
    inputGroup: {
        marginBottom: 24,
        position: 'relative', // for dropdown positioning
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: T.text.primary,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    bioInput: {
        backgroundColor: T.bg.input,
        borderWidth: 1,
        borderColor: T.border.subtle,
        borderRadius: T.radius.md,
        padding: 16,
        color: T.text.primary,
        fontSize: 16,
        minHeight: 120,
    },
    
    // Autocomplete Search
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
        top: 80, 
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

    // Footer
    footer: {
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        backgroundColor: T.bg.primary,
        borderTopWidth: 1,
        borderTopColor: T.border.subtle,
    },
    saveBtn: {
        backgroundColor: T.brand.primary,
        paddingVertical: 16,
        borderRadius: T.radius.md,
        alignItems: 'center',
        ...T.shadow.glow,
    },
    saveBtnDisabled: {
        backgroundColor: T.bg.input,
        shadowOpacity: 0,
        elevation: 0,
    },
    saveBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default EditProfileScreen;
