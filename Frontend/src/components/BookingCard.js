import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/fonts';

const BookingCard = ({ booking, onPress }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return COLORS.success;
            case 'pending':
                return COLORS.warning;
            case 'cancelled':
                return COLORS.error;
            default:
                return COLORS.textSecondary;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return 'checkmark-circle';
            case 'pending':
                return 'time';
            case 'cancelled':
                return 'close-circle';
            default:
                return 'help-circle';
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.container, SHADOWS.medium]}
        >
            <View style={styles.header}>
                <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle} numberOfLines={1}>
                        {booking.event?.title || 'Event'}
                    </Text>
                    <Text style={styles.venue}>
                        <Ionicons name="location-outline" size={12} color={COLORS.textSecondary} />
                        {' '}
                        {booking.event?.venue || 'Venue'}
                    </Text>
                </View>
                <View
                    style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(booking.status) + '20' },
                    ]}
                >
                    <Ionicons
                        name={getStatusIcon(booking.status)}
                        size={14}
                        color={getStatusColor(booking.status)}
                    />
                    <Text
                        style={[styles.statusText, { color: getStatusColor(booking.status) }]}
                    >
                        {booking.status}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.detailText}>
                        {formatDate(booking.event?.date || booking.bookedAt)}
                    </Text>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="ticket-outline" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.detailText}>
                        {booking.seats?.length || 0} seat(s)
                    </Text>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="pricetag-outline" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.detailText}>
                        ${booking.total?.toFixed(2) || '0.00'}
                    </Text>
                </View>
            </View>

            {booking.seats && booking.seats.length > 0 && (
                <View style={styles.seatsContainer}>
                    <Text style={styles.seatsLabel}>Seats:</Text>
                    <View style={styles.seatsList}>
                        {booking.seats.slice(0, 5).map((seat, index) => (
                            <View key={index} style={styles.seatTag}>
                                <Text style={styles.seatTagText}>
                                    {seat.row}{seat.number}
                                </Text>
                            </View>
                        ))}
                        {booking.seats.length > 5 && (
                            <View style={[styles.seatTag, styles.moreSeatTag]}>
                                <Text style={styles.seatTagText}>
                                    +{booking.seats.length - 5}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            )}

            <View style={styles.footer}>
                <Text style={styles.bookingId}>
                    Booking #{booking.id?.slice(-8) || 'N/A'}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    eventInfo: {
        flex: 1,
        marginRight: SPACING.md,
    },
    eventTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    venue: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
    },
    statusText: {
        fontSize: FONTS.sizes.xs,
        fontWeight: FONTS.weights.semibold,
        marginLeft: SPACING.xs,
        textTransform: 'capitalize',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.md,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginLeft: SPACING.xs,
    },
    seatsContainer: {
        marginTop: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    seatsLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginRight: SPACING.sm,
    },
    seatsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    seatTag: {
        backgroundColor: COLORS.primary + '30',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
        marginRight: SPACING.xs,
        marginBottom: SPACING.xs,
    },
    moreSeatTag: {
        backgroundColor: COLORS.surface,
    },
    seatTagText: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.primary,
        fontWeight: FONTS.weights.medium,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.md,
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    bookingId: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textMuted,
    },
});

export default BookingCard;
