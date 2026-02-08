import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/fonts';

const EventCard = ({ event, onPress, variant = 'default' }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (variant === 'featured') {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.9}
                style={[styles.featuredContainer, SHADOWS.large]}
            >
                <LinearGradient
                    colors={GRADIENTS.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.featuredGradient}
                >
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredBadgeText}>FEATURED</Text>
                    </View>
                    <View style={styles.featuredContent}>
                        <Text style={styles.featuredTitle}>{event.title}</Text>
                        <Text style={styles.featuredVenue}>
                            <Ionicons name="location" size={14} color={COLORS.white} /> {event.venue}
                        </Text>
                        <Text style={styles.featuredDate}>
                            <Ionicons name="calendar" size={14} color={COLORS.white} /> {formatDate(event.date)}
                        </Text>
                        <View style={styles.featuredFooter}>
                            <Text style={styles.featuredPrice}>From ${event.minPrice}</Text>
                            <View style={styles.featuredSeats}>
                                <Ionicons name="people" size={16} color={COLORS.white} />
                                <Text style={styles.featuredSeatsText}>
                                    {event.availableSeats} seats left
                                </Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.container, SHADOWS.medium]}
        >
            <View style={styles.imageContainer}>
                {event.image ? (
                    <Image source={{ uri: event.image }} style={styles.image} />
                ) : (
                    <LinearGradient
                        colors={GRADIENTS.card}
                        style={styles.imagePlaceholder}
                    >
                        <Ionicons name="american-football" size={40} color={COLORS.primary} />
                    </LinearGradient>
                )}
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{event.category}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {event.title}
                </Text>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
                    <Text style={styles.infoText}>{event.venue}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
                    <Text style={styles.infoText}>{formatDate(event.date)}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.price}>From ${event.minPrice}</Text>
                    <Text style={styles.seats}>{event.availableSeats} seats</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    imageContainer: {
        height: 140,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryBadge: {
        position: 'absolute',
        top: SPACING.md,
        left: SPACING.md,
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
    },
    categoryText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.xs,
        fontWeight: FONTS.weights.bold,
        textTransform: 'uppercase',
    },
    content: {
        padding: SPACING.lg,
    },
    title: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    infoText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginLeft: SPACING.xs,
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
    price: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.primary,
    },
    seats: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.secondary,
        fontWeight: FONTS.weights.medium,
    },
    // Featured styles
    featuredContainer: {
        borderRadius: BORDER_RADIUS.xl,
        overflow: 'hidden',
        marginBottom: SPACING.lg,
    },
    featuredGradient: {
        padding: SPACING.xl,
        minHeight: 200,
    },
    featuredBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
        alignSelf: 'flex-start',
        marginBottom: SPACING.md,
    },
    featuredBadgeText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.xs,
        fontWeight: FONTS.weights.bold,
    },
    featuredContent: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    featuredTitle: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
        marginBottom: SPACING.sm,
    },
    featuredVenue: {
        fontSize: FONTS.sizes.md,
        color: COLORS.white,
        opacity: 0.9,
        marginBottom: SPACING.xs,
    },
    featuredDate: {
        fontSize: FONTS.sizes.md,
        color: COLORS.white,
        opacity: 0.9,
        marginBottom: SPACING.lg,
    },
    featuredFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    featuredPrice: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
    },
    featuredSeats: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
    },
    featuredSeatsText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.sm,
        marginLeft: SPACING.xs,
    },
});

export default EventCard;
