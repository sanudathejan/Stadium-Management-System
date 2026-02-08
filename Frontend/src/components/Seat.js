import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS } from '../constants/fonts';

const SeatIcon = ({ category, isSelected, isBooked }) => {
    let backgroundColor = COLORS.seatAvailable;

    if (isBooked) {
        backgroundColor = COLORS.seatBooked;
    } else if (isSelected) {
        backgroundColor = COLORS.seatSelected;
    } else {
        switch (category) {
            case 'VIP':
                backgroundColor = COLORS.seatVIP;
                break;
            case 'Ringside':
                backgroundColor = COLORS.seatRingside;
                break;
            case 'End Stand':
                backgroundColor = COLORS.seatEndStand;
                break;
            default:
                backgroundColor = COLORS.seatNormal;
        }
    }

    return (
        <View
            style={[
                styles.seatIcon,
                { backgroundColor },
                isSelected && styles.seatSelectedBorder,
            ]}
        />
    );
};

const Seat = ({ seat, onPress, isSelected = false }) => {
    const isBooked = seat.status === 'booked';

    return (
        <TouchableOpacity
            onPress={() => !isBooked && onPress(seat)}
            disabled={isBooked}
            activeOpacity={0.7}
            style={[
                styles.container,
                isSelected && styles.containerSelected,
                isBooked && styles.containerBooked,
            ]}
        >
            <SeatIcon
                category={seat.category}
                isSelected={isSelected}
                isBooked={isBooked}
            />
            <Text style={[styles.seatNumber, isBooked && styles.bookedText]}>
                {seat.row}{seat.number}
            </Text>
        </TouchableOpacity>
    );
};

const SeatLegend = () => {
    const legendItems = [
        { label: 'Available', color: COLORS.seatNormal },
        { label: 'Selected', color: COLORS.seatSelected },
        { label: 'Booked', color: COLORS.seatBooked },
        { label: 'VIP', color: COLORS.seatVIP },
        { label: 'Ringside', color: COLORS.seatRingside },
    ];

    return (
        <View style={styles.legendContainer}>
            {legendItems.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                    <Text style={styles.legendLabel}>{item.label}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.xs,
        margin: 2,
    },
    containerSelected: {
        transform: [{ scale: 1.1 }],
    },
    containerBooked: {
        opacity: 0.5,
    },
    seatIcon: {
        width: 28,
        height: 28,
        borderRadius: 6,
        marginBottom: 2,
    },
    seatSelectedBorder: {
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    seatNumber: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textSecondary,
        fontWeight: FONTS.weights.medium,
    },
    bookedText: {
        color: COLORS.textMuted,
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.md,
        marginVertical: SPACING.md,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SPACING.md,
        marginVertical: SPACING.xs,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 3,
        marginRight: SPACING.xs,
    },
    legendLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
});

export { Seat, SeatLegend };
export default Seat;
