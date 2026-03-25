import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme as T } from '../theme/theme';

const CATEGORIES = ['Food & Drinks', 'Stays', 'Experience', 'Events'];
const EMOJI_LIST = ['☕','🍵','🍷','🍺','🍔','🍕','🍜','🌮','🍣','🍦','🏨','⛺','🏖️','🖼️','🏛️','🌲','⛰️','🚢','🚂','📸','🎵','🎭','🏄‍♂️','🧘‍♀️','💃','🚴‍♂️','🏃‍♀️'];

export default function HomeRecommendationScreen({ route, navigation }) {
    
    const { profileData } = route.params || {};
    const homeCity = profileData?.homeCity || 'your city';
    
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Food & Drinks');
    const [emoji, setEmoji] = useState('☕');
    const [description, setDescription] = useState('');

    const isComplete = name.trim().length > 0 && description.trim().length > 0;

    const handleSkip = () => {
        // Technically not skipping the process, but submitting nothing
        navigation.navigate('TripDetails', { ...route.params });
    };

    const handleSubmit = () => {
        if (!isComplete) return;

        const newRecommendation = {
            id: 'rec-' + Date.now(),
            name: name.trim(),
            category,
            emoji,
            bio: description.trim(),
            source: 'local', // Since they are recommending their home city
            recommended_by: route.params?.name || 'Local Guide',
        };

        // Don't save yet, pass it forward to compile everything at the end
        navigation.navigate('TripDetails', { ...route.params, recommendation: newRecommendation });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: T.bg.primary }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={0}
            >
                <ScrollView 
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                {/* ── Header ── */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={24} color={T.text.primary} />
                        </TouchableOpacity>
                        <Text style={styles.progressText}>Step 2 of 3</Text>
                        <View style={{width: 24}} /> 
                    </View>
                    <Text style={styles.title}>Share your expertise on {homeCity}!</Text>
                    <Text style={styles.subtitle}>
                        Help fellow travelers out. What is your favorite local spot in your hometown that tourists usually miss? 
                    </Text>
                </View>

                {/* ── Form ── */}
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name of the place</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Joe's Pizza, The Secret Garden..."
                            placeholderTextColor={T.text.tertiary}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Category</Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
                        >
                            {CATEGORIES.map(cat => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.categoryPill,
                                        category === cat && styles.categoryPillActive
                                    ]}
                                    onPress={() => setCategory(cat)}
                                >
                                    <Text style={[
                                        styles.categoryText,
                                        category === cat && styles.categoryTextActive
                                    ]}>
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Emoji</Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 12, paddingVertical: 4 }}
                        >
                            {EMOJI_LIST.map(e => (
                                <TouchableOpacity
                                    key={e}
                                    style={[
                                        styles.emojiPill,
                                        emoji === e && styles.emojiPillActive
                                    ]}
                                    onPress={() => setEmoji(e)}
                                >
                                    <Text style={[styles.emojiText, emoji === e && styles.emojiTextActive]}>
                                        {e}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Why do you recommend it?</Text>
                        <TextInput
                            style={styles.bioInput}
                            placeholder="Tell travelers why they need to visit this place..."
                            placeholderTextColor={T.text.tertiary}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            maxLength={200}
                            textAlignVertical="top"
                        />
                        <Text style={styles.charCount}>{description.length}/200</Text>
                    </View>
                </View>

            </ScrollView>

            {/* ── Sticky Footer ── */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.submitBtn,
                        !isComplete && styles.submitBtnDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={!isComplete}
                >
                    <Text style={styles.submitBtnText}>Add Recommendation</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
                    <Text style={styles.skipBtnText}>I'll do this later</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    content: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        marginBottom: 32,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backBtn: {
        padding: 4,
    },
    progressText: {
        fontSize: 13,
        fontWeight: '700',
        color: T.brand.primary,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: T.text.primary,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: T.text.secondary,
        lineHeight: 24,
    },
    formContainer: {
        gap: 24,
    },
    inputGroup: {
        gap: 8,
    },
    row: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: T.text.primary,
        marginLeft: 4,
    },
    input: {
        backgroundColor: T.bg.input,
        color: T.text.primary,
        padding: 16,
        borderRadius: T.radius.md,
        fontSize: 16,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    bioInput: {
        backgroundColor: T.bg.input,
        color: T.text.primary,
        padding: 16,
        borderRadius: T.radius.md,
        fontSize: 15,
        minHeight: 120,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    charCount: {
        color: T.text.tertiary,
        fontSize: 12,
        textAlign: 'right',
        marginTop: 4,
    },
    
    // Category Pills
    categoryPill: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: T.bg.input,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    categoryPillActive: {
        backgroundColor: T.brand.primaryMuted,
        borderColor: T.brand.primary,
    },
    categoryText: {
        color: T.text.secondary,
        fontSize: 14,
        fontWeight: '600',
    },
    categoryTextActive: {
        color: T.brand.primaryLight,
    },

    // Emoji Pills
    emojiPill: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        backgroundColor: T.bg.input,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    emojiPillActive: {
        backgroundColor: T.brand.primaryMuted,
        borderColor: T.brand.primary,
        transform: [{ scale: 1.1 }],
    },
    emojiText: {
        fontSize: 24,
    },
    emojiTextActive: {
        opacity: 1,
    },

    // Footer
    footer: {
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        backgroundColor: T.bg.primary,
        borderTopWidth: 1,
        borderTopColor: T.border.subtle,
    },
    submitBtn: {
        backgroundColor: T.brand.primary,
        paddingVertical: 16,
        borderRadius: T.radius.md,
        alignItems: 'center',
        ...T.shadow.glow,
    },
    submitBtnDisabled: {
        backgroundColor: T.bg.input,
        shadowOpacity: 0,
        elevation: 0,
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    skipBtn: {
        alignItems: 'center',
        marginTop: 16,
    },
    skipBtnText: {
        color: T.text.tertiary,
        fontSize: 15,
        fontWeight: '600',
    },
});
