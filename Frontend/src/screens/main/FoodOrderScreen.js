import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBooking } from '../../context/BookingContext';
import FoodCard from '../../components/FoodCard';
import Button from '../../components/Button';
import { COLORS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/fonts';

// Mock food items
const FOOD_ITEMS = [
    {
        id: '1',
        name: 'Classic Burger',
        description: 'Juicy beef patty with fresh vegetables',
        price: 12.99,
        category: 'Food',
        image: null,
    },
    {
        id: '2',
        name: 'Hot Dog Combo',
        description: 'Premium hot dog with fries and drink',
        price: 9.99,
        category: 'Food',
        image: null,
    },
    {
        id: '3',
        name: 'Nachos Supreme',
        description: 'Loaded nachos with cheese and jalapeños',
        price: 8.99,
        category: 'Food',
        image: null,
    },
    {
        id: '4',
        name: 'Pizza Slice',
        description: 'Fresh pepperoni pizza slice',
        price: 6.99,
        category: 'Food',
        image: null,
    },
    {
        id: '5',
        name: 'Coca-Cola',
        description: 'Large 32oz refreshing soft drink',
        price: 4.99,
        category: 'Drinks',
        image: null,
    },
    {
        id: '6',
        name: 'Beer',
        description: 'Ice cold draft beer',
        price: 8.99,
        category: 'Drinks',
        image: null,
    },
    {
        id: '7',
        name: 'Bottled Water',
        description: 'Pure spring water',
        price: 2.99,
        category: 'Drinks',
        image: null,
    },
    {
        id: '8',
        name: 'Popcorn',
        description: 'Large bucket of buttery popcorn',
        price: 7.99,
        category: 'Snacks',
        image: null,
    },
    {
        id: '9',
        name: 'Pretzel',
        description: 'Warm soft pretzel with cheese dip',
        price: 5.99,
        category: 'Snacks',
        image: null,
    },
    {
        id: '10',
        name: 'Ice Cream',
        description: 'Premium vanilla ice cream cup',
        price: 4.99,
        category: 'Snacks',
        image: null,
    },
];

const CATEGORIES = ['All', 'Food', 'Drinks', 'Snacks'];

const FoodOrderScreen = ({ navigation }) => {
    const {
        selectedSeats,
        foodOrders,
        addFoodOrder,
        updateFoodQuantity,
        calculateTotal,
    } = useBooking();

    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredItems = selectedCategory === 'All'
        ? FOOD_ITEMS
        : FOOD_ITEMS.filter((item) => item.category === selectedCategory);

    const seatsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const foodTotal = foodOrders.reduce((sum, order) => sum + order.price * order.quantity, 0);
    const grandTotal = seatsTotal + foodTotal;

    const getItemQuantity = (itemId) => {
        const order = foodOrders.find((o) => o.id === itemId);
        return order ? order.quantity : 0;
    };

    const handleRemove = (item) => {
        const currentQty = getItemQuantity(item.id);
        updateFoodQuantity(item.id, currentQty - 1);
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
                    <Text style={styles.headerTitle}>Pre-order Food</Text>
                    <Text style={styles.headerSubtitle}>
                        Skip the queue, order now!
                    </Text>
                </View>
                <View style={styles.cartBadge}>
                    <Ionicons name="cart" size={24} color={COLORS.textPrimary} />
                    {foodOrders.length > 0 && (
                        <View style={styles.cartCount}>
                            <Text style={styles.cartCountText}>
                                {foodOrders.reduce((sum, o) => sum + o.quantity, 0)}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Category Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
                contentContainerStyle={styles.categoriesContent}
            >
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category}
                        onPress={() => setSelectedCategory(category)}
                        style={[
                            styles.categoryTab,
                            selectedCategory === category && styles.categoryTabActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.categoryTabText,
                                selectedCategory === category && styles.categoryTabTextActive,
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Food Items */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle" size={20} color={COLORS.info} />
                    <Text style={styles.infoText}>
                        Food will be ready for pickup at your seat section during the event
                    </Text>
                </View>

                {filteredItems.map((item) => (
                    <FoodCard
                        key={item.id}
                        item={item}
                        quantity={getItemQuantity(item.id)}
                        onAdd={addFoodOrder}
                        onRemove={handleRemove}
                    />
                ))}

                {/* Order Summary */}
                {foodOrders.length > 0 && (
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>Order Summary</Text>
                        {foodOrders.map((order) => (
                            <View key={order.id} style={styles.summaryItem}>
                                <Text style={styles.summaryItemName}>
                                    {order.quantity}x {order.name}
                                </Text>
                                <Text style={styles.summaryItemPrice}>
                                    ${(order.price * order.quantity).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Food Subtotal</Text>
                            <Text style={styles.summaryValue}>${foodTotal.toFixed(2)}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomContainer}>
                <View style={styles.priceBreakdown}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Seats ({selectedSeats.length})</Text>
                        <Text style={styles.priceValue}>${seatsTotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Food</Text>
                        <Text style={styles.priceValue}>${foodTotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Skip"
                        onPress={() => navigation.navigate('BookingConfirmation')}
                        variant="outline"
                        size="medium"
                        style={styles.skipButton}
                    />
                    <Button
                        title="Checkout"
                        onPress={() => navigation.navigate('BookingConfirmation')}
                        variant="primary"
                        size="medium"
                        style={styles.checkoutButton}
                    />
                </View>
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
    cartBadge: {
        position: 'relative',
    },
    cartCount: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartCountText: {
        fontSize: 11,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
    },
    categoriesContainer: {
        maxHeight: 50,
        marginBottom: SPACING.md,
    },
    categoriesContent: {
        paddingHorizontal: SPACING.lg,
    },
    categoryTab: {
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.backgroundLight,
        marginRight: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    categoryTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryTabText: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textSecondary,
    },
    categoryTabTextActive: {
        color: COLORS.white,
    },
    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: 220,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.info + '20',
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.lg,
    },
    infoText: {
        flex: 1,
        fontSize: FONTS.sizes.sm,
        color: COLORS.info,
        marginLeft: SPACING.sm,
    },
    summaryCard: {
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginTop: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    summaryTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    summaryItemName: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
    },
    summaryItemPrice: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textPrimary,
        fontWeight: FONTS.weights.medium,
    },
    summaryDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.md,
    },
    summaryLabel: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textPrimary,
    },
    summaryValue: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.bold,
        color: COLORS.primary,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING.lg,
        backgroundColor: COLORS.backgroundLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        ...SHADOWS.large,
    },
    priceBreakdown: {
        marginBottom: SPACING.md,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
    },
    priceLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    priceValue: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textPrimary,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        marginTop: SPACING.xs,
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
    buttonContainer: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    skipButton: {
        flex: 1,
    },
    checkoutButton: {
        flex: 2,
    },
});

export default FoodOrderScreen;
