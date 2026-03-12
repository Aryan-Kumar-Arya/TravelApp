import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { theme as T } from '../theme/theme';

const MatchCard = ({ match }) => {
    const isLocal = match.isLocal;

    return (
        <TouchableOpacity
            style={[styles.matchCard, isLocal && styles.matchCardLocal]}
            activeOpacity={0.8}
        >
            <View style={[styles.matchAvatar, isLocal && styles.matchAvatarLocal]}>
                <Text style={styles.matchAvatarEmoji}>{match.avatar}</Text>
            </View>
            <View style={styles.matchInfo}>
                <View style={styles.matchNameRow}>
                    <Text style={styles.matchName}>{match.name}</Text>
                    {isLocal && <Text style={styles.localTag}>LOCAL 📍</Text>}
                </View>
                <Text style={styles.matchCity}>
                    {isLocal ? `Lives in ${match.home_city}` : `Visiting ${match.city}`}
                </Text>
                {match.overlapDates && (
                    <Text style={styles.matchDates}>📅 {match.overlapDates}</Text>
                )}
            </View>
            <View style={styles.chatHint}>
                <Text style={styles.chatHintText}>💬</Text>
            </View>
        </TouchableOpacity>
    );
};

const MatchesScreen = () => {
    const { matches } = useAuth();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Your Matches</Text>
                <Text style={styles.headerSubtitle}>
                    {matches.length > 0
                        ? `${matches.length} match${matches.length > 1 ? 'es' : ''} so far`
                        : 'Start swiping to find your travel buddies!'}
                </Text>
            </View>

            {matches.length > 0 ? (
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <MatchCard match={item} />}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyEmoji}>🤝</Text>
                    <Text style={styles.emptyTitle}>No matches yet</Text>
                    <Text style={styles.emptySubtitle}>
                        When you and another traveler both swipe right, you'll see them here.
                        Head to the Discover tab to get started!
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 16,
        backgroundColor: T.bg.secondary,
        borderBottomWidth: 1,
        borderBottomColor: T.border.subtle,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: T.text.primary,
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 15,
        color: T.text.secondary,
        fontWeight: '500',
    },

    // List
    list: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 30,
    },

    // Match card
    matchCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: T.bg.card,
        borderRadius: T.radius.lg,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    matchCardLocal: {
        borderColor: T.brand.gold,
    },
    matchAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: T.brand.primaryMuted,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    matchAvatarLocal: {
        backgroundColor: T.brand.goldMuted,
    },
    matchAvatarEmoji: {
        fontSize: 28,
    },
    matchInfo: {
        flex: 1,
    },
    matchNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 2,
    },
    matchName: {
        fontSize: 17,
        fontWeight: '700',
        color: T.text.primary,
    },
    localTag: {
        fontSize: 10,
        fontWeight: '800',
        color: T.brand.gold,
        backgroundColor: T.brand.goldMuted,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        overflow: 'hidden',
    },
    matchCity: {
        fontSize: 13,
        color: T.text.secondary,
        fontWeight: '500',
        marginBottom: 2,
    },
    matchDates: {
        fontSize: 12,
        color: T.brand.primaryLight,
        fontWeight: '600',
    },
    chatHint: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: T.bg.input,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatHintText: {
        fontSize: 20,
    },

    // Empty state
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyEmoji: {
        fontSize: 64,
        marginBottom: 16,
    },
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

export default MatchesScreen;
