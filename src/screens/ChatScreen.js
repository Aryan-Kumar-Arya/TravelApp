import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Image,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme as T } from '../theme/theme';
import { getProfileImageSource } from '../utils/profileImage';

const MOCK_MESSAGES = [
    { id: '1', text: 'Hey there! How is your trip going?', senderId: 'them', timestamp: '10:45 AM' },
    { id: '2', text: "It's been amazing so far, just explored the old town today. You?", senderId: 'me', timestamp: '10:48 AM' },
    { id: '3', text: 'That sounds great! I am actually heading there tomorrow.', senderId: 'them', timestamp: '11:02 AM' },
];

export default function ChatScreen({ route, navigation }) {
    const { match } = route.params || {};
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage = {
            id: Date.now().toString(),
            text: inputText.trim(),
            senderId: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputText('');
        
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const isLocal = match?.home_city && match.home_city.toLowerCase().startsWith('bali'); // Fallback check or get from params
    const imgSrc = getProfileImageSource(match || {});

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color={T.text.primary} />
                    </TouchableOpacity>
                    
                    <View style={styles.headerProfile}>
                        {imgSrc ? (
                            <Image source={imgSrc} style={styles.headerAvatar} />
                        ) : (
                            <View style={styles.headerEmojiAvatar}>
                                <Text style={styles.headerEmoji}>{match?.avatar || '👤'}</Text>
                            </View>
                        )}
                        <View style={styles.headerInfo}>
                            <Text style={styles.headerName}>{match?.name || 'Chat'}</Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={T.text.secondary} />
                    </TouchableOpacity>
                </View>

                {/* Messages */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messagesList}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    renderItem={({ item }) => {
                        const isMe = item.senderId === 'me';
                        return (
                            <View style={[
                                styles.messageWrapper,
                                isMe ? styles.messageWrapperMe : styles.messageWrapperThem
                            ]}>
                                {!isMe && (
                                    imgSrc ? (
                                        <Image source={imgSrc} style={styles.messageAvatar} />
                                    ) : (
                                        <View style={styles.messageAvatarPlaceholder}>
                                            <Text style={styles.messageAvatarEmoji}>{match?.avatar || '👤'}</Text>
                                        </View>
                                    )
                                )}
                                <View style={[
                                    styles.messageBubble,
                                    isMe ? styles.messageBubbleMe : styles.messageBubbleThem
                                ]}>
                                    <Text style={[
                                        styles.messageText,
                                        isMe ? styles.messageTextMe : styles.messageTextThem
                                    ]}>{item.text}</Text>
                                    <Text style={[
                                        styles.timestamp,
                                        isMe ? styles.timestampMe : styles.timestampThem
                                    ]}>{item.timestamp}</Text>
                                </View>
                            </View>
                        );
                    }}
                />

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachButton}>
                        <Ionicons name="add" size={24} color={T.text.secondary} />
                    </TouchableOpacity>
                    
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type a message..."
                        placeholderTextColor={T.text.ternary}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        maxLength={500}
                    />
                    
                    <TouchableOpacity 
                        style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
                        onPress={handleSend}
                        disabled={!inputText.trim()}
                    >
                        <Ionicons 
                            name="arrow-up" 
                            size={20} 
                            color={inputText.trim() ? '#111827' : T.text.tertiary} 
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: T.bg.secondary,
    },
    container: {
        flex: 1,
        backgroundColor: T.bg.primary,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: T.bg.secondary,
        borderBottomWidth: 1,
        borderBottomColor: T.border.subtle,
    },
    backButton: {
        padding: 4,
        marginRight: 12,
    },
    headerProfile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    headerEmojiAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: T.bg.input,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerEmoji: {
        fontSize: 20,
    },
    headerInfo: {
        flex: 1,
    },
    headerName: {
        fontSize: 18,
        fontWeight: '700',
        color: T.text.primary,
    },
    moreButton: {
        padding: 8,
    },
    
    // Messages Area
    messagesList: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 24,
    },
    messageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    messageWrapperMe: {
        justifyContent: 'flex-end',
    },
    messageWrapperThem: {
        justifyContent: 'flex-start',
    },
    messageAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 8,
    },
    messageAvatarPlaceholder: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: T.bg.input,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    messageAvatarEmoji: {
        fontSize: 14,
    },
    messageBubble: {
        maxWidth: '75%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
    },
    messageBubbleMe: {
        backgroundColor: T.brand.primary,
        borderBottomRightRadius: 4, // Tail
    },
    messageBubbleThem: {
        backgroundColor: T.bg.input,
        borderWidth: 1,
        borderColor: T.border.subtle,
        borderBottomLeftRadius: 4, // Tail
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    messageTextMe: {
        color: '#111827', // Dark text on cyan/brand color
    },
    messageTextThem: {
        color: T.text.primary,
    },
    timestamp: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    timestampMe: {
        color: 'rgba(17, 24, 39, 0.6)',
    },
    timestampThem: {
        color: T.text.tertiary,
    },
    
    // Input Area
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: T.bg.secondary,
        borderTopWidth: 1,
        borderTopColor: T.border.subtle,
    },
    attachButton: {
        padding: 8,
        marginRight: 4,
    },
    textInput: {
        flex: 1,
        backgroundColor: T.bg.input,
        color: T.text.primary,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 12 : 10,
        paddingBottom: Platform.OS === 'ios' ? 12 : 10,
        minHeight: 40,
        maxHeight: 100,
        fontSize: 16,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: T.brand.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    sendButtonDisabled: {
        backgroundColor: T.bg.input,
        borderWidth: 1,
        borderColor: T.border.subtle,
    },
});
