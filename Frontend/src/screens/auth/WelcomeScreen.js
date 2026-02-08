import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { FONTS, SPACING } from '../../constants/fonts';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[COLORS.background, COLORS.backgroundLight, COLORS.background]}
                style={styles.gradient}
            >
                {/* Decorative Elements */}
                <View style={styles.decorativeContainer}>
                    <Animated.View
                        style={[
                            styles.circle,
                            styles.circle1,
                            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.circle,
                            styles.circle2,
                            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.circle,
                            styles.circle3,
                            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                        ]}
                    />
                </View>

                {/* Logo and Title */}
                <Animated.View
                    style={[
                        styles.heroContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
                        },
                    ]}
                >
                    <View style={styles.logoContainer}>
                        <LinearGradient
                            colors={GRADIENTS.primary}
                            style={styles.logoGradient}
                        >
                            <Ionicons name="american-football" size={60} color={COLORS.white} />
                        </LinearGradient>
                    </View>
                    <Text style={styles.title}>StadiumBook</Text>
                    <Text style={styles.subtitle}>
                        Book Your Perfect Seat for Every Event
                    </Text>
                </Animated.View>

                {/* Features */}
                <Animated.View
                    style={[
                        styles.featuresContainer,
                        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    <View style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                            <Ionicons name="ticket" size={24} color={COLORS.primary} />
                        </View>
                        <Text style={styles.featureText}>Easy Booking</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                            <Ionicons name="grid" size={24} color={COLORS.secondary} />
                        </View>
                        <Text style={styles.featureText}>Select Seats</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                            <Ionicons name="fast-food" size={24} color={COLORS.accent} />
                        </View>
                        <Text style={styles.featureText}>Pre-order Food</Text>
                    </View>
                </Animated.View>

                {/* Buttons */}
                <Animated.View
                    style={[
                        styles.buttonsContainer,
                        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    <Button
                        title="Get Started"
                        onPress={() => navigation.navigate('Register')}
                        variant="primary"
                        size="large"
                        style={styles.button}
                    />
                    <Button
                        title="I already have an account"
                        onPress={() => navigation.navigate('Login')}
                        variant="ghost"
                        style={styles.linkButton}
                    />
                </Animated.View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
    },
    decorativeContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
        opacity: 0.1,
    },
    circle1: {
        width: 400,
        height: 400,
        backgroundColor: COLORS.primary,
        top: -100,
        right: -100,
    },
    circle2: {
        width: 300,
        height: 300,
        backgroundColor: COLORS.secondary,
        bottom: 100,
        left: -100,
    },
    circle3: {
        width: 200,
        height: 200,
        backgroundColor: COLORS.accent,
        bottom: -50,
        right: 50,
    },
    heroContainer: {
        alignItems: 'center',
        marginBottom: SPACING.huge,
    },
    logoContainer: {
        marginBottom: SPACING.xl,
    },
    logoGradient: {
        width: 120,
        height: 120,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: FONTS.sizes.display,
        fontWeight: FONTS.weights.extrabold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
    },
    subtitle: {
        fontSize: FONTS.sizes.lg,
        color: COLORS.textSecondary,
        textAlign: 'center',
        paddingHorizontal: SPACING.xxl,
        lineHeight: 24,
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: SPACING.xl,
        marginBottom: SPACING.huge,
    },
    featureItem: {
        alignItems: 'center',
        marginHorizontal: SPACING.lg,
    },
    featureIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    featureText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        fontWeight: FONTS.weights.medium,
    },
    buttonsContainer: {
        paddingHorizontal: SPACING.xxl,
    },
    button: {
        marginBottom: SPACING.lg,
    },
    linkButton: {
        marginTop: SPACING.sm,
    },
});

export default WelcomeScreen;
