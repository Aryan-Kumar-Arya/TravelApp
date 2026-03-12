import React, { useState, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolation,
    runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAuth } from '../context/AuthContext';
import { TRAVELER_PROFILES, LOCAL_PROFILES } from '../data/mockData';
import { getOverlapTravelers } from '../utils/matching';
import { theme as T } from '../theme/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

// ─── Single Swipe Card ─────────────────────────────────────────
const SwipeCard = ({ card, isLocal, style }) => {
    return (
        <Animated.View style={[styles.card, isLocal && styles.cardPremium, style]}>
            {/* Avatar area */}
            <View style={[styles.avatarArea, isLocal && styles.avatarAreaPremium]}>
                <Text style={styles.avatarEmoji}>{card.avatar}</Text>
            </View>

            {/* Info area */}
            <View style={styles.cardInfo}>
                <View style={styles.nameRow}>
                    <Text style={styles.cardName}>{card.name}</Text>
                    <Text style={styles.cardAge}>{card.age}</Text>
                </View>
                <Text style={styles.cardBio} numberOfLines={2}>{card.bio}</Text>

                {/* Interest tags */}
                <View style={styles.tagsRow}>
                    {(card.interests || []).slice(0, 3).map((tag, i) => (
                        <View key={i} style={[styles.tag, isLocal && styles.tagPremium]}>
                            <Text style={[styles.tagText, isLocal && styles.tagTextPremium]}>{tag}</Text>
                        </View>
                    ))}
                </View>

                {/* Overlap badge (only for travelers) */}
                {card.overlapDates && (
                    <View style={styles.overlapBadge}>
                        <Text style={styles.overlapIcon}>📅</Text>
                        <View>
                            <Text style={styles.overlapLabel}>
                                {card.overlapDays} overlapping day{card.overlapDays > 1 ? 's' : ''}
                            </Text>
                            <Text style={styles.overlapDates}>{card.overlapDates}</Text>
                        </View>
                    </View>
                )}

                {/* Local badge */}
                {isLocal && (
                    <View style={styles.localBadge}>
                        <Text style={styles.localBadgeText}>📍 Lives in {card.home_city}</Text>
                    </View>
                )}
            </View>
        </Animated.View>
    );
};

