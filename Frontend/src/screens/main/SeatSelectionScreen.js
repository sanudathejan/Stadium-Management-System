import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useBooking } from '../../context/BookingContext';
import { Seat, SeatLegend } from '../../components/Seat';
import Button from '../../components/Button';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/fonts';

const { width } = Dimensions.get('window');

// Generate mock seats
const generateSeats = () => {
    const sections = [
        { name: 'VIP', rows: ['A', 'B'], seatsPerRow: 10, category: 'VIP', price: 200 },
        { name: 'Ringside', rows: ['C', 'D', 'E'], seatsPerRow: 12, category: 'Ringside', price: 150 },
        { name: 'Normal', rows: ['F', 'G', 'H', 'I', 'J'], seatsPerRow: 15, category: 'Normal', price: 75 },
        { name: 'End Stand', rows: ['K', 'L', 'M'], seatsPerRow: 18, category: 'End Stand', price: 45 },
    ];

    let seats = [];
    sections.forEach((section) => {
        section.rows.forEach((row) => {
            for (let i = 1; i <= section.seatsPerRow; i++) {
                seats.push({
                    id: `${row}${i}`,
                    row: row,
                    number: i,
                    category: section.category,
                    price: section.price,
                    status: Math.random() > 0.7 ? 'booked' : 'available',
                });
            }
        });
    });
    return seats;
};

