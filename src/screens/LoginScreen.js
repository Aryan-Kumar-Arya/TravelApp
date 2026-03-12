import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    Image
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { theme as T } from '../theme/theme';

export default function LoginScreen({ navigation }) {
    const { signUp, logIn } = useAuth();
    
    // Tab State: 'login' | 'signup'
    const [mode, setMode] = useState('login');
    
    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const isLogin = mode === 'login';

    const handleGoogleSignIn = () => {
        Alert.alert('Coming Soon', 'Gmail sign in is not yet available in this prototype.');
    };

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        if (!isLogin) {
            if (!name) {
                Alert.alert('Error', 'Please enter your name.');
                return;
            }
            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match.');
                return;
            }
        }

        setLoading(true);
        try {
            if (isLogin) {
                await logIn(email, password);
                // On log in, skip profile setup and go straight to Trip Details
                navigation.replace('TripDetails');
            } else {
                await signUp(email, password, name);
                // On sign up, proceed to Profile Setup
                navigation.replace('ProfileSetup');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong.');
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                {/* ── Header ── */}
                <View style={styles.header}>
                    <Text style={styles.logo}>VAYA</Text>
                    <Text style={styles.subtitle}>Find your travel tribe.</Text>
                </View>

                {/* ── Tabs ── */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, isLogin && styles.activeTab]}
                        onPress={() => setMode('login')}
                    >
                        <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, !isLogin && styles.activeTab]}
                        onPress={() => setMode('signup')}
                    >
                        <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* ── Form ── */}
                <View style={styles.formContainer}>
                    {!isLogin && (
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor={T.text.tertiary}
                            value={name}
                            onChangeText={setName}
                            autoCorrect={false}
                        />
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor={T.text.tertiary}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoCorrect={false}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={T.text.tertiary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    {!isLogin && (
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={T.text.tertiary}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    )}

                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.submitBtnText}>
                                {isLogin ? 'Log In' : 'Create Account'}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* ── Divider ── */}
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                {/* ── Third Party Auth ── */}
                <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
                    <Text style={styles.googleBtnIcon}>G</Text>
                    <Text style={styles.googleBtnText}>Continue with Gmail</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        fontSize: 48,
        fontWeight: '900',
        color: T.brand.primary,
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 16,
        color: T.text.secondary,
        marginTop: 8,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: T.bg.input,
        borderRadius: T.radius.md,
        padding: 4,
        marginBottom: 32,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: T.radius.sm,
    },
    activeTab: {
        backgroundColor: T.bg.card,
        ...T.shadow.soft
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: T.text.tertiary,
    },
    activeTabText: {
        color: T.text.primary,
    },
    formContainer: {
        gap: 16,
    },
    input: {
        backgroundColor: T.bg.input,
        color: T.text.primary,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: T.radius.md,
        fontSize: 16,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    submitBtn: {
        backgroundColor: T.brand.primary,
        paddingVertical: 16,
        borderRadius: T.radius.md,
        alignItems: 'center',
        marginTop: 8,
        ...T.shadow.glow,
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: T.border.medium,
    },
    dividerText: {
        color: T.text.tertiary,
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '600',
    },
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        borderRadius: T.radius.md,
        gap: 12,
    },
    googleBtnIcon: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
    },
    googleBtnText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
    },
});
