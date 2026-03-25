import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CURRENT_USER, CURRENT_TRIP } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Session State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // Core Domain State
    const [currentUser, setCurrentUser] = useState(CURRENT_USER);
    const [currentTrip, setCurrentTrip] = useState(CURRENT_TRIP);
    const [isPremium, setIsPremium] = useState(false);
    const [matches, setMatches] = useState([]);
    const [likedRecommendations, setLikedRecommendations] = useState([]);

    // Check for saved session on mount
    useEffect(() => {
        const checkSession = async () => {
            // FORCE LOGIN: Deliberately ignore saved session 
            // so testing always feels like the first time.
            try {
                // We still clear it just to be safe
                await AsyncStorage.removeItem('@vaya_session');
                setIsAuthenticated(false);
            } catch (e) {
                console.error('Failed to clear session:', e);
            } finally {
                setIsLoading(false);
            }
            
            // Hydrate Liked Recommendations (Your Picks) independent of session
            try {
                const storedPicks = await AsyncStorage.getItem('@liked_recs');
                if (storedPicks) {
                    setLikedRecommendations(JSON.parse(storedPicks));
                }
            } catch (e) {
                console.error('Failed to load saved picks:', e);
            }
        };
        
        checkSession();
    }, []);

    // Auth Mock Methods
    const signUp = async (email, password, name) => {
        // Create a new mock user (unified profile schema)
        const newUser = {
            id: 'user-' + Date.now(),
            email,
            name,
            age: null,          // Set in profile setup
            avatar: null,       // Set in profile setup
            photo: null,
            bio: '',
            home_city: '',
            interests: [],
            photos: [],
            is_premium: false,
            trips: [],          // active + past trips live here
        };
        
        setCurrentUser(newUser);
        return newUser; 
    };

    const logIn = async (email, password) => {
        // FORCE ONBOARDING: Even for login, we treat them as a new user 
        // to test the flow. We just use the email as their name if they didn't provide one.
        return signUp(email, password, email.split('@')[0] || 'Traveler');
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('@vaya_session');
        setIsAuthenticated(false);
        setCurrentUser(CURRENT_USER); // Reset to mock defaults
    };

    // Onboarding Setup Methods
    const completeProfileSetup = async (photos, bio, homeCity, interests = []) => {
        let finalUser;
        setCurrentUser(prev => {
            finalUser = { ...prev, photos, bio, home_city: homeCity, interests };
            return finalUser;
        });
        return finalUser;
    };

    const completeTripSetup = async (destination, startDate, endDate) => {
        const newTrip = {
            id: 'trip-' + Date.now(),
            user_id: currentUser?.id || 'current-user',
            destination_city: destination,
            start_date: startDate,
            end_date: endDate,
            is_active: true,
        };

        // Deactivate any existing active trip, then add the new one
        setCurrentUser(prev => {
            const updatedTrips = (prev.trips || []).map(t =>
                t.is_active ? { ...t, is_active: false } : t
            );
            const updatedUser = { ...prev, trips: [...updatedTrips, newTrip] };

            // Once trip is set up, the onboarding flow is fully complete
            AsyncStorage.setItem('@vaya_session', JSON.stringify({ user: updatedUser }))
                .then(() => setIsAuthenticated(true));

            return updatedUser;
        });

        setCurrentTrip(newTrip);
    };

    // Match Methods
    const addMatch = (matchedUser) => {
        setMatches((prev) => {
            // Prevent duplicates
            if (prev.find((m) => m.id === matchedUser.id)) return prev;
            return [...prev, matchedUser];
        });
    };

    const addLikedRecommendation = (recommendation) => {
        setLikedRecommendations((prev) => {
            const idToMatch = recommendation.uniqueId || recommendation.id;
            if (prev.find((r) => (r.uniqueId || r.id) === idToMatch)) return prev;
            return [...prev, recommendation];
        });
    };

    const removeLikedRecommendation = (idToRemove) => {
        setLikedRecommendations((prev) => prev.filter((r) => (r.uniqueId || r.id) !== idToRemove));
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isAuthenticated,
                currentUser,
                setCurrentUser,
                currentTrip,
                setCurrentTrip,
                isPremium,
                setIsPremium,
                matches,
                addMatch,
                likedRecommendations,
                addLikedRecommendation,
                removeLikedRecommendation,
                
                // Auth Actions
                signUp,
                logIn,
                logOut,
                completeProfileSetup,
                completeTripSetup
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