const SeatSelectionScreen = ({ route, navigation }) => {
    const { selectedEvent, selectedSeats, toggleSeatSelection, clearSeats } = useBooking();
    const [seats] = useState(generateSeats());
    const [zoomLevel, setZoomLevel] = useState(1);

    const groupedSeats = useMemo(() => {
        const grouped = {};
        seats.forEach((seat) => {
            if (!grouped[seat.row]) {
                grouped[seat.row] = [];
            }
            grouped[seat.row].push(seat);
        });
        return grouped;
    }, [seats]);

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    const handleSeatPress = (seat) => {
        if (selectedSeats.length >= 10 && !selectedSeats.find((s) => s.id === seat.id)) {
            Alert.alert('Limit Reached', 'You can select up to 10 seats at a time.');
            return;
        }
        toggleSeatSelection(seat);
    };

    const handleContinue = () => {
        if (selectedSeats.length === 0) {
            Alert.alert('No Seats Selected', 'Please select at least one seat to continue.');
            return;
        }
        navigation.navigate('FoodOrder');
    };

    const handleRandomSelect = () => {
        clearSeats();
        const availableSeats = seats.filter((s) => s.status === 'available');
        const count = Math.min(4, availableSeats.length);
        const shuffled = availableSeats.sort(() => 0.5 - Math.random());
        shuffled.slice(0, count).forEach((seat) => toggleSeatSelection(seat));
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
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Select Seats</Text>
                    <Text style={styles.headerSubtitle} numberOfLines={1}>
                        {selectedEvent?.title}
                    </Text>
                </View>
                <TouchableOpacity style={styles.randomButton} onPress={handleRandomSelect}>
                    <Ionicons name="shuffle" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Stage/Field Indicator */}
                <LinearGradient
                    colors={GRADIENTS.primary}
                    style={styles.stageContainer}
                >
                    <Text style={styles.stageText}>🏟️ FIELD / STAGE</Text>
                </LinearGradient>

                {/* Seat Legend */}
                <SeatLegend />

                {/* Zoom Controls */}
                <View style={styles.zoomControls}>
                    <TouchableOpacity
                        style={styles.zoomButton}
                        onPress={() => setZoomLevel(Math.max(0.6, zoomLevel - 0.2))}
                    >
                        <Ionicons name="remove" size={20} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.zoomText}>{Math.round(zoomLevel * 100)}%</Text>
                    <TouchableOpacity
                        style={styles.zoomButton}
                        onPress={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.2))}
                    >
                        <Ionicons name="add" size={20} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Seat Map */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.seatMapContainer}
                >
                    <View style={[styles.seatMap, { transform: [{ scale: zoomLevel }] }]}>
                        {Object.entries(groupedSeats).map(([row, rowSeats]) => (
                            <View key={row} style={styles.seatRow}>
                                <Text style={styles.rowLabel}>{row}</Text>
                                <View style={styles.seats}>
                                    {rowSeats.map((seat) => (
                                        <Seat
                                            key={seat.id}
                                            seat={seat}
                                            onPress={handleSeatPress}
                                            isSelected={selectedSeats.some((s) => s.id === seat.id)}
                                        />
                                    ))}
                                </View>
                                <Text style={styles.rowLabel}>{row}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Selected Seats Summary */}
                {selectedSeats.length > 0 && (
                    <View style={styles.selectedContainer}>
                        <View style={styles.selectedHeader}>
                            <Text style={styles.selectedTitle}>
                                Selected Seats ({selectedSeats.length})
                            </Text>
                            <TouchableOpacity onPress={clearSeats}>
                                <Text style={styles.clearText}>Clear All</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.selectedSeats}
                        >
                            {selectedSeats.map((seat) => (
                                <View key={seat.id} style={styles.selectedSeatCard}>
                                    <Text style={styles.selectedSeatNumber}>
                                        {seat.row}{seat.number}
                                    </Text>
                                    <Text style={styles.selectedSeatCategory}>{seat.category}</Text>
                                    <Text style={styles.selectedSeatPrice}>${seat.price}</Text>
                                    <TouchableOpacity
                                        style={styles.removeSeatButton}
                                        onPress={() => toggleSeatSelection(seat)}
                                    >
                                        <Ionicons name="close" size={14} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomContainer}>
                <View style={styles.priceInfo}>
                    <Text style={styles.priceLabel}>
                        {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}
                    </Text>
                    <Text style={styles.priceValue}>${totalPrice.toFixed(2)}</Text>
                </View>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    variant="primary"
                    size="large"
                    disabled={selectedSeats.length === 0}
                    style={styles.continueButton}
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
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.huge,
        paddingBottom: SPACING.lg,
        backgroundColor: COLORS.background,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCenter: {
        flex: 1,
        marginHorizontal: SPACING.md,
    },
    headerTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    headerSubtitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    randomButton: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 120,
    },
    stageContainer: {
        marginHorizontal: SPACING.xl,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    stageText: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
        letterSpacing: 2,
    },
    zoomControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.md,
    },
    zoomButton: {
        width: 36,
        height: 36,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    zoomText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        marginHorizontal: SPACING.lg,
        minWidth: 50,
        textAlign: 'center',
    },
    seatMapContainer: {
        paddingHorizontal: SPACING.lg,
    },
    seatMap: {
        alignItems: 'center',
        paddingVertical: SPACING.lg,
    },
    seatRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    rowLabel: {
        width: 24,
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
    seats: {
        flexDirection: 'row',
    },
    selectedContainer: {
        marginHorizontal: SPACING.xl,
        marginTop: SPACING.lg,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    selectedTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
    },
    clearText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.error,
        fontWeight: FONTS.weights.medium,
    },
    selectedSeats: {
        gap: SPACING.md,
    },
    selectedSeatCard: {
        backgroundColor: COLORS.primary + '20',
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        alignItems: 'center',
        minWidth: 80,
        marginRight: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.primary,
        position: 'relative',
    },
    selectedSeatNumber: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.primary,
    },
    selectedSeatCategory: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    selectedSeatPrice: {
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
        marginTop: SPACING.xs,
    },
    removeSeatButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.error,
        justifyContent: 'center',
        alignItems: 'center',
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
    priceInfo: {
        marginRight: SPACING.xl,
    },
    priceLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    priceValue: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    continueButton: {
        flex: 1,
    },
});

export default SeatSelectionScreen;
