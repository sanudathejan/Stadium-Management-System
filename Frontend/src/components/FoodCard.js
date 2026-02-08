import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/fonts';

const FoodCard = ({ item, quantity = 0, onAdd, onRemove }) => {
    return (
        <View style={[styles.container, SHADOWS.small]}>
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="fast-food" size={30} color={COLORS.primary} />
                    </View>
                )}
            </View>
            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    <View style={styles.quantityContainer}>
                        {quantity > 0 ? (
                            <>
                                <TouchableOpacity
                                    onPress={() => onRemove(item)}
                                    style={styles.quantityButton}
                                >
                                    <Ionicons name="remove" size={18} color={COLORS.white} />
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => onAdd(item, 1)}
                                    style={[styles.quantityButton, styles.addButton]}
                                >
                                    <Ionicons name="add" size={18} color={COLORS.white} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity
                                onPress={() => onAdd(item, 1)}
                                style={styles.addFirstButton}
                            >
                                <Ionicons name="add" size={16} color={COLORS.white} />
                                <Text style={styles.addText}>Add</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    imageContainer: {
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        padding: SPACING.md,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
    },
    description: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginVertical: SPACING.xs,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.primary,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: COLORS.primary,
    },
    quantity: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
        marginHorizontal: SPACING.md,
        minWidth: 20,
        textAlign: 'center',
    },
    addFirstButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
    },
    addText: {
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.white,
        marginLeft: SPACING.xs,
    },
});

export default FoodCard;
