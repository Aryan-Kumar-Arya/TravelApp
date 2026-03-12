import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme as T } from '../theme/theme';

const PastTripModal = ({ visible, onClose, trip }) => {
    if (!trip) return null;

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const tripDuration = () => {
        const start = new Date(trip.start_date);
        const end = new Date(trip.end_date);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return `${days} Days`;
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                            <Ionicons name="close" size={28} color={T.text.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.iconEmoji}>📍</Text>
                        </View>
                        
                        <Text style={styles.destinationTitle}>{trip.destination_city}</Text>
                        
                        <View style={styles.badgeContainer}>
                            <View style={styles.durationBadge}>
                                <Text style={styles.durationText}>{tripDuration()}</Text>
                            </View>
                        </View>

                        <View style={styles.dateCard}>
                            <View style={styles.dateRow}>
                                <Ionicons name="calendar-outline" size={20} color={T.text.secondary} />
                                <View style={styles.dateTextContainer}>
                                    <Text style={styles.dateLabel}>Start Date</Text>
                                    <Text style={styles.dateValue}>{formatDate(trip.start_date)}</Text>
                                </View>
                            </View>
                            
                            <View style={styles.divider} />
                            
                            <View style={styles.dateRow}>
                                <Ionicons name="flag-outline" size={20} color={T.text.secondary} />
                                <View style={styles.dateTextContainer}>
                                    <Text style={styles.dateLabel}>End Date</Text>
                                    <Text style={styles.dateValue}>{formatDate(trip.end_date)}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Placeholder for future features */}
                        <View style={styles.placeholderCard}>
                            <Text style={styles.placeholderTitle}>Trip Memories</Text>
                            <Text style={styles.placeholderText}>Photos and connections from this trip will appear here in the future.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: T.bg.primary,
        borderTopLeftRadius: T.radius.xl,
        borderTopRightRadius: T.radius.xl,
        minHeight: '60%',
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 20,
    },
    closeBtn: {
        width: 40,
        height: 40,
        backgroundColor: T.bg.card,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: T.brand.primaryMuted,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconEmoji: {
        fontSize: 40,
    },
    destinationTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: T.text.primary,
        textAlign: 'center',
        marginBottom: 12,
    },
    badgeContainer: {
        marginBottom: 32,
    },
    durationBadge: {
        backgroundColor: T.brand.primary,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
    },
    durationText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 14,
    },
    dateCard: {
        width: '100%',
        backgroundColor: T.bg.card,
        borderRadius: T.radius.lg,
        padding: 20,
        borderWidth: 1,
        borderColor: T.border.subtle,
        marginBottom: 20,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateTextContainer: {
        marginLeft: 16,
    },
    dateLabel: {
        fontSize: 12,
        color: T.text.tertiary,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    dateValue: {
        fontSize: 16,
        color: T.text.primary,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: T.border.subtle,
        marginVertical: 16,
        marginLeft: 36, // Align with text
    },
    placeholderCard: {
        width: '100%',
        backgroundColor: T.bg.input,
        borderRadius: T.radius.lg,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.border.subtle,
        borderStyle: 'dashed',
    },
    placeholderTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: T.text.secondary,
        marginBottom: 8,
    },
    placeholderText: {
        fontSize: 14,
        color: T.text.tertiary,
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default PastTripModal;
