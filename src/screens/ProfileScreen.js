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
import { useAuth } from '../context/AuthContext';
import { theme as T } from '../theme/theme';
import AddTripModal from '../components/AddTripModal';
import PastTripModal from '../components/PastTripModal';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
    const { currentUser, currentTrip, isPremium, setIsPremium, logOut } = useAuth();
    
    const [showAddTrip, setShowAddTrip] = useState(false);
    const [selectedPastTrip, setSelectedPastTrip] = useState(null);

    const formatMonthYear = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Construct the unified trips array
    const tripsForDisplay = [];
    
    // 1. Current Trip (if any) is added first and marked as active
    if (currentTrip) {
        tripsForDisplay.push({ ...currentTrip, isActive: true });
    }
    
    // 2. Add past trips next
    if (currentUser.past_trips && currentUser.past_trips.length > 0) {
        tripsForDisplay.push(...currentUser.past_trips.map(t => ({ ...t, isActive: false })));
    }

    const handleTripPress = (trip) => {
        setSelectedPastTrip(trip);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                
                {/* ── Hero Profile Image ── */}
                <View style={styles.heroContainer}>
                    {currentUser.photos && currentUser.photos.length > 0 ? (
                        <Image source={{ uri: currentUser.photos[0] }} style={styles.heroImage} />
                    ) : (
                        <View style={[styles.heroImage, styles.heroPlaceholder]}>
                            <Text style={styles.heroPlaceholderEmoji}>{currentUser.avatar || '🧑‍💻'}</Text>
                        </View>
                    )}
                    
                    {/* Gradient Overlay for Text Readability */}
                    <LinearGradient
                        colors={['transparent', 'rgba(15,23,42,0.8)', T.bg.primary]}
                        style={styles.heroGradient}
                    />

                    {/* Top Right Actions */}
                    <View style={styles.heroActions}>
                        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('EditProfile')}>
                            <Ionicons name="settings-outline" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Name and Location Overlay */}
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroName}>{currentUser.name}</Text>
                        <View style={styles.heroLocationRow}>
                            <Ionicons name="location" size={16} color={T.brand.primaryLight} />
                            <Text style={styles.heroLocationText}>{currentUser.home_city?.split(',')[0] || 'Unknown'}</Text>
                        </View>
                    </View>
                </View>

                {/* ── Unified Trips Section (Horizontal) ── */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Trips</Text>
                    
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tripsScrollContent}
                    >
                        {/* Start New Trip Card */}
                        <TouchableOpacity 
                            style={styles.addTripCard}
                            onPress={() => setShowAddTrip(true)}
                        >
                            <View style={styles.addTripIconCircle}>
                                <Ionicons name="add" size={28} color={T.brand.primaryLight} />
                            </View>
                            <Text style={styles.addTripText}>Plan Trip</Text>
                        </TouchableOpacity>

                        {/* List of Trips */}
                        {tripsForDisplay.map((trip) => (
                            <TouchableOpacity 
                                key={trip.id}
                                style={[styles.tripCard, trip.isActive && styles.tripCardActive]}
                                onPress={() => handleTripPress(trip)}
                            >
                                {trip.isActive && (
                                    <View style={styles.activeLabel}>
                                        <Text style={styles.activeLabelText}>CURRENT</Text>
                                    </View>
                                )}
                                <Text style={styles.tripCity} numberOfLines={1}>
                                    {trip.destination_city.split(',')[0]}
                                </Text>
                                <Text style={styles.tripDate}>
                                    {formatMonthYear(trip.start_date)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* ── Bio Block ── */}
                <View style={[styles.section, { marginTop: 8 }]}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <View style={styles.bioCard}>
                        <Text style={styles.bioText}>{currentUser.bio || "No bio yet."}</Text>
                    </View>
                </View>
                
                {/* ── Membership ── */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Membership</Text>
                    <View style={[styles.premiumCard, isPremium && styles.premiumCardActive]}>
                        <View style={styles.premiumInfo}>
                            <Text style={styles.premiumEmoji}>{isPremium ? '👑' : '🔒'}</Text>
                            <View style={{ flex: 1, marginLeft: 16 }}>
                                <Text style={styles.premiumTitle}>
                                    {isPremium ? 'Vaya Premium' : 'Free Plan'}
                                </Text>
                                <Text style={styles.premiumDesc}>
                                    {isPremium
                                        ? 'Access to Local Guides and all premium features.'
                                        : 'Upgrade to unlock Local Guides and priority matching.'}
                                </Text>
                            </View>
                        </View>
                        {!isPremium && (
                            <TouchableOpacity style={styles.upgradeBtn} onPress={() => setIsPremium(true)}>
                                <Text style={styles.upgradeBtnText}>Upgrade — $9.99/mo</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* ── Log Out Button at Bottom ── */}
                <View style={styles.section}>
                    <TouchableOpacity 
                        style={styles.logoutBtn}
                        onPress={logOut}
                    >
                        <Text style={styles.logoutBtnText}>Log Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Modals */}
            <AddTripModal
                visible={showAddTrip}
                onClose={() => setShowAddTrip(false)}
                onSave={(newTrip) => {
                    // AuthContext handles pushing current to past and setting new current
                    useAuth().completeTripSetup(newTrip.destination_city, newTrip.start_date, newTrip.end_date);
                    setShowAddTrip(false);
                }}
            />
            
            <PastTripModal
                visible={!!selectedPastTrip}
                onClose={() => setSelectedPastTrip(null)}
                trip={selectedPastTrip}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    
    // Hero Header
    heroContainer: {
        width: width,
        height: width * 1.1, // Tall, dating-app style profile picture
        position: 'relative',
        backgroundColor: T.bg.secondary,
        marginBottom: 8,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroPlaceholderEmoji: {
        fontSize: 80,
    },
    heroGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200, // Gradual fade behind text
    },
    heroActions: {
        position: 'absolute',
        top: 60, // Safe area approx
        right: 20,
        flexDirection: 'row',
    },
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    heroTextContainer: {
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
    },
    heroName: {
        fontSize: 36,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 6,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heroLocationText: {
        fontSize: 16,
        fontWeight: '600',
        color: T.brand.primaryLight,
        marginLeft: 6,
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },

    // Horizontal Trips Section
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
        marginBottom: 16,
    },
    tripsScrollContent: {
        paddingRight: 20, 
        gap: 12,
    },
    // Start New Trip Card
    addTripCard: {
        width: 140,
        height: 140,
        backgroundColor: T.bg.input,
        borderRadius: T.radius.lg,
        borderWidth: 1,
        borderColor: T.border.subtle,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addTripIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: T.brand.primaryMuted,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    addTripText: {
        fontSize: 15,
        fontWeight: '700',
        color: T.brand.primaryLight,
    },
    // Trip Cards
    tripCard: {
        width: 140,
        height: 140,
        backgroundColor: T.bg.card,
        borderRadius: T.radius.lg,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.border.subtle,
        position: 'relative',
    },
    tripCardActive: {
        borderColor: T.brand.gold,
        backgroundColor: T.brand.goldMuted,
    },
    activeLabel: {
        position: 'absolute',
        top: 8,
        backgroundColor: T.brand.gold,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    activeLabelText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#FFF',
    },
    tripCity: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
        textAlign: 'center',
        marginBottom: 6,
        marginTop: 10,
    },
    tripDate: {
        fontSize: 13,
        color: T.text.secondary,
        textAlign: 'center',
    },

    // Bio
    bioCard: {
        backgroundColor: T.bg.card,
        borderRadius: T.radius.lg,
        padding: 20,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    bioText: {
        fontSize: 15,
        color: T.text.secondary,
        lineHeight: 24,
    },

    // Premium
    premiumCard: {
        backgroundColor: T.bg.card,
        borderRadius: T.radius.lg,
        padding: 20,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    premiumCardActive: {
        borderColor: T.brand.gold,
        backgroundColor: T.brand.goldMuted,
    },
    premiumInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    premiumEmoji: {
        fontSize: 32,
    },
    premiumTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
        marginBottom: 4,
    },
    premiumDesc: {
        fontSize: 14,
        color: T.text.secondary,
        lineHeight: 20,
    },
    upgradeBtn: {
        backgroundColor: T.brand.gold,
        paddingVertical: 14,
        borderRadius: T.radius.md,
        alignItems: 'center',
    },
    upgradeBtnText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 15,
    },
    
    // Logout
    logoutBtn: {
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        borderWidth: 1,
        borderColor: T.status.errorMuted,
        paddingVertical: 16,
        borderRadius: T.radius.md,
        alignItems: 'center',
        marginTop: 10,
    },
    logoutBtnText: {
        color: T.status.error,
        fontWeight: '700',
        fontSize: 16,
    },
});

export default ProfileScreen;
