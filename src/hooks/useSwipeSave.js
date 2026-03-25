import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { ToastAndroid, Alert, Platform } from 'react-native';

const mockApi = {
    post: async (endpoint, data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 90% success rate to simulate realism
                if (Math.random() > 0.1) resolve({ success: true });
                else reject(new Error('Network error'));
            }, 500);
        });
    }
};

export const useSwipeSave = () => {
    const [isSaving, setIsSaving] = useState(false);
    const { addLikedRecommendation, removeLikedRecommendation, currentTrip } = useAuth();

    const handleSwipeRight = async (card) => {
        setIsSaving(true);

        // -- OPTIMISTIC UI --
        // 1. Immediately add to context state for instant UI update on 'Trips' Screen
        const tripStampedCard = { ...card, savedTripId: currentTrip?.id || 'unknown' };
        addLikedRecommendation(tripStampedCard);
        
        // 2. Persist to local storage immediately
        try {
            const existing = await AsyncStorage.getItem('@liked_recs');
            const parsed = existing ? JSON.parse(existing) : [];
            const cardId = card.uniqueId || card.id;
            if (!parsed.find(r => (r.uniqueId || r.id) === cardId)) {
                await AsyncStorage.setItem('@liked_recs', JSON.stringify([...parsed, tripStampedCard]));
            }
        } catch (e) {
            console.error('AsyncStorage error adding pick', e);
        }

        // -- BACKEND SYNC --
        try {
            const cardId = card.uniqueId || card.id;
            await mockApi.post('/swipes', { 
                target_user_id: cardId, 
                direction: 'right',
                timestamp: new Date().toISOString()
            });
            // Success! No action needed as UI is already updated optimistically.
        } catch (e) {
            console.warn('Backend sync failed, rolling back optimistic UI...', e);
            const cardId = card.uniqueId || card.id;
            
            // -- ROLLBACK --
            // Revert the Front-End Context State
            if (removeLikedRecommendation) {
                removeLikedRecommendation(cardId);
            }
            
            // Revert AsyncStorage
            try {
                 const existing = await AsyncStorage.getItem('@liked_recs');
                 const parsed = existing ? JSON.parse(existing) : [];
                 await AsyncStorage.setItem('@liked_recs', JSON.stringify(parsed.filter(r => (r.uniqueId || r.id) !== cardId)));
            } catch (err) {
                 console.error('AsyncStorage error rolling back', err);
            }

            // Show Feedback
            if (Platform.OS === 'android') {
                ToastAndroid.show('Failed to save pick. Please try again.', ToastAndroid.SHORT);
            } else {
                Alert.alert('Error', 'Failed to save pick. Please try again.');
            }
        } finally {
            setIsSaving(false);
        }
    };

    return { handleSwipeRight, isSaving };
};
