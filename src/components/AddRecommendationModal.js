import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { theme as T } from '../theme/theme';

const CATEGORIES = ['Food & Drinks', 'Experience', 'Events', 'Stays'];

const AddRecommendationModal = ({ visible, onClose, source }) => {
    const { addLikedRecommendation, currentTrip } = useAuth();

    const [name, setName] = useState('');
    const [emoji, setEmoji] = useState('📍');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [bio, setBio] = useState('');

    const handleSubmit = () => {
        if (!name.trim()) return;

        const newRec = {
            id: 'rec-' + Date.now(),
            name: name.trim(),
            emoji: emoji || '📍',
            category,
            source, // 'local' or 'traveller' based on where they opened it
            bio: bio.trim(),
            recommended_by: 'You',
        };

        // For now, we store this exactly where we store "liked" recommendations
        // so it immediately shows up in the user's dashboard. A real backend
        // would save it globally for others.
        addLikedRecommendation(newRec);
        
        // Reset and close
        setName('');
        setEmoji('📍');
        setCategory(CATEGORIES[0]);
        setBio('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView 
                    style={{ flex: 1 }} 
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Text style={styles.closeBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>
                            New {source === 'local' ? 'Local Tip' : 'Traveller Review'}
                        </Text>
                        <TouchableOpacity 
                            onPress={handleSubmit} 
                            style={[styles.saveBtn, !name.trim() && styles.saveBtnDisabled]}
                            disabled={!name.trim()}
                        >
                            <Text style={[styles.saveBtnText, !name.trim() && styles.saveBtnTextDisabled]}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        {/* Context Tag Info */}
                        <View style={styles.contextCard}>
                            <Ionicons 
                                name={source === 'local' ? 'home' : 'airplane'} 
                                size={20} 
                                color={T.brand.primary} 
                            />
                            <Text style={styles.contextText}>
                                {source === 'local' 
                                    ? 'You are posting this as a Verified Local Guide.' 
                                    : `You are posting this as a Traveller in ${currentTrip?.destination_city || 'your current trip'}.`}
                            </Text>
                        </View>

                        {/* Form Fields */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Place or Activity Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Sunset Surfing Beach"
                                placeholderTextColor={T.text.tertiary}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                                <Text style={styles.label}>Category</Text>
                                <View style={styles.categoryRow}>
                                    {CATEGORIES.map(cat => (
                                        <TouchableOpacity 
                                            key={cat}
                                            style={[styles.catChip, category === cat && styles.catChipActive]}
                                            onPress={() => setCategory(cat)}
                                        >
                                            <Text style={[styles.catChipText, category === cat && styles.catChipTextActive]}>
                                                {cat}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                            
                            <View style={[styles.inputGroup, { width: 80 }]}>
                                <Text style={styles.label}>Emoji</Text>
                                <TextInput
                                    style={[styles.input, { textAlign: 'center', fontSize: 24 }]}
                                    value={emoji}
                                    onChangeText={setEmoji}
                                    maxLength={2}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Description & Tips</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="What makes this place special? Any hidden menus or best times to go?"
                                placeholderTextColor={T.text.tertiary}
                                value={bio}
                                onChangeText={setBio}
                                multiline
                                textAlignVertical="top"
                            />
                        </View>

                    </View>
                </KeyboardAvoidingView>
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
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
    },
    closeBtn: {
        padding: 4,
    },
    closeBtnText: {
        color: T.text.secondary,
        fontSize: 16,
    },
    saveBtn: {
        backgroundColor: T.brand.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    saveBtnDisabled: {
        backgroundColor: T.bg.input,
    },
    saveBtnText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 14,
    },
    saveBtnTextDisabled: {
        color: T.text.tertiary,
    },
    
    content: {
        padding: 24,
    },
    contextCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: T.brand.primaryMuted,
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
        gap: 12,
    },
    contextText: {
        flex: 1,
        color: T.brand.primaryLight,
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 18,
    },
    
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: T.text.secondary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: T.bg.input,
        borderWidth: 1,
        borderColor: T.border.subtle,
        borderRadius: 12,
        padding: 16,
        color: T.text.primary,
        fontSize: 16,
    },
    textArea: {
        height: 120,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    
    categoryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    catChip: {
        backgroundColor: T.bg.input,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    catChipActive: {
        backgroundColor: T.brand.primaryMuted,
        borderColor: T.brand.primary,
    },
    catChipText: {
        color: T.text.secondary,
        fontSize: 12,
        fontWeight: '600',
    },
    catChipTextActive: {
        color: T.brand.primaryLight,
    },
});

export default AddRecommendationModal;
