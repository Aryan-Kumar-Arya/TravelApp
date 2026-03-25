import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { theme as T } from './src/theme/theme';

// Auth Screens
import LoginScreen from './src/screens/LoginScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import HomeRecommendationScreen from './src/screens/HomeRecommendationScreen';
import TripDetailsScreen from './src/screens/TripDetailsScreen';

// Main Screens
import TripsScreen from './src/screens/TripsScreen';
import ExploreSwipeScreen from './src/screens/ExploreSwipeScreen'; // New Recommendation cards
import ExploreScreen from './src/screens/ExploreScreen'; // Old ExploreScreen (Discover people)
import MatchesScreen from './src/screens/MatchesScreen';
import ChatScreen from './src/screens/ChatScreen';

// Profile Modal is not a screen here, it will be a component on TripsScreen

// AI AI Itinerary Screens
import GeneratingItineraryScreen from './src/screens/GeneratingItineraryScreen';
import ItineraryDetailScreen from './src/screens/ItineraryDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ExploreStack = createNativeStackNavigator();
const AuthAppStack = createNativeStackNavigator();

const TAB_ICONS = {
  Trips: { focused: 'airplane', unfocused: 'airplane-outline' },
  Explore: { focused: 'compass', unfocused: 'compass-outline' },
  Discover: { focused: 'flame', unfocused: 'flame-outline' },
  Connections: { focused: 'heart', unfocused: 'heart-outline' },
};

// Reusing ExploreStack for Trips (since trips can navigate to generated itineraries)
function TripsStackNavigator() {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="TripsMain" component={TripsScreen} />
      <ExploreStack.Screen name="GeneratingItineraryScreen" component={GeneratingItineraryScreen} />
      <ExploreStack.Screen name="ItineraryDetailScreen" component={ItineraryDetailScreen} />
    </ExploreStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.focused : icons.unfocused;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: T.brand.primaryLight,
        tabBarInactiveTintColor: T.text.tertiary,
        tabBarStyle: {
          backgroundColor: T.bg.secondary,
          borderTopWidth: 1,
          borderTopColor: T.border.subtle,
          height: 88,
          paddingBottom: 28,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Trips" component={TripsStackNavigator} />
      <Tab.Screen name="Explore" component={ExploreSwipeScreen} />
      <Tab.Screen name="Discover" component={ExploreScreen} />
      <Tab.Screen name="Connections" component={MatchesScreen} />
    </Tab.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="HomeRecommendation" component={HomeRecommendationScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStackNavigator() {
  return (
    <AuthAppStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthAppStack.Screen name="MainTabs" component={MainTabNavigator} />
      <AuthAppStack.Screen name="ChatScreen" component={ChatScreen} />
    </AuthAppStack.Navigator>
  );
}

function NavigationRoot() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: T.bg.primary, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={T.brand.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <AuthProvider>
        <NavigationRoot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
