import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    Pressable,
    ScrollView,
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
import { useSwipeSave } from '../hooks/useSwipeSave';
import { RECOMMENDATIONS } from '../data/recommendations';
import { theme as T } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const RecSwipeCard = React.memo(({ card, style, isExpanded = false }) => {
    // Generate random distance and rating based on the card id for UI polish
    // Pre-calculate to avoid logic in render
    const mockDistance = useMemo(() => {
        let hash = 0;
        const id = card.uniqueId;
        for (let i = 0; i < id.length; i++) hash = Math.imul(31, hash) + id.charCodeAt(i) | 0;
        return `${(1.2 + Math.abs(hash % 40) / 10).toFixed(1)}km away`;
    }, [card.uniqueId]);

    const mockRating = useMemo(() => {
        let hash = 0;
        const id = card.uniqueId;
        for (let i = 0; i < id.length; i++) hash = Math.imul(31, hash) + id.charCodeAt(i) | 0;
        return (4.7 + Math.abs(hash % 30) / 100).toFixed(1);
    }, [card.uniqueId]);

    // Inline Expansion Animation
    const expandAnim = useSharedValue(isExpanded ? 1 : 0);

    useEffect(() => {
        expandAnim.value = withTiming(isExpanded ? 1 : 0, { duration: 300 });
    }, [isExpanded, expandAnim]);

    const descriptionStyle = useAnimatedStyle(() => ({
        maxHeight: interpolate(expandAnim.value, [0, 1], [0, 150], Extrapolation.CLAMP),
        opacity: expandAnim.value,
        marginTop: interpolate(expandAnim.value, [0, 1], [0, 12], Extrapolation.CLAMP),
    }));

    const hintStyle = useAnimatedStyle(() => ({
        opacity: interpolate(expandAnim.value, [0, 0.4], [1, 0], Extrapolation.CLAMP),
        height: interpolate(expandAnim.value, [0, 1], [40, 0], Extrapolation.CLAMP),
        marginTop: interpolate(expandAnim.value, [0, 1], [16, 0], Extrapolation.CLAMP),
    }));

    return (
        <Animated.View style={[styles.card, style]}>
            <Image 
                source={{ uri: card.photo }} 
                style={StyleSheet.absoluteFillObject}
            />
            <LinearGradient
                colors={['transparent', 'rgba(15,23,42,0.8)', '#0F172A']} 
                locations={[0.3, 0.7, 1]}
                style={StyleSheet.absoluteFillObject}
            />
            
            <View style={styles.cardContent}>
                {/* Top Badge Row */}
                <View style={styles.topBadgeRow}>
                    <View style={[styles.sourcePill, { backgroundColor: card.source === 'local' ? 'rgba(0,0,0,0.6)' : 'rgba(0,40,40,0.7)' }]}>
                        <Ionicons name={card.source === 'local' ? 'location' : 'people'} size={12} color={card.source === 'local' ? '#FFF' : T.brand.primaryLight} style={{ marginRight: 5 }} />
                        <Text style={[styles.badgeText, { color: card.source === 'local' ? '#FFF' : T.brand.primaryLight }]}>{card.source === 'local' ? 'LOCAL SUGGESTION' : 'TRAVELLER SUGGESTION'}</Text>
                    </View>
                    
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingIcon}>★</Text>
                        <Text style={styles.badgeText}>{mockRating}</Text>
                    </View>
                </View>

                {/* Bottom Info */}
                <View style={styles.bottomInfo}>
                    <View style={[styles.richCardTag, { alignSelf: 'flex-start', marginBottom: 8 }]}>
                        <Text style={styles.richCardTagText}>
                            {card.tag ? card.tag.toUpperCase() : (card.source === 'local' ? 'LOCAL' : 'TRAVELLER')}
                        </Text>
                    </View>
                    
                    <View style={styles.titleRow}>
                        <Text style={styles.cardName}>{card.title}</Text>
                        {card.location && <Text style={styles.cardLocation}>{card.location}</Text>}
                    </View>
                    
                    <View style={styles.locationRow}>
                        <Ionicons name="location" size={14} color="#94A3B8" />
                        <Text style={styles.locationText}>{mockDistance}</Text>
                    </View>
                    
                    <Animated.View style={[styles.descriptionWrapper, descriptionStyle]}>
                        <Text style={styles.cardDescription}>{card.description}</Text>
                    </Animated.View>

                    <Animated.View style={[styles.hintWrapper, hintStyle]}>
                        <View style={styles.hintLine} />
                        <Text style={styles.hintText}>TAP TO SEE DETAILS</Text>
                    </Animated.View>
                </View>
            </View>
        </Animated.View>
    );
});

