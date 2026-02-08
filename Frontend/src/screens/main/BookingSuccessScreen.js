import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS } from '../../constants/fonts';

const { width } = Dimensions.get('window');

const BookingSuccessScreen = ({ route, navigation }) => {
    const { bookingId } = route.params || {};
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const confettiAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

        // Confetti animation
        Animated.loop(
            Animated.timing(confettiAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const confettiRotation = confettiAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.background, COLORS.backgroundLight]}
                style={styles.gradient}
            >
                {/* Decorative circles */}
                <View style={styles.decorativeContainer}>
                    <Animated.View
                        style={[
                            styles.decorativeCircle,
                            styles.circle1,
                            { transform: [{ rotate: confettiRotation }] },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.decorativeCircle,
                            styles.circle2,
                            { transform: [{ rotate: confettiRotation }] },
                        ]}
                    />
                </View>

                {/* Success Icon */}
                <Animated.View
                    style={[
                        styles.successContainer,
                        { transform: [{ scale: scaleAnim }] },
                    ]}
                >
                    <LinearGradient colors={GRADIENTS.secondary} style={styles.successGradient}>
                        <Ionicons name="checkmark" size={60} color={COLORS.white} />
                    </LinearGradient>
                </Animated.View>

                {/* Success Message */}
                <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.title}>Booking Confirmed! 🎉</Text>
                    <Text style={styles.subtitle}>
                        Your tickets have been booked successfully
                    </Text>
                </Animated.View>

                {/* Booking Details Card */}
                <Animated.View style={[styles.detailsCard, { opacity: fadeAnim }]}>
                    <View style={styles.qrPlaceholder}>
                        <Ionicons name="qr-code" size={80} color={COLORS.primary} />
                        <Text style={styles.qrText}>Scan at entry</Text>
                    </View>
                    <View style={styles.bookingInfo}>
                        <Text style={styles.bookingLabel}>Booking ID</Text>
                        <Text style={styles.bookingId}>#{bookingId?.slice(-8).toUpperCase()}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Ionicons name="mail" size={18} color={COLORS.textSecondary} />
                            <Text style={styles.infoText}>E-ticket sent to your email</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Ionicons name="download" size={18} color={COLORS.textSecondary} />
                            <Text style={styles.infoText}>Download tickets for offline use</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Tips */}
                <Animated.View style={[styles.tipsContainer, { opacity: fadeAnim }]}>
                    <View style={styles.tipItem}>
                        <View style={[styles.tipIcon, { backgroundColor: COLORS.primary + '20' }]}>
                            <Ionicons name="time" size={18} color={COLORS.primary} />
                        </View>
                        <Text style={styles.tipText}>Arrive 1 hour before the event</Text>
                    </View>
                    <View style={styles.tipItem}>
                        <View style={[styles.tipIcon, { backgroundColor: COLORS.secondary + '20' }]}>
                            <Ionicons name="id-card" size={18} color={COLORS.secondary} />
                        </View>
                        <Text style={styles.tipText}>Bring a valid ID for verification</Text>
                    </View>
                    <View style={styles.tipItem}>
                        <View style={[styles.tipIcon, { backgroundColor: COLORS.accent + '20' }]}>
                            <Ionicons name="fast-food" size={18} color={COLORS.accent} />
                        </View>
                        <Text style={styles.tipText}>Pre-ordered food ready at your section</Text>
                    </View>
                </Animated.View>

                {/* Buttons */}
                <Animated.View style={[styles.buttonsContainer, { opacity: fadeAnim }]}>
                    <Button
                        title="View My Bookings"
                        onPress={() => navigation.navigate('MainTabs', { screen: 'Bookings' })}
                        variant="primary"
                        size="large"
                        style={styles.button}
                    />
                    <Button
                        title="Back to Home"
                        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
                        variant="outline"
                        size="large"
                        style={styles.button}
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
        alignItems: 'center',
        paddingTop: 80,
        paddingHorizontal: SPACING.xl,
    },
    decorativeContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    decorativeCircle: {
        position: 'absolute',
        borderRadius: 1000,
        opacity: 0.1,
    },
    circle1: {
        width: 300,
        height: 300,
        backgroundColor: COLORS.secondary,
        top: -100,
        right: -100,
    },
    circle2: {
        width: 200,
        height: 200,
        backgroundColor: COLORS.primary,
        bottom: 100,
        left: -50,
    },
    successContainer: {
        marginBottom: SPACING.xxl,
    },
    successGradient: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    messageContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xxl,
    },
    title: {
        fontSize: FONTS.sizes.xxxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONTS.sizes.lg,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
    detailsCard: {
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        width: '100%',
        alignItems: 'center',
        marginBottom: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    qrPlaceholder: {
        alignItems: 'center',
        marginBottom: SPACING.lg,
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
    },
    qrText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        marginTop: SPACING.xs,
    },
    bookingInfo: {
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    bookingLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    bookingId: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.primary,
        marginTop: SPACING.xs,
    },
    infoRow: {
        width: '100%',
        marginBottom: SPACING.sm,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginLeft: SPACING.sm,
    },
    tipsContainer: {
        width: '100%',
        marginBottom: SPACING.xl,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    tipIcon: {
        width: 36,
        height: 36,
        borderRadius: BORDER_RADIUS.sm,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    tipText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textPrimary,
    },
    buttonsContainer: {
        width: '100%',
        gap: SPACING.md,
    },
    button: {
        width: '100%',
    },
});

export default BookingSuccessScreen;
