import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
    Extrapolation,
    runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { getOverlapTravelers } from '../utils/matching';
import { DISCOVER_PROFILES } from '../data/discoverProfiles';
import { getProfileImageSource } from '../utils/profileImage';
import { theme as T } from '../theme/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const ScrollableProfileCard = React.memo(({ card, isLocal, destinationCity, style }) => {
    const imageSource = getProfileImageSource(card);
    const firstName = card.name ? card.name.split(' ')[0] : 'Traveler';

    return (
        <Animated.View style={[styles.card, style]}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Hero Profile Image Section */}
                <View style={styles.heroImageContainer}>
                    {imageSource ? (
                        <Image
                            source={imageSource}
                            style={StyleSheet.absoluteFillObject}
                        />
                    ) : (
                        <LinearGradient
                            colors={['#1E3A5F', '#0F172A']}
                            style={StyleSheet.absoluteFillObject}
                        />
                    )}
                    <LinearGradient
                        colors={['transparent', 'transparent', 'rgba(15,23,42,0.9)']}
                        locations={[0.5, 0.7, 1]}
                        style={StyleSheet.absoluteFillObject}
                    />
                    
                    {/* Basic Info at bottom of hero image */}
                    <View style={styles.heroBasicInfo}>
                        <View style={styles.nameRow}>
                            <Text style={styles.cardName}>{firstName}, {card.age}</Text>
                        </View>
                    </View>
                </View>

                {/* Info Container below the image */}
                <View style={styles.scrollInfoArea}>
                    
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionHeading}>About me</Text>
                        <Text style={styles.cardBio}>{card.bio}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.sectionHeading}>Location Details</Text>
                        <View style={styles.locationRow}>
                            <Ionicons name="home" size={16} color="#94A3B8" />
                            <Text style={styles.locationDetailText}>From {card.home_city}</Text>
                        </View>
                        {!isLocal && (
                            <View style={styles.locationRow}>
                                <Ionicons name="location" size={16} color="#94A3B8" />
                                <Text style={styles.locationDetailText}>
                                    Visiting {destinationCity || 'Unknown'}
                                </Text>
                            </View>
                        )}
                        {!isLocal && card.overlapDays > 0 && (
                            <View style={[styles.locationRow, { marginTop: 4 }]}>
                                <Ionicons name="calendar" size={16} color={T.brand.primaryLight} />
                                <Text style={[styles.locationDetailText, { color: T.brand.primaryLight }]}>
                                    {card.overlapDays} days overlapping!
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Tags */}
                    {card.interests && card.interests.length > 0 && (
                        <View style={styles.infoSection}>
                            <Text style={styles.sectionHeading}>Interests</Text>
                            <View style={styles.tagsRow}>
                                {card.interests.map((tag, i) => (
                                    <View key={i} style={styles.tag}>
                                        <Text style={styles.tagText}>{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Placeholder for Additional Photos like Bumble */}
                    <View style={styles.photoGrid}>
                        <View style={styles.photoPlaceholder}>
                            <Ionicons name="image-outline" size={32} color="#334155" />
                        </View>
                        <View style={styles.photoPlaceholder}>
                            <Ionicons name="image-outline" size={32} color="#334155" />
                        </View>
                    </View>
                    
                    <View style={{height: 40}} />
                </View>
            </ScrollView>
        </Animated.View>
    );
});

export default function ExploreScreen() {
    const { currentTrip, addMatch } = useAuth();
    
    const [activeFilter, setActiveFilter] = useState('traveller');
    const [travellerIndex, setTravellerIndex] = useState(0);
    const [localIndex, setLocalIndex] = useState(0);

    const filteredTravelers = useMemo(() => {
        if (!currentTrip?.destination_city) return [];
        const targetCityTravelers = DISCOVER_PROFILES.filter(p =>
            !p.home_city.toLowerCase().startsWith(currentTrip.destination_city.toLowerCase()) &&
            p.trips?.some(trip => trip.destination_city === currentTrip.destination_city)
        );
        return getOverlapTravelers(currentTrip, targetCityTravelers).sort((a,b) => (b.overlapDays || 0) - (a.overlapDays || 0));
    }, [currentTrip]);

    const filteredLocals = useMemo(() => {
        if (!currentTrip?.destination_city) return [];
        return DISCOVER_PROFILES.filter(p =>
            p.home_city.toLowerCase().startsWith(currentTrip.destination_city.toLowerCase())
        );
    }, [currentTrip]);

    const getStackData = () => {
        if (activeFilter === 'traveller') return { cards: filteredTravelers, idx: travellerIndex, setIdx: setTravellerIndex };
        return { cards: filteredLocals, idx: localIndex, setIdx: setLocalIndex };
    };

    const { cards, idx, setIdx } = getStackData();
    const currentCard = cards[idx];
    const nextCard = cards[idx + 1];

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const handleSwipeComplete = useCallback(
        (direction) => {
            if (direction === 'right' && currentCard) {
                // Instantly adding to match list on right swipe per user request
                addMatch({
                    ...currentCard,
                    matchedAt: new Date().toISOString(),
                });
            }
            setIdx((prev) => prev + 1);
        },
        [currentCard, addMatch, setIdx]
    );

    const panGesture = useMemo(() => Gesture.Pan()
        // Ensure vertical scrolling still works on the inner ScrollView
        .activeOffsetX([-15, 15]) 
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd((event) => {
            const velocityX = event.velocityX;

            if (event.translationX > SWIPE_THRESHOLD || velocityX > 600) {
                translateX.value = withTiming(SCREEN_WIDTH * 1.2, { duration: 150 }, () => {
                    runOnJS(handleSwipeComplete)('right');
                    translateX.value = 0;
                    translateY.value = 0;
                });
            } else if (event.translationX < -SWIPE_THRESHOLD || velocityX < -600) {
                translateX.value = withTiming(-SCREEN_WIDTH * 1.2, { duration: 150 }, () => {
                    runOnJS(handleSwipeComplete)('left');
                    translateX.value = 0;
                    translateY.value = 0;
                });
            } else {
                translateX.value = withSpring(0, { damping: 20, stiffness: 450 });
                translateY.value = withSpring(0, { damping: 20, stiffness: 450 });
            }
        }), [handleSwipeComplete]);

    const topCardStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { rotate: `${interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-10, 0, 10])}deg` },
        ],
    }));

    const likeOpacity = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [0, SCREEN_WIDTH * 0.2], [0, 1], Extrapolation.CLAMP),
    }));

    const nopeOpacity = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [-SCREEN_WIDTH * 0.2, 0], [1, 0], Extrapolation.CLAMP),
    }));

    const nextCardScale = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(
                    Math.abs(translateX.value),
                    [0, SCREEN_WIDTH * 0.5],
                    [0.92, 1],
                    Extrapolation.CLAMP
                ),
            },
        ],
        opacity: interpolate(
            Math.abs(translateX.value),
            [0, SCREEN_WIDTH * 0.3],
            [0.6, 1],
            Extrapolation.CLAMP
        ),
    }));

    const handleFilterSelect = (filter) => {
        if (filter === 'local') {
            Alert.alert(
                "Unlock Local Connect 🌍",
                "Start a premium subscription for just $5/week to match with locals in your destination!",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Subscribe", onPress: () => {
                        setActiveFilter('local');
                        setLocalIndex(0);
                    }}
                ]
            );
        } else {
            setActiveFilter('traveller');
            setTravellerIndex(0);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header Exactly mapped to ExploreSwipeScreen.js setup */}
            <View style={styles.header}>
                <Text style={styles.headerEyebrow}>DISCOVER AND CONNECT</Text>
                <Text style={styles.headerSubline}>Make connections with fellow travellers and locals</Text>
            </View>

            {/* Filter Pills */}
            <View style={styles.filterContainer}>
                <View style={styles.filterBtnGroup}>
                    <TouchableOpacity 
                        style={[styles.bigFilterPill, activeFilter === 'traveller' && styles.bigFilterPillActive]}
                        onPress={() => handleFilterSelect('traveller')}
                    >
                        <Text style={[styles.filterText, activeFilter === 'traveller' && styles.filterTextActive]}>Traveller</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.bigFilterPill, activeFilter === 'local' && styles.bigFilterPillActiveLocal]}
                        onPress={() => handleFilterSelect('local')}
                    >
                        <Text style={[styles.filterText, activeFilter === 'local' && styles.filterTextActiveLocal]}>Local</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Card Area exactly matching ExploreSwipeScreen's card scale and dimension */}
            <View style={styles.cardArea}>
                {currentCard ? (
                    <>
                        {nextCard && (
                            <ScrollableProfileCard
                                card={nextCard}
                                isLocal={activeFilter === 'local'}
                                destinationCity={currentTrip?.destination_city}
                                style={[styles.cardAbsolute, nextCardScale]}
                            />
                        )}
                        <GestureDetector gesture={panGesture}>
                            <Animated.View style={[styles.cardAbsolute, topCardStyle]}>
                                <ScrollableProfileCard
                                    card={currentCard}
                                    isLocal={activeFilter === 'local'}
                                    destinationCity={currentTrip?.destination_city}
                                />
                                <Animated.View style={[styles.overlayLabel, styles.overlayLike, likeOpacity]}>
                                    <Text style={styles.overlayLikeText}>CONNECT</Text>
                                </Animated.View>
                                <Animated.View style={[styles.overlayLabel, styles.overlayNope, nopeOpacity]}>
                                    <Text style={styles.overlayNopeText}>PASS</Text>
                                </Animated.View>
                            </Animated.View>
                        </GestureDetector>
                    </>
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>🗺️</Text>
                        <Text style={styles.emptyTitle}>You've seen everyone!</Text>
                        <Text style={styles.emptySubtitle}>
                            Check back later for new {activeFilter === 'traveller' ? 'travellers' : 'locals'} in {currentTrip?.destination_city}.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    // Header (Reusing ExploreSwipeScreen style)
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 0,
    },
    headerEyebrow: {
        fontSize: 12,
        fontWeight: '800',
        color: T.brand.primaryLight,
        letterSpacing: 2,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    headerSubline: {
        fontSize: 14,
        fontWeight: '500',
        color: T.text.secondary,
        marginTop: 2,
    },

    // Big Capsule Filters
    filterContainer: {
        paddingTop: 24,
        paddingBottom: 16,
        paddingHorizontal: 24,
    },
    filterBtnGroup: {
        flexDirection: 'row',
        backgroundColor: T.bg.elevated, // Track color
        borderRadius: 30,
        padding: 4,
    },
    bigFilterPill: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 26,
    },
    bigFilterPillActive: {
        backgroundColor: T.brand.primary, // Cyan for traveller 
    },
    bigFilterPillActiveLocal: {
        backgroundColor: T.brand.gold, // Gold for local 
    },
    filterText: {
        color: T.text.secondary,
        fontSize: 16,
        fontWeight: '700',
    },
    filterTextActive: {
        color: '#000', // Dark text on bright active bg
    },
    filterTextActiveLocal: {
        color: '#000',
    },

    // Card Stack Position (Reusing ExploreSwipeScreen scale)
    cardArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 0, 
    },
    cardAbsolute: {
        position: 'absolute',
        width: '100%',
        height: SCREEN_HEIGHT * 0.65, 
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: T.bg.card,
        borderRadius: 24,
        ...T.shadow.soft,
        overflow: 'hidden',
    },

    // Scrollable Card Internals
    heroImageContainer: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.55, // Leaves some room to show it's scrollable
        position: 'relative',
    },
    heroBasicInfo: {
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardName: {
        fontSize: 36,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    scrollInfoArea: {
        padding: 24,
        paddingTop: 16,
        backgroundColor: T.bg.card,
    },
    sectionHeading: {
        fontSize: 12,
        fontWeight: '800',
        color: T.brand.primaryMuted,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    infoSection: {
        marginBottom: 24,
    },
    cardBio: {
        fontSize: 16,
        color: '#FFFFFF',
        lineHeight: 24,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    locationDetailText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#E2E8F0',
        marginLeft: 8,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: T.bg.secondary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderColor: T.border.subtle,
        borderWidth: 1,
    },
    tagText: {
        fontSize: 13,
        fontWeight: '600',
        color: T.text.primary,
    },
    photoGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    photoPlaceholder: {
        flex: 1,
        height: 180,
        backgroundColor: T.bg.secondary,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.border.subtle,
    },

    // Overlays (Tinder-like Save/Pass but customized)
    overlayLabel: {
        position: 'absolute',
        top: 30,
        zIndex: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 3,
    },
    overlayLike: {
        left: 20,
        borderColor: T.brand.primaryLight,
        backgroundColor: 'rgba(56, 189, 248, 0.4)',
    },
    overlayNope: {
        right: 20,
        borderColor: T.status.error,
        backgroundColor: 'rgba(239, 68, 68, 0.4)',
    },
    overlayLikeText: {
        fontSize: 28,
        fontWeight: '900',
        color: T.brand.primaryLight,
    },
    overlayNopeText: {
        fontSize: 28,
        fontWeight: '900',
        color: T.status.error,
    },

    // Empty state
    emptyState: {
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyEmoji: { fontSize: 60, marginBottom: 16 },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: T.text.primary,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 15,
        color: T.text.secondary,
        textAlign: 'center',
        lineHeight: 22,
    },
});