// ─── Main Explore Recommendation Screen ─────────────────────────
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.65; // Increased to 65% to hit the "yellow mark" exactly

const ExploreSwipeScreen = () => {
    const { currentTrip } = useAuth();
    const { handleSwipeRight } = useSwipeSave();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('All');
    const [isExpanded, setIsExpanded] = useState(false);

    const filters = useMemo(() => ['All', 'Cuisine', 'Experience', 'Stays'], []);

    const tripCity = currentTrip?.destination_city?.split(',')[0].trim() || 'Bali';
    
    // MEMOIZE FILTERING: Filtering 3000 items is expensive on every render
    const cityCards = useMemo(() => {
        const safeRecs = RECOMMENDATIONS || [];
        return safeRecs.filter(r => r.city === tripCity);
    }, [tripCity]);
    
    const cards = useMemo(() => {
        return activeFilter === 'All' 
            ? cityCards 
            : cityCards.filter(c => c.tag === activeFilter.toLowerCase());
    }, [cityCards, activeFilter]);

    const currentCard = cards[currentIndex];
    const nextCard = cards[currentIndex + 1];

    const handleFilterSelect = (filter) => {
        setActiveFilter(filter);
        setCurrentIndex(0);
        setIsExpanded(false);
    };

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const navigation = useNavigation();



    const handleSwipeComplete = useCallback(
        (direction, card) => {
            if (direction === 'right' && card) {
                // Defer to next frame to avoid blocking UI thread animation cleanup
                requestAnimationFrame(() => {
                    handleSwipeRight(card);
                });
            }
            setIsExpanded(false);
            setCurrentIndex((prev) => prev + 1);
        },
        [handleSwipeRight]
    );

    const panGesture = useMemo(() => Gesture.Pan()
        .activeOffsetX([-10, 10])
        .activeOffsetY([-10, 10])
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd((event) => {
            const velocityX = event.velocityX;

            // Fling away instantly in ~150ms so the user can interact with the next card immediately
            // without waiting for long spring oscillations off-screen.
            if (event.translationX > SWIPE_THRESHOLD || velocityX > 600) {
                translateX.value = withTiming(SCREEN_WIDTH * 1.2, { duration: 150 }, () => {
                    runOnJS(handleSwipeComplete)('right', currentCard);
                    translateX.value = 0;
                    translateY.value = 0;
                });
            } else if (event.translationX < -SWIPE_THRESHOLD || velocityX < -600) {
                translateX.value = withTiming(-SCREEN_WIDTH * 1.2, { duration: 150 }, () => {
                    runOnJS(handleSwipeComplete)('left', currentCard);
                    translateX.value = 0;
                    translateY.value = 0;
                });
            } else {
                // Snap back extremely quickly
                translateX.value = withSpring(0, { damping: 20, stiffness: 450, mass: 0.5 });
                translateY.value = withSpring(0, { damping: 20, stiffness: 450, mass: 0.5 });
            }
        }), [handleSwipeComplete, currentCard]);

    const tapGesture = useMemo(() => Gesture.Tap()
        .maxDuration(1000)
        .maxDistance(40)
        .onEnd(() => {
            if (currentCard) {
                runOnJS(setIsExpanded)(prev => !prev);
            }
        }), [currentCard]);

    const combinedGesture = useMemo(() => Gesture.Exclusive(panGesture, tapGesture), [panGesture, tapGesture]);

    const topCardStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { rotate: `${interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-15, 0, 15])}deg` },
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

    // ── Bottom Sheet helpers (Mock Data) ──
    const getMockDistance = (id) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) hash = Math.imul(31, hash) + id.charCodeAt(i) | 0;
        return `${(1.2 + Math.abs(hash % 40) / 10).toFixed(1)}km away`;
    };
    const getMockRating = (id) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) hash = Math.imul(31, hash) + id.charCodeAt(i) | 0;
        return (4.7 + Math.abs(hash % 30) / 100).toFixed(1);
    };

    return (
        <View style={styles.container}>
            {/* ── Header Area ── */}
            <View style={styles.header}>
                <Text style={styles.headerEyebrow}>EXPLORE AND SAVE</Text>
                <Text style={styles.headerSubline}>Your picks are being saved in your current trip</Text>
            </View>

            {/* ── Filters ── */}
            <View style={styles.filterContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.filterScrollContent}
                >
                    {filters.map(filter => (
                        <TouchableOpacity 
                            key={filter} 
                            style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
                            onPress={() => handleFilterSelect(filter)}
                        >
                            {filter === 'All' && <Ionicons name="grid" size={16} color={activeFilter === 'All' ? '#000' : T.text.secondary} style={{marginRight: 6}} />}
                            {filter === 'Cuisine' && <Ionicons name="restaurant" size={16} color={activeFilter === 'Cuisine' ? '#000' : T.text.secondary} style={{marginRight: 6}} />}
                            {filter === 'Experience' && <Ionicons name="ticket" size={16} color={activeFilter === 'Experience' ? '#000' : T.text.secondary} style={{marginRight: 6}} />}
                            {filter === 'Stays' && <Ionicons name="bed" size={16} color={activeFilter === 'Stays' ? '#000' : T.text.secondary} style={{marginRight: 6}} />}
                            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* ── Card Stack ── */}
            <View style={styles.cardArea}>
                {currentCard ? (
                    <>
                        {nextCard && (
                            <RecSwipeCard
                                card={nextCard}
                                isExpanded={false}
                                style={[styles.cardAbsolute, nextCardScale]}
                            />
                        )}
                        <GestureDetector gesture={combinedGesture}>
                            <Animated.View style={[styles.cardAbsolute, topCardStyle]}>
                                <RecSwipeCard
                                    card={currentCard}
                                    isExpanded={isExpanded}
                                />
                                <Animated.View style={[styles.overlayLabel, styles.overlayLike, likeOpacity]}>
                                    <Text style={styles.overlayLikeText}>SAVE</Text>
                                </Animated.View>
                                <Animated.View style={[styles.overlayLabel, styles.overlayNope, nopeOpacity]}>
                                    <Text style={styles.overlayNopeText}>PASS</Text>
                                </Animated.View>
                            </Animated.View>
                        </GestureDetector>
                    </>
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>🧭</Text>
                        <Text style={styles.emptyTitle}>You're all caught up!</Text>
                        <Text style={styles.emptySubtitle}>
                            Check back later for more recommendations in {currentTrip?.destination_city || 'your area'}.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

// ─── Styles ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
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
    },
    headerSubline: {
        fontSize: 14,
        fontWeight: '500',
        color: T.text.secondary,
        marginTop: 2,
    },

    // Card Area
    cardArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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

    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 24,
    },
    topBadgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    sourcePill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
    },
    
    bottomInfo: {
        marginTop: 'auto', // Pushes to bottom
    },
    titleRow: {
        marginBottom: 8,
    },
    cardName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    cardLocation: {
        fontSize: 24,
        fontWeight: '700',
        color: '#E2E8F0',
        letterSpacing: 0.5,
        marginTop: 4,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(25,30,40,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    ratingIcon: {
        color: '#38BDF8', // Using the vivid blue for exactly matching T.brand.primaryLight from before
        fontSize: 12,
        marginRight: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationText: {
        color: '#E2E8F0',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    descriptionWrapper: {
        overflow: 'hidden',
    },
    cardDescription: {
        fontSize: 15,
        color: '#FFFFFF',
        lineHeight: 22,
    },
    
    // Hint Styles
    hintWrapper: {
        overflow: 'hidden',
        alignItems: 'center',
    },
    hintLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        marginBottom: 12,
    },
    hintText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#38BDF8',
        letterSpacing: 2,
    },
    
    // Rich Tabs
    richCardTag: {
        backgroundColor: 'rgba(56, 189, 248, 0.15)', // light blue tint
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    richCardTagText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#38BDF8', // vivid blue
        letterSpacing: 0.5,
    },

    // Overlays
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
        backgroundColor: T.brand.primaryMuted,
    },
    overlayNope: {
        right: 20,
        borderColor: T.status.error,
        backgroundColor: T.status.errorMuted,
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



    // Filters Row
    filterContainer: {
        paddingTop: 24,
        paddingBottom: 16,
    },
    filterScrollContent: {
        paddingHorizontal: 24,
        gap: 12,
        alignItems: 'center',
    },
    filterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: T.bg.secondary,
        paddingHorizontal: 16, // Minimized horizontal padding to fit text
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    filterPillActive: {
        backgroundColor: T.brand.primary,
        borderColor: T.brand.primary,
    },
    filterText: {
        color: T.text.secondary,
        fontSize: 14,
        fontWeight: '600',
    },
    filterTextActive: {
        color: '#000',
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

export default ExploreSwipeScreen;
