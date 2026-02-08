import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/fonts';

const BookingConfirmationScreen = ({ navigation }) => {
    const { selectedEvent, selectedSeats, foodOrders, confirmBooking } = useBooking();
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const seatsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const foodTotal = foodOrders.reduce((sum, order) => sum + order.price * order.quantity, 0);
    const serviceFee = (seatsTotal + foodTotal) * 0.05;
    const grandTotal = seatsTotal + foodTotal + serviceFee;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleConfirmBooking = () => {
        const booking = confirmBooking();
        navigation.navigate('BookingSuccess', { bookingId: booking.id });
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `I'm going to ${selectedEvent?.title} at ${selectedEvent?.venue}! 🎉`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Confirm Booking</Text>
                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                    <Ionicons name="share-outline" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Event Card */}
                <Animated.View
                    style={[
                        styles.eventCard,
                        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                    ]}
                >
                    <LinearGradient colors={GRADIENTS.primary} style={styles.eventGradient}>
                        <View style={styles.eventIconContainer}>
                            <Ionicons name="american-football" size={40} color={COLORS.white} />
                        </View>
                        <Text style={styles.eventTitle} numberOfLines={2}>
                            {selectedEvent?.title}
                        </Text>
                        <View style={styles.eventDetails}>
                            <View style={styles.eventDetailItem}>
                                <Ionicons name="location" size={14} color={COLORS.white} />
                                <Text style={styles.eventDetailText}>{selectedEvent?.venue}</Text>
                            </View>
                            <View style={styles.eventDetailItem}>
                                <Ionicons name="calendar" size={14} color={COLORS.white} />
                                <Text style={styles.eventDetailText}>
                                    {formatDate(selectedEvent?.date)}
                                </Text>
                            </View>
                            <View style={styles.eventDetailItem}>
                                <Ionicons name="time" size={14} color={COLORS.white} />
                                <Text style={styles.eventDetailText}>
                                    {formatTime(selectedEvent?.date)}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </Animated.View>

                {/* Seats Section */}
                <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="ticket" size={20} color={COLORS.primary} />
                        <Text style={styles.sectionTitle}>Selected Seats</Text>
                    </View>
                    <View style={styles.seatsGrid}>
                        {selectedSeats.map((seat) => (
                            <View key={seat.id} style={styles.seatItem}>
                                <Text style={styles.seatNumber}>{seat.row}{seat.number}</Text>
                                <Text style={styles.seatCategory}>{seat.category}</Text>
                                <Text style={styles.seatPrice}>${seat.price}</Text>
                            </View>
                        ))}
                    </View>
                </Animated.View>

                {/* Food Orders Section */}
                {foodOrders.length > 0 && (
                    <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="fast-food" size={20} color={COLORS.accent} />
                            <Text style={styles.sectionTitle}>Food Pre-orders</Text>
                        </View>
                        {foodOrders.map((order) => (
                            <View key={order.id} style={styles.foodItem}>
                                <Text style={styles.foodName}>
                                    {order.quantity}x {order.name}
                                </Text>
                                <Text style={styles.foodPrice}>
                                    ${(order.price * order.quantity).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </Animated.View>
                )}

                {/* Price Breakdown */}
                <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="receipt" size={20} color={COLORS.secondary} />
                        <Text style={styles.sectionTitle}>Price Breakdown</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>
                            Seats ({selectedSeats.length})
                        </Text>
                        <Text style={styles.priceValue}>${seatsTotal.toFixed(2)}</Text>
                    </View>
                    {foodTotal > 0 && (
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Food & Drinks</Text>
                            <Text style={styles.priceValue}>${foodTotal.toFixed(2)}</Text>
                        </View>
                    )}
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Service Fee (5%)</Text>
                        <Text style={styles.priceValue}>${serviceFee.toFixed(2)}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                    </View>
                </Animated.View>

                {/* Payment Methods */}
                <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="card" size={20} color={COLORS.info} />
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                    </View>
                    <TouchableOpacity style={styles.paymentOption}>
                        <View style={styles.paymentLeft}>
                            <View style={[styles.paymentIcon, { backgroundColor: COLORS.primary + '20' }]}>
                                <Ionicons name="card" size={20} color={COLORS.primary} />
                            </View>
                            <View>
                                <Text style={styles.paymentTitle}>Credit/Debit Card</Text>
                                <Text style={styles.paymentSubtitle}>**** **** **** 4242</Text>
                            </View>
                        </View>
                        <View style={styles.radioActive}>
                            <View style={styles.radioInner} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentOption}>
                        <View style={styles.paymentLeft}>
                            <View style={[styles.paymentIcon, { backgroundColor: COLORS.accent + '20' }]}>
                                <Ionicons name="logo-paypal" size={20} color={COLORS.accent} />
                            </View>
                            <View>
                                <Text style={styles.paymentTitle}>PayPal</Text>
                                <Text style={styles.paymentSubtitle}>john.doe@email.com</Text>
                            </View>
                        </View>
                        <View style={styles.radio} />
                    </TouchableOpacity>
                </Animated.View>

                {/* Terms */}
                <View style={styles.termsContainer}>
                    <Ionicons name="information-circle" size={16} color={COLORS.textMuted} />
                    <Text style={styles.termsText}>
                        By confirming, you agree to our Terms of Service and Cancellation Policy
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomTotal}>
                    <Text style={styles.bottomTotalLabel}>Total</Text>
                    <Text style={styles.bottomTotalValue}>${grandTotal.toFixed(2)}</Text>
                </View>
                <Button
                    title="Confirm & Pay"
                    onPress={handleConfirmBooking}
                    variant="primary"
                    size="large"
                    style={styles.confirmButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.huge,
        paddingBottom: SPACING.lg,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    shareButton: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: 140,
    },
    eventCard: {
        borderRadius: BORDER_RADIUS.xl,
        overflow: 'hidden',
        marginBottom: SPACING.xl,
        ...SHADOWS.large,
    },
    eventGradient: {
        padding: SPACING.xl,
        alignItems: 'center',
    },
    eventIconContainer: {
        width: 70,
        height: 70,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    eventTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: SPACING.md,
    },
    eventDetails: {
        gap: SPACING.xs,
    },
    eventDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventDetailText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.white,
        marginLeft: SPACING.xs,
        opacity: 0.9,
    },
    section: {
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
        marginLeft: SPACING.sm,
    },
    seatsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.md,
    },
    seatItem: {
        backgroundColor: COLORS.primary + '20',
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        alignItems: 'center',
        minWidth: 80,
        borderWidth: 1,
        borderColor: COLORS.primary + '50',
    },
    seatNumber: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.primary,
    },
    seatCategory: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    seatPrice: {
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textPrimary,
        marginTop: SPACING.xs,
    },
    foodItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    foodName: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textPrimary,
    },
    foodPrice: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textPrimary,
        fontWeight: FONTS.weights.medium,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    priceLabel: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
    },
    priceValue: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.md,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
    },
    totalValue: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.primary,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIcon: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    paymentTitle: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textPrimary,
    },
    paymentSubtitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: COLORS.border,
    },
    radioActive: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: SPACING.sm,
    },
    termsText: {
        flex: 1,
        fontSize: FONTS.sizes.xs,
        color: COLORS.textMuted,
        marginLeft: SPACING.xs,
        lineHeight: 18,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.backgroundLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        ...SHADOWS.large,
    },
    bottomTotal: {
        marginRight: SPACING.xl,
    },
    bottomTotalLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    bottomTotalValue: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    confirmButton: {
        flex: 1,
    },
});

export default BookingConfirmationScreen;