// ─── Main Explore Screen ────────────────────────────────────────
const ExploreScreen = () => {
    const { currentTrip, isPremium, setIsPremium, addMatch } = useAuth();

    const [activeStack, setActiveStack] = useState('travelers');
    const [showPaywall, setShowPaywall] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [localIndex, setLocalIndex] = useState(0);

    // Apply matching algo
    const filteredTravelers = useMemo(
        () => getOverlapTravelers(currentTrip, TRAVELER_PROFILES),
        [currentTrip]
    );

    const cards = activeStack === 'travelers' ? filteredTravelers : LOCAL_PROFILES;
    const idx = activeStack === 'travelers' ? currentIndex : localIndex;
    const currentCard = cards[idx];
    const nextCard = cards[idx + 1];

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const handleSwipeComplete = useCallback(
        (direction) => {
            if (direction === 'right' && currentCard) {
                if (Math.random() > 0.6) {
                    addMatch({
                        ...currentCard,
                        matchedAt: new Date().toISOString(),
                        city: currentTrip.destination_city,
                    });
                }
            }
            if (activeStack === 'travelers') {
                setCurrentIndex((prev) => prev + 1);
            } else {
                setLocalIndex((prev) => prev + 1);
            }
        },
        [activeStack, currentCard, addMatch, currentTrip]
    );

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd((event) => {
            if (event.translationX > SWIPE_THRESHOLD) {
                translateX.value = withSpring(SCREEN_WIDTH * 1.5, { damping: 15 }, () => {
                    runOnJS(handleSwipeComplete)('right');
                    translateX.value = 0;
                    translateY.value = 0;
                });
            } else if (event.translationX < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-SCREEN_WIDTH * 1.5, { damping: 15 }, () => {
                    runOnJS(handleSwipeComplete)('left');
                    translateX.value = 0;
                    translateY.value = 0;
                });
            } else {
                translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
                translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
            }
        });

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

    const toggleStack = (stack) => {
        if (stack === 'locals' && !isPremium) {
            setShowPaywall(true);
            return;
        }
        setActiveStack(stack);
    };

    const handleButtonSwipe = (direction) => {
        translateX.value = withSpring(
            direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5,
            { damping: 15 },
            () => {
                runOnJS(handleSwipeComplete)(direction);
                translateX.value = 0;
                translateY.value = 0;
            }
        );
    };

    return (
        <View style={styles.container}>
            {/* ── Header ── */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {activeStack === 'travelers' ? '🌍' : '📍'}{' '}
                    {currentTrip.destination_city}
                </Text>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleBtn, activeStack === 'travelers' && styles.activeBtnFree]}
                        onPress={() => toggleStack('travelers')}
                    >
                        <Text style={[styles.toggleText, activeStack === 'travelers' && styles.activeTextFree]}>
                            Global Nomad
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleBtn, activeStack === 'locals' && styles.activeBtnPremium]}
                        onPress={() => toggleStack('locals')}
                    >
                        <Text style={[styles.toggleText, activeStack === 'locals' && styles.activeTextPremium]}>
                            Local Guide 👑
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Card Stack ── */}
            <View style={styles.cardArea}>
                {currentCard ? (
                    <>
                        {nextCard && (
                            <SwipeCard
                                card={nextCard}
                                isLocal={activeStack === 'locals'}
                                style={[styles.cardAbsolute, nextCardScale]}
                            />
                        )}
                        <GestureDetector gesture={panGesture}>
                            <Animated.View style={[styles.cardAbsolute]}>
                                <Animated.View style={[styles.overlayLabel, styles.overlayLike, likeOpacity]}>
                                    <Text style={styles.overlayLikeText}>LIKE</Text>
                                </Animated.View>
                                <Animated.View style={[styles.overlayLabel, styles.overlayNope, nopeOpacity]}>
                                    <Text style={styles.overlayNopeText}>NOPE</Text>
                                </Animated.View>
                                <SwipeCard
                                    card={currentCard}
                                    isLocal={activeStack === 'locals'}
                                    style={topCardStyle}
                                />
                            </Animated.View>
                        </GestureDetector>
                    </>
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>🗺️</Text>
                        <Text style={styles.emptyTitle}>You've seen everyone!</Text>
                        <Text style={styles.emptySubtitle}>
                            Check back later for new {activeStack === 'travelers' ? 'travelers' : 'locals'}.
                        </Text>
                    </View>
                )}
            </View>

            {/* ── Action Buttons ── */}
            {currentCard && (
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.nopeBtn]}
                        onPress={() => handleButtonSwipe('left')}
                    >
                        <Text style={styles.nopeBtnText}>✕</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.likeBtn]}
                        onPress={() => handleButtonSwipe('right')}
                    >
                        <Text style={styles.likeBtnText}>♥</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* ── Paywall ── */}
            {showPaywall && (
                <View style={styles.paywallOverlay}>
                    <View style={styles.paywallModal}>
                        <Text style={styles.paywallEmoji}>👑</Text>
                        <Text style={styles.paywallTitle}>Unlock Local Guides</Text>
                        <Text style={styles.paywallDesc}>
                            Meet verified locals in {currentTrip.destination_city}.
                            Get insider tips, hidden gems, and authentic experiences.
                        </Text>
                        <View style={styles.paywallFeatures}>
                            {['Unlimited local matches', 'See who liked you', 'Priority in search'].map(
                                (f, i) => (
                                    <View key={i} style={styles.featureRow}>
                                        <Text style={styles.featureCheck}>✓</Text>
                                        <Text style={styles.featureText}>{f}</Text>
                                    </View>
                                )
                            )}
                        </View>
                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={() => {
                                setIsPremium(true);
                                setShowPaywall(false);
                                setActiveStack('locals');
                            }}
                        >
                            <Text style={styles.payButtonText}>Upgrade — $9.99/mo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowPaywall(false)} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Maybe Later</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
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
        paddingHorizontal: 20,
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: T.text.primary,
        textAlign: 'center',
        marginBottom: 12,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: T.bg.input,
        borderRadius: 30,
        padding: 4,
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 26,
    },
    activeBtnFree: {
        backgroundColor: T.bg.card,
        ...T.shadow.soft,
    },
    activeBtnPremium: {
        backgroundColor: T.brand.goldMuted,
        borderWidth: 1.5,
        borderColor: T.brand.gold,
    },
    toggleText: {
        fontWeight: '600',
        color: T.text.tertiary,
        fontSize: 14,
    },
    activeTextFree: { color: T.text.primary },
    activeTextPremium: { color: T.brand.gold, fontWeight: '700' },

    // Card Area
    cardArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardAbsolute: {
        position: 'absolute',
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_HEIGHT * 0.56,
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: T.bg.card,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: T.border.subtle,
        ...T.shadow.soft,
        overflow: 'hidden',
    },
    cardPremium: {
        borderWidth: 2.5,
        borderColor: T.brand.gold,
    },

    // Avatar
    avatarArea: {
        flex: 1,
        backgroundColor: T.bg.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarAreaPremium: {
        backgroundColor: T.brand.goldMuted,
    },
    avatarEmoji: {
        fontSize: 80,
    },

    // Card Info
    cardInfo: {
        padding: 20,
        backgroundColor: T.bg.card,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    cardName: {
        fontSize: 24,
        fontWeight: '800',
        color: T.text.primary,
        marginRight: 8,
    },
    cardAge: {
        fontSize: 18,
        fontWeight: '500',
        color: T.text.tertiary,
    },
    cardBio: {
        fontSize: 14,
        color: T.text.secondary,
        lineHeight: 20,
        marginBottom: 10,
    },

    // Tags
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 10,
    },
    tag: {
        backgroundColor: T.bg.input,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    tagPremium: {
        backgroundColor: T.brand.goldMuted,
    },
    tagText: {
        fontSize: 11,
        fontWeight: '600',
        color: T.text.secondary,
    },
    tagTextPremium: {
        color: T.brand.gold,
    },

    // Overlap badge
    overlapBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: T.brand.primaryMuted,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 8,
    },
    overlapIcon: { fontSize: 18 },
    overlapLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: T.brand.primaryLight,
    },
    overlapDates: {
        fontSize: 11,
        fontWeight: '500',
        color: T.brand.primaryLight,
    },

    // Local badge
    localBadge: {
        backgroundColor: T.brand.goldMuted,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    localBadgeText: {
        color: T.brand.gold,
        fontWeight: '700',
        fontSize: 12,
    },

    // Overlays
    overlayLabel: {
        position: 'absolute',
        top: 50,
        zIndex: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 3,
    },
    overlayLike: {
        left: 20,
        borderColor: T.status.success,
        backgroundColor: T.status.successMuted,
    },
    overlayNope: {
        right: 20,
        borderColor: T.status.error,
        backgroundColor: T.status.errorMuted,
    },
    overlayLikeText: {
        fontSize: 28,
        fontWeight: '900',
        color: T.status.success,
    },
    overlayNopeText: {
        fontSize: 28,
        fontWeight: '900',
        color: T.status.error,
    },

    // Action Buttons
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 24,
        gap: 40,
    },
    actionBtn: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nopeBtn: {
        backgroundColor: T.bg.card,
        borderWidth: 2,
        borderColor: T.status.errorMuted,
    },
    nopeBtnText: {
        fontSize: 28,
        fontWeight: '700',
        color: T.status.error,
    },
    likeBtn: {
        backgroundColor: T.status.success,
        ...T.shadow.soft,
    },
    likeBtnText: {
        fontSize: 28,
        color: '#FFFFFF',
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

    // Paywall
    paywallOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    paywallModal: {
        width: '88%',
        backgroundColor: T.bg.elevated,
        borderRadius: 28,
        padding: 28,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    paywallEmoji: { fontSize: 48, marginBottom: 8 },
    paywallTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: T.brand.gold,
        marginBottom: 8,
    },
    paywallDesc: {
        fontSize: 15,
        color: T.text.secondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    paywallFeatures: {
        width: '100%',
        marginBottom: 20,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    featureCheck: {
        fontSize: 16,
        color: T.status.success,
        fontWeight: '700',
    },
    featureText: {
        fontSize: 15,
        color: T.text.primary,
        fontWeight: '500',
    },
    payButton: {
        backgroundColor: T.brand.gold,
        width: '100%',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    payButtonText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 16,
    },
    cancelBtn: { paddingVertical: 8 },
    cancelText: {
        color: T.text.tertiary,
        fontWeight: '600',
        fontSize: 15,
    },
});

export default ExploreScreen;
