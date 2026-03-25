import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { getProfileImageSource } from '../utils/profileImage';
import { theme as T } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

const RecentMessageItem = ({ msg, matchData, onPress }) => {
    const imgSrc = getProfileImageSource(matchData || {});
    const isUnread = msg.unread;

    return (
        <TouchableOpacity style={styles.recentMsgContainer} onPress={onPress}>
            <View style={styles.recentAvatarContainer}>
                {imgSrc ? (
                    <Image source={imgSrc} style={styles.recentAvatar} />
                ) : (
                    <View style={styles.recentAvatarPlaceholder}>
                        <Text style={styles.recentEmoji}>{msg.avatar || matchData?.avatar || '👤'}</Text>
                    </View>
                )}
                {isUnread && <View style={styles.onlineDotSmall} />}
            </View>
            
            <View style={styles.recentMsgContent}>
                <View style={styles.recentMsgHeader}>
                    <Text style={styles.recentMsgName}>{matchData?.name || msg.name}</Text>
                    <Text style={[styles.recentMsgTime, isUnread && styles.recentMsgTimeUnread]}>{msg.time}</Text>
                </View>
                <Text 
                    numberOfLines={1} 
                    style={[styles.recentMsgText, isUnread && styles.recentMsgTextUnread]}
                >
                    {msg.text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default function MatchesScreen() {
    const { matches } = useAuth();
    const navigation = useNavigation();

    // Map real matches to messages for display
    const recentMessages = matches.slice().reverse().map((match, index) => {
        return { 
            id: match.id || `m${index}`, 
            name: match.name, 
            avatar: match.avatar || '👤', 
            text: index === 0 ? 'Say hello!' : 'Hey there, how are you?', 
            time: index === 0 ? 'Just now' : 'Yesterday', 
            unread: index === 0, 
            matchData: match 
        };
    });

    const handleChatPress = (matchData) => {
        navigation.navigate('ChatScreen', { match: matchData });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="menu" size={28} color="#FFF" style={styles.menuIcon} />
                <Text style={styles.headerTitle}>AVARA</Text>
                <Ionicons name="search" size={24} color="#FFF" style={styles.searchIcon} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* RECENT MESSAGES SECTION */}
                <View style={[styles.sectionHeader]}>
                    <Text style={styles.sectionTitle}>RECENT MATCHES & MESSAGES</Text>
                </View>

                {recentMessages.length > 0 ? (
                    <View style={styles.recentMessagesList}>
                        {recentMessages.map((msg) => (
                            <RecentMessageItem 
                                key={msg.id} 
                                msg={msg} 
                                matchData={msg.matchData}
                                onPress={() => handleChatPress(msg.matchData || msg)} 
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>🤝</Text>
                        <Text style={styles.emptyTitle}>No matches yet</Text>
                        <Text style={styles.emptySubtitle}>
                            When you swipe right on the Discover screen, they'll appear here.
                        </Text>
                    </View>
                )}
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827', // Darker background to match image exactly
    },
    // Top App Bar
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 16,
        backgroundColor: '#111827',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    menuIcon: {
        width: 32,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    searchIcon: {
        width: 32,
        textAlign: 'right',
    },
    
    scrollContent: {
        paddingVertical: 24,
    },

    // Section Headers
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 1.5,
    },

    // Recent Messages
    recentMessagesList: {
        paddingHorizontal: 20,
    },
    recentMsgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    recentAvatarContainer: {
        marginRight: 16,
    },
    recentAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    recentAvatarPlaceholder: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FED7AA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recentEmoji: {
        fontSize: 24,
    },
    onlineDotSmall: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#22C55E',
        borderWidth: 2,
        borderColor: '#111827',
    },
    recentMsgContent: {
        flex: 1,
        justifyContent: 'center',
    },
    recentMsgHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 6,
    },
    recentMsgName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    recentMsgTime: {
        fontSize: 11,
        color: '#6B7280',
        fontWeight: '500',
    },
    recentMsgTimeUnread: {
        color: '#FFFFFF',
    },
    recentMsgText: {
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: '400',
    },
    recentMsgTextUnread: {
        color: T.brand.primaryLight, // Cyan tint for unread
        fontWeight: '600',
    },
    
    // Empty state
    emptyState: {
        paddingTop: 60,
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
