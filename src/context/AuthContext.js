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

    // Check for saved session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const sessionStr = await AsyncStorage.getItem('@vaya_session');
                if (sessionStr) {
                    const session = JSON.parse(sessionStr);
                    setCurrentUser(session.user);
                    setIsAuthenticated(true);
                }
            } catch (e) {
                console.error('Failed to load session:', e);
            } finally {
                setIsLoading(false);
            }
        };
        
        checkSession();
    }, []);

    // Auth Mock Methods
    const signUp = async (email, password, name) => {
        // Create a new mock user
        const newUser = {
            id: 'user-' + Date.now(),
            email,
            name,
            avatar: '🧑‍💻', // Default fallback
            bio: '',
            home_city: 'Unknown',
            photos: [],
            is_premium: false,
            past_trips: [],
        };
        
        setCurrentUser(newUser);
        return newUser; // Return so the UI knows to send them to Profile Setup
    };

    const logIn = async (email, password) => {
        // Mock a login with the hardcoded current user (representing an existing account)
        const user = { ...CURRENT_USER, email };
        setCurrentUser(user);
        
        // Save session
        await AsyncStorage.setItem('@vaya_session', JSON.stringify({ user }));
        setIsAuthenticated(true);
        return user; // Return so UI knows to skip Profile Setup
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('@vaya_session');
        setIsAuthenticated(false);
        setCurrentUser(CURRENT_USER); // Reset to mock defaults
    };

    // Onboarding Setup Methods
    const completeProfileSetup = async (photos, bio, homeCity) => {
        const updatedUser = { ...currentUser, photos, bio, home_city: homeCity };
        setCurrentUser(updatedUser);
        return updatedUser;
    };

    const completeTripSetup = async (destination, startDate, endDate) => {
        const updatedTrip = {
            id: 'trip-' + Date.now(),
            user_id: currentUser.id,
            destination_city: destination,
            start_date: startDate,
            end_date: endDate,
        };
        
        // If there's an existing trip, move it to history
        let updatedUser = { ...currentUser };
        if (currentTrip) {
            const history = updatedUser.past_trips ? [...updatedUser.past_trips] : [];
            updatedUser.past_trips = [currentTrip, ...history];
            setCurrentUser(updatedUser);
        }
        
        setCurrentTrip(updatedTrip);
        
        // Once trip is set up, the onboarding flow is fully complete
        // Save the session and log them in
        await AsyncStorage.setItem('@vaya_session', JSON.stringify({ user: updatedUser }));
        setIsAuthenticated(true);
    };

    // Match Methods
    const addMatch = (matchedUser) => {
        setMatches((prev) => {
            // Prevent duplicates
            if (prev.find((m) => m.id === matchedUser.id)) return prev;
            return [...prev, matchedUser];
        });
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
