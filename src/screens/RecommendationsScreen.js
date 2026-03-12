import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme as T } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TILE_GAP = 12;
const TILE_SIZE = (SCREEN_WIDTH - 48 - TILE_GAP) / 2;

const RECOMMENDATION_TILES = [
    {
        id: 'food',
        title: 'Hidden Gems',
        category: 'Food',
        emoji: '🍽️',
        gradient: ['#7C3AED', '#4F46E5'],
        description: 'Secret spots the locals love',
    },
    {
        id: 'places',
        title: 'Photo Spots',
        category: 'Places',
        emoji: '📸',
        gradient: ['#EC4899', '#DB2777'],
        description: 'Instagram-worthy locations',
    },
    {
        id: 'activities',
        title: 'Solo-Friendly',
        category: 'Activities',
        emoji: '🎯',
        gradient: ['#F59E0B', '#D97706'],
        description: 'Best things to do alone',
    },
    {
        id: 'events',
        title: 'Meetups',
        category: 'Events',
        emoji: '🤝',
        gradient: ['#22C55E', '#16A34A'],
        description: 'Meet other travelers',
    },
];

const RecommendationTile = ({ tile }) => (
    <TouchableOpacity style={styles.tile} activeOpacity={0.85}>
        <View style={[styles.tileInner, { backgroundColor: tile.gradient[1] }]}>
            {/* AI Badge */}
            <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>✨ AI-Match</Text>
            </View>

            {/* Content */}
            <View style={styles.tileContent}>
                <Text style={styles.tileEmoji}>{tile.emoji}</Text>
                <Text style={styles.tileCategory}>{tile.category}</Text>
                <Text style={styles.tileTitle}>{tile.title}</Text>
                <Text style={styles.tileDesc}>{tile.description}</Text>
            </View>

            {/* Subtle gradient overlay */}
            <View style={styles.tileGradient}>
                <View style={[styles.gradientInner, { backgroundColor: tile.gradient[0] }]} />
            </View>
        </View>
    </TouchableOpacity>
);

const RecommendationsScreen = () => {
    const { currentTrip } = useAuth();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerGreeting}>Explore</Text>
                <Text style={styles.headerTitle}>
                    Curated for your trip to{'\n'}
                    <Text style={styles.headerCity}>📍 {currentTrip.destination_city}</Text>
                </Text>
                <Text style={styles.headerSubtitle}>
                    Personalized recommendations powered by AI
                </Text>
            </View>

            {/* 2x2 Grid */}
            <View style={styles.grid}>
                {RECOMMENDATION_TILES.map((tile) => (
                    <RecommendationTile key={tile.id} tile={tile} />
                ))}
            </View>

            {/* Coming Soon Section */}
            <View style={styles.comingSoon}>
                <View style={styles.comingSoonCard}>
                    <Text style={styles.comingSoonEmoji}>🧠</Text>
                    <Text style={styles.comingSoonTitle}>AI Personalization</Text>
                    <Text style={styles.comingSoonDesc}>
                        As you swipe and explore, recommendations will adapt to your
                        preferences and travel style.
                    </Text>
                    <View style={styles.comingSoonBadge}>
                        <Text style={styles.comingSoonBadgeText}>Coming Soon</Text>
                    </View>
                </View>
            </View>

            {/* Quick Links */}
            <View style={styles.quickLinks}>
                <Text style={styles.quickLinksTitle}>Quick Actions</Text>
                {[
                    { icon: '🗺️', label: 'Neighborhood Guide', sub: 'Explore area by area' },
                    { icon: '💰', label: 'Budget Planner', sub: 'Track your expenses' },
                    { icon: '🌤️', label: 'Weather Forecast', sub: 'Plan your outfits' },
                ].map((item, i) => (
                    <TouchableOpacity key={i} style={styles.quickLinkRow} activeOpacity={0.7}>
                        <Text style={styles.quickLinkIcon}>{item.icon}</Text>
                        <View style={styles.quickLinkInfo}>
                            <Text style={styles.quickLinkLabel}>{item.label}</Text>
                            <Text style={styles.quickLinkSub}>{item.sub}</Text>
                        </View>
                        <Text style={styles.quickLinkChevron}>›</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{ height: 30 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    content: {
        paddingBottom: 20,
    },

    // Header
    header: {
        paddingTop: 64,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    headerGreeting: {
        fontSize: 14,
        fontWeight: '700',
        color: T.brand.primaryLight,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: T.text.primary,
        lineHeight: 36,
        marginBottom: 8,
    },
    headerCity: {
        color: T.brand.primaryLight,
    },
    headerSubtitle: {
        fontSize: 15,
        color: T.text.secondary,
    },

    // Grid
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 24,
        gap: TILE_GAP,
    },

    // Tile
    tile: {
        width: TILE_SIZE,
        height: TILE_SIZE * 1.2,
        borderRadius: T.radius.lg,
        overflow: 'hidden',
    },
    tileInner: {
        flex: 1,
        borderRadius: T.radius.lg,
        padding: 16,
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
    },
    tileGradient: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.3,
        borderRadius: T.radius.lg,
    },
    gradientInner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '60%',
        borderTopLeftRadius: T.radius.lg,
        borderTopRightRadius: T.radius.lg,
    },

    // AI Badge
    aiBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.35)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        zIndex: 5,
    },
    aiBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    // Tile Content
    tileContent: {
        zIndex: 2,
    },
    tileEmoji: {
        fontSize: 36,
        marginBottom: 8,
    },
    tileCategory: {
        fontSize: 11,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.7)',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 2,
    },
    tileTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    tileDesc: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
    },

    // Coming Soon
    comingSoon: {
        paddingHorizontal: 24,
        marginTop: 24,
    },
    comingSoonCard: {
        backgroundColor: T.bg.card,
        borderRadius: T.radius.lg,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    comingSoonEmoji: {
        fontSize: 40,
        marginBottom: 12,
    },
    comingSoonTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: T.text.primary,
        marginBottom: 8,
    },
    comingSoonDesc: {
        fontSize: 14,
        color: T.text.secondary,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 16,
    },
    comingSoonBadge: {
        backgroundColor: T.brand.primaryMuted,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
    },
    comingSoonBadgeText: {
        fontSize: 13,
        fontWeight: '700',
        color: T.brand.primaryLight,
    },

    // Quick Links
    quickLinks: {
        paddingHorizontal: 24,
        marginTop: 24,
    },
    quickLinksTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
        marginBottom: 14,
    },
    quickLinkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: T.bg.card,
        borderRadius: T.radius.md,
        padding: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    quickLinkIcon: {
        fontSize: 24,
        marginRight: 14,
    },
    quickLinkInfo: {
        flex: 1,
    },
    quickLinkLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: T.text.primary,
        marginBottom: 2,
    },
    quickLinkSub: {
        fontSize: 12,
        color: T.text.tertiary,
    },
    quickLinkChevron: {
        fontSize: 22,
        color: T.text.tertiary,
        fontWeight: '600',
    },
});

export default RecommendationsScreen;
