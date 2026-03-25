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
    Image,
    SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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
    const [showPassword, setShowPassword] = useState(false);

    const isLogin = mode === 'login';

    const handleThirdPartySignIn = (provider) => {
        Alert.alert('Coming Soon', `${provider} sign in is not yet available in this prototype.`);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // FORCE: Route directly to Profile Setup instead of creating user
            // We pass the credentials to be finalized at the very end of onboarding
            navigation.navigate('ProfileSetup', {
                email,
                password,
                name: isLogin ? (email.split('@')[0] || 'Traveler') : (name || email.split('@')[0] || 'Traveler'),
                isLogin
            });
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong.');
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#61BDB9', '#4E9E9C', '#61BDB9']}
            style={styles.gradientContainer}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.content}>
                        {/* ── Header ── */}
                        <View style={styles.header}>
                            {/* Instead of the star icon from the mockup, we use the requested screen compass logo */}
                            <View style={styles.logoBox}>
                                <Image 
                                    source={require('../../assets/logo.png')} 
                                    style={styles.logoImage} 
                                />
                            </View>
                            <Text style={styles.logoText}>Avara</Text>
                            <Text style={styles.subtitle}>Start your next adventure.</Text>
                        </View>

                        {/* ── Form ── */}
                        <View style={styles.formContainer}>
                            {!isLogin && (
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Full Name</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="person-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Your name"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            value={name}
                                            onChangeText={setName}
                                            autoCorrect={false}
                                        />
                                    </View>
                                </View>
                            )}

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email address</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="mail-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="name@example.com"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        value={email}
                                        onChangeText={setEmail}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        autoCorrect={false}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.label}>Password</Text>
                                    {isLogin && <Text style={styles.forgotPassword}>Forgot Password?</Text>}
                                </View>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="••••••••"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                        <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="rgba(255,255,255,0.4)" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {!isLogin && (
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Confirm Password</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="••••••••"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>
                            )}

                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#000" />
                                ) : (
                                    <Text style={styles.submitBtnText}>
                                        {isLogin ? 'Sign In' : 'Sign Up'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* ── Divider ── */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>Or continue with</Text>
                            <View style={styles.divider} />
                        </View>

                        {/* ── Third Party Auth ── */}
                        <View style={styles.socialAuthRow}>
                            <TouchableOpacity style={styles.socialBtn} onPress={() => handleThirdPartySignIn('Google')}>
                                <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'}} style={styles.socialIcon} />
                                <Text style={styles.socialBtnText}>Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn} onPress={() => handleThirdPartySignIn('Apple')}>
                                <Ionicons name="logo-apple" size={22} color="#FFF" />
                                <Text style={styles.socialBtnText}>Apple</Text>
                            </TouchableOpacity>
                        </View>

                        {/* ── Toggle Mode Bottom ── */}
                        <View style={styles.bottomRow}>
                            <Text style={styles.bottomText}>
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                            </Text>
                            <TouchableOpacity onPress={() => setMode(isLogin ? 'signup' : 'login')}>
                                <Text style={styles.bottomLink}>{isLogin ? 'Sign Up' : 'Sign In'}</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 28,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoBox: {
        width: 100,
        height: 100,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        overflow: 'hidden',
    },
    logoImage: {
        width: 100,
        height: 100,
        borderRadius: 24, // Assuming the png has sharp or no borders, we round it inside the wrapper
        resizeMode: 'cover',
    },
    logoText: {
        fontSize: 36,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
        fontWeight: '500',
    },
    
    // Form styles
    formContainer: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.9)',
    },
    forgotPassword: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0AD1E8', // Cyan distinct from background
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.4)',
        borderRadius: 20,
        height: 56,
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 10,
    },
    eyeIcon: {
        padding: 5,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    
    // Primary Button
    submitBtn: {
        backgroundColor: '#16D3EE',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#16D3EE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    submitBtnText: {
        color: '#000000',
        fontSize: 17,
        fontWeight: '700',
    },
    
    // Divider
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    dividerText: {
        color: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '600',
        backgroundColor: 'rgba(0,0,0,0.2)', // Fake pill behind text exactly like the mockup
        paddingVertical: 4,
        overflow: 'hidden',
    },
    
    // Social Logins
    socialAuthRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    socialBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 14,
        borderRadius: 24,
        gap: 8,
    },
    socialIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    socialBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    
    // Bottom Links
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
    bottomText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        fontWeight: '500',
    },
    bottomLink: {
        color: '#16D3EE',
        fontSize: 15,
        fontWeight: '700',
    },
});
