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
import TripDetailsScreen from './src/screens/TripDetailsScreen';

// Main Screens
import ExploreScreen from './src/screens/ExploreScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const TAB_ICONS = {
  Explore: { focused: 'compass', unfocused: 'compass-outline' },
  Discover: { focused: 'flame', unfocused: 'flame-outline' },
  Connections: { focused: 'heart', unfocused: 'heart-outline' },
  Profile: { focused: 'person', unfocused: 'person-outline' },
};

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
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
      <Tab.Screen name="Explore" component={RecommendationsScreen} />
      <Tab.Screen name="Discover" component={ExploreScreen} />
      <Tab.Screen name="Connections" component={MatchesScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
    </Stack.Navigator>
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
      {isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />}
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
