import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const userData = await AsyncStorage.getItem('@user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setIsAdmin(parsedUser.role === 'admin');
            }
        } catch (error) {
            console.error('Error checking auth state:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            // Simulate API call - Replace with actual API integration
            const mockUser = {
                id: '1',
                name: 'John Doe',
                email: email,
                role: email.includes('admin') ? 'admin' : 'user',
                avatar: null,
            };

            await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
            setUser(mockUser);
            setIsAdmin(mockUser.role === 'admin');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (name, email, password, phone) => {
        try {
            // Simulate API call - Replace with actual API integration
            const mockUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                phone: phone,
                role: 'user',
                avatar: null,
            };

            await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
            setUser(mockUser);
            setIsAdmin(false);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('@user');
            setUser(null);
            setIsAdmin(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const updateProfile = async (updates) => {
        try {
            const updatedUser = { ...user, ...updates };
            await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAdmin,
                login,
                register,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
