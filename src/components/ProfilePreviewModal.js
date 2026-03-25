import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme as T } from '../theme/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ProfilePreviewModal = ({ visible, onClose, draftProfile }) => {
    if (!draftProfile) return null;

    const firstName = draftProfile.name ? draftProfile.name.split(' ')[0] : 'Traveler';
    const mainPhoto = draftProfile.photos && draftProfile.photos.length > 0 ? draftProfile.photos[0] : null;
    const extraPhotos = draftProfile.photos && draftProfile.photos.length > 1 ? draftProfile.photos.slice(1) : [];

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Ionicons name="close" size={28} color={T.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Profile Preview</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.cardArea}>
                    <View style={styles.card}>
                        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                            
                            {/* Hero Image */}
                            <View style={styles.heroImageContainer}>
                                {mainPhoto ? (
                                    <Image
                                        source={{ uri: mainPhoto }}
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
                                
                                <View style={styles.heroBasicInfo}>
                                    <Text style={styles.cardName}>{firstName}{draftProfile.age ? `, ${draftProfile.age}` : ''}</Text>
                                </View>
                            </View>

                            {/* Info Container */}
                            <View style={styles.scrollInfoArea}>
                                
                                {/* Bio */}
                                {!!draftProfile.bio && (
                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionHeading}>About me</Text>
                                        <Text style={styles.cardBio}>{draftProfile.bio}</Text>
                                    </View>
                                )}

                                {/* Location */}
                                <View style={styles.infoSection}>
                                    <Text style={styles.sectionHeading}>Location Details</Text>
                                    <View style={styles.locationRow}>
                                        <Ionicons name="home" size={16} color="#94A3B8" />
                                        <Text style={styles.locationDetailText}>From {draftProfile.home_city || 'Unknown'}</Text>
                                    </View>
                                </View>

                                {/* Tags */}
                                {draftProfile.selectedInterests && draftProfile.selectedInterests.length > 0 && (
                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionHeading}>Interests</Text>
                                        <View style={styles.tagsRow}>
                                            {draftProfile.selectedInterests.map((tag, i) => (
                                                <View key={i} style={styles.tag}>
                                                    <Text style={styles.tagText}>{tag}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {/* Extra Photos */}
                                {extraPhotos.length > 0 && (
                                    <View style={styles.photoGrid}>
                                        {extraPhotos.map((uri, idx) => (
                                            <Image key={idx} source={{ uri }} style={styles.extraPhoto} />
                                        ))}
                                    </View>
                                )}
                                
                                <View style={{height: 40}} />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
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
    closeBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
    },
    cardArea: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    card: {
        flex: 1,
        backgroundColor: T.bg.card,
        borderRadius: 24,
        ...T.shadow.soft,
        overflow: 'hidden',
    },
    heroImageContainer: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.55, 
        position: 'relative',
    },
    heroBasicInfo: {
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
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
        flexDirection: 'column',
        gap: 16,
        marginTop: 16,
    },
    extraPhoto: {
        width: '100%',
        height: 350,
        borderRadius: 16,
        resizeMode: 'cover',
    },
});

export default ProfilePreviewModal;
