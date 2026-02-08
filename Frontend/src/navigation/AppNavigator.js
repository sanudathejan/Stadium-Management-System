import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from '../context/AuthContext';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS } from '../constants/fonts';

// Auth Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import EventDetailsScreen from '../screens/main/EventDetailsScreen';
import SeatSelectionScreen from '../screens/main/SeatSelectionScreen';
import FoodOrderScreen from '../screens/main/FoodOrderScreen';
import BookingConfirmationScreen from '../screens/main/BookingConfirmationScreen';
import BookingSuccessScreen from '../screens/main/BookingSuccessScreen';
import BookingsScreen from '../screens/main/BookingsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

// Admin Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import ManageEventsScreen from '../screens/admin/ManageEventsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Icon
const TabIcon = ({ focused, iconName, color }) => {
    if (focused) {
        return (
            <LinearGradient
                colors={GRADIENTS.primary}
                style={styles.activeTabIcon}
            >
                <Ionicons name={iconName} size={22} color={COLORS.white} />
            </LinearGradient>
        );
    }
    return <Ionicons name={iconName} size={24} color={color} />;
};

// Main Tab Navigator
const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textMuted,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarShowLabel: true,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} iconName="home" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Events"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} iconName="calendar" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Bookings"
                component={BookingsScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} iconName="ticket" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} iconName="person" color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

// Auth Stack Navigator
const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

// Main App Stack Navigator
const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
            <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
            <Stack.Screen name="FoodOrder" component={FoodOrderScreen} />
            <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
            <Stack.Screen
                name="BookingSuccess"
                component={BookingSuccessScreen}
                options={{ gestureEnabled: false }}
            />
            {/* Admin Screens */}
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            <Stack.Screen name="ManageEvents" component={ManageEventsScreen} />
        </Stack.Navigator>
    );
};

// Root Navigator
const AppNavigator = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <LinearGradient colors={GRADIENTS.primary} style={styles.loadingGradient}>
                    <Ionicons name="american-football" size={60} color={COLORS.white} />
                </LinearGradient>
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        backgroundColor: COLORS.backgroundLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        height: 80,
        paddingBottom: 20,
        paddingTop: 10,
    },
    tabBarLabel: {
        fontSize: FONTS.sizes.xs,
        fontWeight: FONTS.weights.medium,
        marginTop: 4,
    },
    activeTabIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    loadingGradient: {
        width: 120,
        height: 120,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppNavigator;
