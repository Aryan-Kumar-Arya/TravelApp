import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { getProfileImageSource } from '../utils/profileImage';
import { theme as T } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AddRecommendationModal from './AddRecommendationModal';
import PastTripModal from './PastTripModal';
import { LOCATIONS } from '../data/locationwithitinerary';

const ProfileModal = ({ visible, onClose, onEditProfile }) => {
    const { currentUser, isPremium, setIsPremium, logOut } = useAuth();
    const [showAddRec, setShowAddRec] = useState(false);
    const [selectedPastTrip, setSelectedPastTrip] = useState(null);

    const pastTrips = currentUser?.past_trips || [];

    const formatMonthYear = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const handlePastTripPress = (trip) => {
        setSelectedPastTrip(trip);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color={T.text.secondary} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    {/* Centered Avatar Area */}
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            {(() => {
                                const imgSrc = getProfileImageSource(currentUser);
                                return imgSrc ? (
                                    <Image source={imgSrc} style={styles.avatarImage} />
                                ) : (
                                    <View style={[styles.avatarImage, styles.avatarPlaceholder]}>
                                        <Text style={styles.avatarPlaceholderEmoji}>{currentUser.avatar || '🧑‍💻'}</Text>
                                    </View>
                                );
                            })()}
                            {/* Edit Badge Floating on Avatar */}
                            <TouchableOpacity style={styles.editBadge} onPress={onEditProfile}>
                                <Ionicons name="pencil" size={14} color="#000" />
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={styles.heroName}>{currentUser.name}</Text>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        {[
                            { label: 'TRIPS', val: '5' },
                            { label: 'RECOMMENDATIONS', val: '10' },
                            { label: 'PHOTOS', val: '320' },
                        ].map((stat, i) => (
                            <View key={i} style={styles.statBox}>
                                <Text style={styles.statVal}>{stat.val}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* ── Past Trips ── */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionTitleNoMargin}>Past Trips</Text>
                            <TouchableOpacity style={styles.startNewTripBtn}>
                                <Text style={styles.startNewTripText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        {pastTrips.length > 0 ? (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tripsScrollContent}>
                                {pastTrips.map((trip) => {
                                    const searchCity = trip.destination_city.split(',')[0].trim();
                                    const cityData = LOCATIONS.find(l => l.city === searchCity);
                                    const tripHeroImage = cityData?.image || 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1000&auto=format&fit=crop';
                                    
                                    return (
                                    <TouchableOpacity key={trip.id} style={styles.richCard} onPress={() => handlePastTripPress(trip)}>
                                        <Image source={{ uri: tripHeroImage }} style={styles.richCardBg} />
                                        <LinearGradient colors={['transparent', 'rgba(15,23,42,0.6)', '#0F172A']} style={styles.richCardGradient}>
                                            <View style={styles.richCardContent}>
                                                <Text style={styles.richCardTitlePastTrip} numberOfLines={1}>
                                                    {trip.destination_city.split(',')[0]}
                                                </Text>
                                                <Text style={styles.richCardDate}>
                                                    {formatMonthYear(trip.start_date)} — {formatMonthYear(trip.end_date)}
                                                </Text>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        ) : (
                            <Text style={styles.noPastTrips}>No past trips.</Text>
                        )}
                    </View>
                    


                    {/* Membership Banner */}
                    <View style={styles.section}>
                        <TouchableOpacity 
                            style={[styles.premiumBanner, isPremium && styles.premiumBannerActive]}
                            onPress={() => !isPremium && setIsPremium(true)}
                        >
                            <View style={styles.premiumIconContainer}>
                                <Ionicons name={isPremium ? "star" : "ribbon"} size={20} color={isPremium ? T.brand.gold : "#000"} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 16 }}>
                                <Text style={styles.premiumTitle}>
                                    {isPremium ? 'Premium Active' : 'Upgrade to Premium'}
                                </Text>
                                <Text style={styles.premiumDesc}>
                                    {isPremium ? 'Enjoy all features' : 'Unlock AI trip planning'}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={T.text.secondary} />
                        </TouchableOpacity>
                    </View>

                    {/* Settings List */}
                    <View style={styles.settingsSection}>
                        {[
                            { icon: 'airplane', label: 'Travel Preferences' },
                            { icon: 'wallet', label: 'Budget Settings' },
                            { icon: 'hardware-chip', label: 'AI Persona Settings' },
                            { icon: 'shield-checkmark', label: 'Security' },
                        ].map((item, i) => (
                            <TouchableOpacity key={i} style={styles.settingRow}>
                                <Ionicons name={item.icon} size={22} color={T.text.secondary} style={styles.settingIcon} />
                                <Text style={styles.settingLabel}>{item.label}</Text>
                                <Ionicons name="chevron-forward" size={18} color={T.text.tertiary} />
                            </TouchableOpacity>
                        ))}

                        {/* Log Out */}
                        <TouchableOpacity 
                            style={[styles.settingRow, { borderBottomWidth: 0, marginTop: 16 }]}
                            onPress={() => {
                                onClose();
                                logOut();
                            }}
                        >
                            <Ionicons name="log-out-outline" size={24} color={T.status.error} style={styles.settingIcon} />
                            <Text style={[styles.settingLabel, { color: T.status.error }]}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>

            {/* Add Recommendation Form */}
            <AddRecommendationModal 
                visible={showAddRec}
                onClose={() => setShowAddRec(false)}
                source="local" 
            />

            <PastTripModal
                visible={!!selectedPastTrip}
                onClose={() => setSelectedPastTrip(null)}
                trip={selectedPastTrip}
            />
        </Modal>
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
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: T.border.subtle,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
    },
    closeButton: {
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    
    // Avatar Area
    avatarSection: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: T.bg.secondary,
        position: 'relative',
        marginBottom: 16,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    avatarPlaceholder: {
        backgroundColor: T.bg.elevated,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPlaceholderEmoji: {
        fontSize: 50,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: T.brand.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: T.bg.primary,
    },
    heroName: {
        fontSize: 24,
        fontWeight: '800',
        color: T.text.primary,
        marginBottom: 4,
    },
    heroSub: {
        fontSize: 14,
        fontWeight: '600',
        color: T.brand.primaryLight,
    },

    // Stats Row
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    statBox: {
        width: '30%',
        backgroundColor: T.bg.elevated,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    statVal: {
        fontSize: 22,
        fontWeight: '800',
        color: T.brand.primaryLight,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: T.text.secondary,
        letterSpacing: 0.5,
    },

    section: {
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitleNoMargin: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
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
    tripsScrollContent: {
        paddingRight: 20, 
        gap: 12,
    },
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
        justifyContent: 'flex-end',
        padding: 12,
    },
    richCardContent: {
        justifyContent: 'flex-end',
    },
    richCardTitlePastTrip: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    richCardDate: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '500',
        marginTop: 4,
    },
    noPastTrips: {
        color: T.text.tertiary,
        fontStyle: 'italic',
    },
    
    // Add Local Button
    addLocalBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: T.brand.primaryMuted,
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: T.brand.primary,
        borderStyle: 'dashed',
        gap: 8,
    },
    addLocalBtnText: {
        color: T.brand.primaryLight,
        fontWeight: '700',
        fontSize: 15,
    },

    // Premium Banner
    premiumBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: T.bg.elevated,
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    premiumBannerActive: {
        borderColor: T.brand.gold,
        backgroundColor: T.bg.secondary,
    },
    premiumIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: T.brand.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    premiumTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: T.text.primary,
        marginBottom: 2,
    },
    premiumDesc: {
        fontSize: 13,
        color: T.text.secondary,
    },
    
    // Settings List
    settingsSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    settingIcon: {
        marginRight: 16,
    },
    settingLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: T.text.secondary,
    },
});

export default ProfileModal;
