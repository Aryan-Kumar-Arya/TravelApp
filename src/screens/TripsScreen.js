import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from '../context/AuthContext';
import { getProfileImageSource } from '../utils/profileImage';
import { theme as T } from '../theme/theme';
import { LOCATIONS } from '../data/locationwithitinerary';

const ICON_MAP = {
    morning: 'sunny-outline',
    cafe: 'cafe-outline',
    food: 'restaurant-outline',
    explore: 'camera-outline',
    sunset: 'partly-sunny-outline',
    evening: 'moon-outline',
};
import AddTripModal from '../components/AddTripModal';
import PastTripModal from '../components/PastTripModal';
import ProfileModal from '../components/ProfileModal';
import AddRecommendationModal from '../components/AddRecommendationModal';

// --- Walkthrough Overlay Component ---
const WalkthroughOverlay = ({ step, onNext, onSkip }) => {
    const opacity = useSharedValue(0);

    React.useEffect(() => {
        opacity.value = withSequence(
            withTiming(0, { duration: 0 }),
            withTiming(1, { duration: 300 })
        );
    }, [step]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const steps = [
        {
            title: "Your AI Itinerary",
            body: "We built a custom timeline for your trip. Tap any day to dive into the details.",
            top: 250, // Approximate position
        },
        {
            title: "Quick Tools",
            body: "Access your saved places, track expenses, or view your bookings all in one place.",
            top: 150,
        },
        {
            title: "Share Local Secrets",
            body: "Found a hidden gem? Tap the + button to add a recommendation for fellow travelers seamlessly.",
            bottom: 120,
        }
    ];

    const currentStep = steps[step];

    return (
        <View style={styles.overlayContainer}>
            <View style={styles.overlayBackdrop} />
            <Animated.View 
                style={[
                    styles.tooltipBox, 
                    currentStep.top ? { top: currentStep.top } : { bottom: currentStep.bottom },
                    animatedStyle
                ]}
            >
                <Text style={styles.tooltipTitle}>{currentStep.title}</Text>
                <Text style={styles.tooltipBody}>{currentStep.body}</Text>
                
                <View style={styles.tooltipActions}>
                    <TouchableOpacity onPress={onSkip}>
                        <Text style={styles.tooltipSkip}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tooltipNextBtn} onPress={onNext}>
                        <Text style={styles.tooltipNextText}>
                            {step === steps.length - 1 ? "Got it!" : "Next"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

export default function TripsScreen({ navigation }) {
    const { currentUser, currentTrip, likedRecommendations } = useAuth();
    
    // UI State
    const [activeTab, setActiveTab] = useState('upcoming');
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showRecommendationModal, setShowRecommendationModal] = useState(false);
    
    // Walkthrough State
    const [showWalkthrough, setShowWalkthrough] = useState(false);
    const [walkthroughStep, setWalkthroughStep] = useState(0);

    // Check if we should show walkthrough on focus
    useFocusEffect(
        React.useCallback(() => {
            const checkWalkthrough = async () => {
                try {
                    const hasSeen = await AsyncStorage.getItem('@has_seen_trips_walkthrough');
                    if (!hasSeen) {
                        setShowWalkthrough(true);
                    }
                } catch (e) {
                    console.error("Failed to check walkthrough state", e);
                }
            };
            checkWalkthrough();
        }, [])
    );

    const handleNextWalkthrough = async () => {
        if (walkthroughStep < 2) {
            setWalkthroughStep(prev => prev + 1);
        } else {
            setShowWalkthrough(false);
            await AsyncStorage.setItem('@has_seen_trips_walkthrough', 'true');
        }
    };

    const handleSkipWalkthrough = async () => {
        setShowWalkthrough(false);
        await AsyncStorage.setItem('@has_seen_trips_walkthrough', 'true');
    };

    const [showAddTrip, setShowAddTrip] = useState(false);
    const [selectedPastTrip, setSelectedPastTrip] = useState(null);
    const [selectedPick, setSelectedPick] = useState(null);
    const [showAddRec, setShowAddRec] = useState(false);

    const formatMonthYear = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const destination = currentTrip?.destination_city || 'Your Destination';
    const startDate = currentTrip?.start_date || '';
    const endDate = currentTrip?.end_date || '';

    // Trips logic
    const pastTrips = currentUser.past_trips || [];

    const handlePastTripPress = (trip) => {
        setSelectedPastTrip(trip);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerEyebrow}>YOUR CURRENT TRIP</Text>
                    <Text style={styles.headerTitle}>{destination}</Text>
                </View>
                {/* Profile Icon Top Right */}
                <TouchableOpacity onPress={() => setShowProfileModal(true)} style={styles.profileBtn}>
                    {(() => {
                        const imgSrc = getProfileImageSource(currentUser);
                        return imgSrc ? (
                            <Image source={imgSrc} style={styles.profileAvatarImg} />
                        ) : (
                            <View style={styles.profileAvatarFallback}>
                                <Text style={styles.profileAvatarEmoji}>{currentUser.avatar || '🧑‍💻'}</Text>
                            </View>
                        );
                    })()}
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* ── Beautiful Current Trip Card ── */}
                <View style={styles.section}>
                    {currentTrip ? (() => {
                        const searchCity = destination.split(',')[0].trim();
                        const cityData = LOCATIONS.find(l => l.city === searchCity);
                        const tripHeroImage = cityData?.image || 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1000&auto=format&fit=crop';
                            
                        return (
                        <View style={styles.imageCardContainer}>
                            <Image 
                                source={{ uri: tripHeroImage }} 
                                style={styles.imageCardBg}
                            />
                            <LinearGradient
                                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)', '#0F172A']}
                                style={styles.imageCardGradient}
                            >
                                <View style={styles.imageCardContent}>
                                    <View style={styles.imageCardDateRow}>
                                        <Ionicons name="calendar-outline" size={14} color="#E2E8F0" />
                                        <Text style={styles.imageCardDateText}>
                                            {formatMonthYear(startDate)} — {formatMonthYear(endDate)}
                                        </Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                        );
                    })() : (
                        <TouchableOpacity style={styles.addTripCardLarge} onPress={() => setShowAddTrip(true)}>
                            <View style={styles.addTripIconCircle}>
                                <Ionicons name="add" size={32} color={T.brand.primaryLight} />
                            </View>
                            <Text style={styles.addTripTextLarge}>Plan a New Trip</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* ── Today's AI Itinerary (Vertical Timeline) ── */}
                {currentTrip && (() => {
                    const searchCity = destination.split(',')[0].trim();
                    const cityData = LOCATIONS.find(l => l.city === searchCity);
                    if (!cityData || !cityData.itinerary) return null;
                    
                    const it = cityData.itinerary;
                    
                    const parseItinerary = (str, defaultTime) => {
                        if (!str) return { time: defaultTime, title: '', subtitle: '' };
                        const parts = str.split('—');
                        return { 
                            time: defaultTime, 
                            title: parts[0] ? parts[0].trim() : '', 
                            subtitle: parts[1] ? parts[1].trim() : '' 
                        };
                    };

                    const itineraryArray = [
                        { ...parseItinerary(it.morning, '08:00 AM'), icon: 'morning' },
                        { ...parseItinerary(it.cafe, '11:00 AM'), icon: 'cafe' },
                        { ...parseItinerary(it.food, '01:30 PM'), icon: 'food' },
                        { ...parseItinerary(it.explore, '03:30 PM'), icon: 'explore' },
                        { ...parseItinerary(it.sunset, '05:30 PM'), icon: 'sunset' },
                        { ...parseItinerary(it.evening, '07:30 PM'), icon: 'evening' }
                    ];

                    return (
                        <View style={styles.timelineContainer}>
                            <View style={styles.itineraryHeader}>
                                <View style={styles.headerLeftRow}>
                                    <Ionicons name="sparkles" size={20} color={T.brand.primaryLight} />
                                    <Text style={styles.itineraryTitle}>Today's AI Itinerary</Text>
                                </View>
                                <Text style={styles.itineraryRefresh}>Refresh</Text>
                            </View>
                            {itineraryArray.map((block, index) => (
                                <View key={block.time} style={styles.timelineDayRow}>
                                    <View style={styles.timelineIconCol}>
                                        <View style={styles.timelineIconOuter}>
                                            <Ionicons name={ICON_MAP[block.icon] || 'ellipse-outline'} size={22} color="#000" />
                                        </View>
                                        {index < itineraryArray.length - 1 && <View style={styles.timelineLine} />}
                                    </View>
                                    <View style={styles.timelineContentBox}>
                                        <View style={styles.timelineTitleRow}>
                                            <Text style={styles.timelineHeadline}>{block.title}</Text>
                                            <Text style={styles.timelineTimeText}>{block.time}</Text>
                                        </View>
                                        <Text style={styles.timelineSubText}>{block.subtitle}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    );
                })()}


                {/* ── Your Picks (Saved Recommendations) ── */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitleNoMargin}>Your Picks</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                            <Text style={styles.addTripLink}>Explore more</Text>
                        </TouchableOpacity>
                    </View>
                    {(() => {
                        const tripPicks = (likedRecommendations || [])
                            .filter(rec => rec.savedTripId === currentTrip?.id);
                        
                        if (tripPicks.length === 0) {
                            return (
                                <View style={styles.emptyLiked}>
                                    <Text style={styles.emptyLikedText}>No picks yet</Text>
                                    <Text style={styles.emptyLikedSub}>Swipe right on Explore to save them here</Text>
                                </View>
                            );
                        }
                        
                        return (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.likedScroll}>
                            {tripPicks.map((rec) => {
                                // Gen mock distance like Explore screen
                                let hash = 0;
                                const id = rec.uniqueId || rec.id || 'abc';
                                for (let i = 0; i < id.length; i++) hash = Math.imul(31, hash) + id.charCodeAt(i) | 0;
                                const mockDistance = `${(1.2 + Math.abs(hash % 40) / 10).toFixed(1)}km`;

                                return (
                                <TouchableOpacity 
                                    key={`liked-${rec.id || rec.uniqueId}-${Math.random()}`} 
                                    style={styles.richCard}
                                    onPress={() => setSelectedPick(rec)}
                                >
                                    <Image source={{ uri: rec.photo }} style={styles.richCardBg} />
                                    <LinearGradient
                                        colors={['transparent', 'rgba(15,23,42,0.8)', '#0F172A']}
                                        locations={[0.3, 0.7, 1]}
                                        style={styles.richCardGradient}
                                    >
                                        <View style={styles.richCardTopRight}>
                                            <View style={styles.heartCircle}>
                                                <Ionicons name="heart" size={14} color="#FFF" />
                                            </View>
                                        </View>
                                        <View style={styles.richCardContent}>
                                            <View style={styles.richCardTitleRow}>
                                                <Text style={styles.richCardTitle} numberOfLines={1}>{rec.title}</Text>
                                                <View style={styles.richCardDistance}>
                                                    <Ionicons name="location" size={10} color="#94A3B8" />
                                                    <Text style={styles.richCardDistanceText}>{mockDistance}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.richCardTagsRow}>
                                                <View style={[styles.richCardTag, { backgroundColor: rec.source === 'local' ? 'rgba(0,0,0,0.6)' : 'rgba(0,40,40,0.7)' }]}>
                                                    <Text style={[styles.richCardTagText, { color: rec.source === 'local' ? '#FFF' : T.brand.primaryLight }]}>
                                                        {rec.source === 'local' ? 'LOCAL SUGGESTION' : 'TRAVELLER SUGGESTION'}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        );
                    })()}
                </View>


            </ScrollView>

            {/* FAB hidden for now — styles.fab was undefined causing blank space
            <TouchableOpacity 
                style={[styles.fab, showWalkthrough && walkthroughStep === 2 && styles.fabHighlighted]} 
                onPress={() => setShowRecommendationModal(true)}
            >
                <Ionicons name="add" size={32} color="#000" />
            </TouchableOpacity>
            */}

            {/* Modals */}
            <AddRecommendationModal 
                visible={showAddRec}
                onClose={() => setShowAddRec(false)}
                source="traveller" // Because we are opening from the Trips section
            />
            <AddTripModal
                visible={showAddTrip}
                onClose={() => setShowAddTrip(false)}
                onSave={(newTrip) => {
                    useAuth().completeTripSetup(newTrip.destination_city, newTrip.start_date, newTrip.end_date);
                    setShowAddTrip(false);
                }}
            />
            
            <PastTripModal
                visible={!!selectedPastTrip}
                onClose={() => setSelectedPastTrip(null)}
                trip={selectedPastTrip}
            />

            <ProfileModal
                visible={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                onEditProfile={() => {
                    setShowProfileModal(false);
                    // Needs slight delay to let modal close before navigation
                    setTimeout(() => navigation.navigate('EditProfile'), 300);
                }}
            />
            
            {/* Pick Details Popup Overlay */}
            {selectedPick && (
                <View style={styles.pickDetailsOverlay}>
                    <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setSelectedPick(null)} />
                    
                    <View style={styles.pickDetailsCard}>
                        <Image source={{ uri: selectedPick.photo }} style={styles.pickDetailsPhoto} />
                        <LinearGradient
                            colors={['transparent', 'rgba(15,23,42,0.8)', '#0F172A']}
                            locations={[0.4, 0.7, 1]}
                            style={StyleSheet.absoluteFillObject}
                        />
                        <View style={styles.pickDetailsContent}>
                            <View style={[styles.richCardTag, { alignSelf: 'flex-start', marginBottom: 8, backgroundColor: selectedPick.source === 'local' ? 'rgba(0,0,0,0.6)' : 'rgba(0,40,40,0.7)' }]}>
                                <Text style={[styles.richCardTagText, { color: selectedPick.source === 'local' ? '#FFF' : T.brand.primaryLight }]}>
                                    {selectedPick.source === 'local' ? 'LOCAL SUGGESTION' : 'TRAVELLER SUGGESTION'}
                                </Text>
                            </View>
                            <Text style={styles.pickDetailsTitle}>{selectedPick.title}</Text>
                            
                            <View style={styles.pickDetailsDescWrapper}>
                                <Text style={styles.pickDetailsDesc}>{selectedPick.description}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}

            {/* Walkthrough Overlay (Top level Z-index) */}
            {/*
            {showWalkthrough && (
                <WalkthroughOverlay 
                    step={walkthroughStep}
                    onNext={handleNextWalkthrough}
                    onSkip={handleSkipWalkthrough}
                />
            )}
            */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 0,
    },
    headerEyebrow: {
        fontSize: 12,
        fontWeight: '800',
        color: T.brand.primaryLight,
        letterSpacing: 2,
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: T.text.primary,
    },
    profileBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: T.brand.primaryMuted,
        overflow: 'hidden',
    },
    profileAvatarImg: {
        width: '100%',
        height: '100%',
    },
    profileAvatarFallback: {
        width: '100%',
        height: '100%',
        backgroundColor: T.bg.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileAvatarEmoji: {
        fontSize: 24,
    },
    scrollContent: {
        paddingBottom: 20,
    },

    section: {
        marginBottom: 8,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
        marginBottom: 16,
    },
    sectionTitleNoMargin: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    addTripLink: {
        color: T.text.secondary,
        fontWeight: '600',
        fontSize: 14,
    },
    startNewTripBtn: {
        backgroundColor: T.brand.primaryMuted,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    startNewTripText: {
        color: T.brand.primaryLight,
        fontWeight: '800',
        fontSize: 12,
    },
    refreshLink: {
        color: T.brand.primaryLight,
        fontWeight: '600',
        fontSize: 13,
    },
    addRecBtnSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: T.brand.primaryMuted,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    addRecTextSmall: {
        color: T.brand.primaryLight,
        fontSize: 12,
        fontWeight: '700',
    },
    imageCardContainer: {
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 4,
    },
    imageCardBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    imageCardGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24,
    },
    imageCardContent: {
        zIndex: 1,
    },
    tripBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(6, 182, 212, 0.2)', // brand.primary muted
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(6, 182, 212, 0.5)',
    },
    tripBadgeText: {
        color: T.brand.primaryLight,
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    imageCardTitle: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    imageCardDateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    imageCardDateText: {
        color: '#E2E8F0',
        fontSize: 13,
        fontWeight: '500',
    },
    imageCardBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: T.brand.primary,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 6,
    },
    imageCardBtnText: {
        color: '#000',
        fontWeight: '800',
        fontSize: 14,
    },

    // Generic Add Trip Card
    addTripCardLarge: {
        backgroundColor: T.bg.input,
        borderRadius: 20,
        padding: 30,
        borderWidth: 1,
        borderColor: T.border.subtle,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addTripIconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: T.brand.primaryMuted,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    addTripTextLarge: {
        fontSize: 16,
        fontWeight: '700',
        color: T.brand.primaryLight,
    },
    
    // Quick Actions
    quickActionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    actionBlock: {
        width: (Dimensions.get('window').width - 48 - 36) / 4, // 4 cols, pad 24*2, gap 12*3
        height: 80,
        backgroundColor: T.bg.elevated,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    actionIconCircle: {
        marginBottom: 6,
    },
    actionLabel: {
        fontSize: 8,
        color: T.text.tertiary,
        fontWeight: '800',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    actionVal: {
        fontSize: 13,
        fontWeight: '800',
        color: T.text.primary,
    },

    timelineContainer: {
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    itineraryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    headerLeftRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itineraryTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#FFFFFF',
        marginLeft: 10,
    },
    itineraryRefresh: {
        color: T.brand.primaryLight,
        fontSize: 14,
        fontWeight: '600',
    },
    timelineDayRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    timelineIconCol: {
        width: 44,
        alignItems: 'center',
        marginRight: 16,
    },
    timelineIconOuter: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: T.brand.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    timelineLine: {
        position: 'absolute',
        top: 44, // Start exactly below the circle
        bottom: -20, // Connect to the next item
        width: 2,
        backgroundColor: 'rgba(255,255,255,0.15)',
        zIndex: 1,
    },
    timelineContentBox: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 8,
    },
    timelineTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    timelineHeadline: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
        paddingRight: 8,
    },
    timelineTimeText: {
        fontSize: 13,
        color: T.brand.primaryLight,
        fontWeight: '600',
    },
    timelineSubText: {
        fontSize: 14,
        color: T.text.secondary,
    },

    // Liked Recs & Past Trips Container
    likedScroll: {
        paddingRight: 24,
        gap: 12,
    },
    tripsScrollContent: {
        paddingRight: 20, 
        gap: 12,
    },

    // Rich Image Cards (For "Your Picks" and "Past Trips")
    richCard: {
        width: 170,
        height: 220,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: T.bg.card,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    richCardBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    richCardGradient: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 12,
    },
    richCardTopRight: {
        alignItems: 'flex-end',
    },
    heartCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    richCardContent: {
        justifyContent: 'flex-end',
    },
    richCardTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    richCardTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
        flex: 1,
        marginRight: 6,
    },
    richCardTitlePastTrip: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    richCardDistance: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    richCardDistanceText: {
        fontSize: 10,
        color: '#94A3B8',
        marginLeft: 2,
        fontWeight: '600',
    },
    richCardTagsRow: {
        flexDirection: 'row',
        gap: 6,
    },
    richCardTag: {
        backgroundColor: 'rgba(56, 189, 248, 0.15)', // light blue tint
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    richCardTagText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#38BDF8', // vivid blue
        letterSpacing: 0.5,
    },
    richCardDate: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '500',
        marginTop: 4,
    },

    // Empty States
    emptyLiked: {
        backgroundColor: T.bg.input,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.border.subtle,
        borderStyle: 'dashed',
    },
    emptyLikedText: {
        fontSize: 15,
        fontWeight: '600',
        color: T.text.secondary,
        marginBottom: 4,
    },
    emptyLikedSub: {
        fontSize: 13,
        color: T.text.tertiary,
    },
    noPastTrips: {
        color: T.text.tertiary,
        fontStyle: 'italic',
    },

    // Pick Details Modal
    pickDetailsOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    pickDetailsCard: {
        width: '100%',
        height: '70%',
        backgroundColor: T.bg.card,
        borderRadius: 24,
        overflow: 'hidden',
        ...T.shadow.soft,
    },
    pickDetailsPhoto: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    pickDetailsContent: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24,
    },
    pickDetailsTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    pickDetailsDescWrapper: {
        maxHeight: '40%', // So description doesn't overflow incredibly long text
    },
    pickDetailsDesc: {
        fontSize: 15,
        color: '#E2E8F0',
        lineHeight: 22,
    },

    // Removed old Quick Tools styles

    // Timeline: time + icon row
    timelineTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },

    // Section subtitle (e.g. city name next to "City Picks")
    sectionSubtitle: {
        fontSize: 13,
        color: T.text.tertiary,
        fontWeight: '500',
    },

    // Recommendation Cards horizontal scroll
    recCardsScroll: {
        paddingLeft: 24,
        paddingRight: 24,
        gap: 14,
        paddingBottom: 4,
    },
    recCard: {
        width: 220,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: T.bg.card,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    recCardImage: {
        width: '100%',
        height: 130,
        resizeMode: 'cover',
    },
    recCardGradient: {
        position: 'absolute',
        top: 90,
        left: 0,
        right: 0,
        height: 44,
    },
    recSourceBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    recSourceLocal: {
        backgroundColor: 'rgba(6, 182, 212, 0.85)',
    },
    recSourceTraveller: {
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
    },
    recSourceText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
    },
    recCardBody: {
        padding: 12,
    },
    recCardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: T.text.primary,
        marginBottom: 4,
        lineHeight: 19,
    },
    recCardSubtitle: {
        fontSize: 12,
        color: T.text.secondary,
        lineHeight: 17,
        marginBottom: 10,
    },
    recCardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    recTagChip: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    recTagText: {
        fontSize: 10,
        fontWeight: '700',
    },
    recTime: {
        fontSize: 11,
        color: T.text.tertiary,
        fontWeight: '500',
    }
});
