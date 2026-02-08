import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/fonts';

const { width } = Dimensions.get('window');

const EventDetailsScreen = ({ route, navigation }) => {
    const { selectedEvent, selectEvent } = useBooking();
    const [activeTab, setActiveTab] = useState('about');

    const event = selectedEvent;

    if (!event) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading event details...</Text>
            </View>
        );
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
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

    const tabs = [
        { id: 'about', label: 'About' },
        { id: 'seating', label: 'Seating' },
        { id: 'rules', label: 'Rules' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'about':
                return (
                    <View style={styles.tabContent}>
                        <Text style={styles.description}>
                            Experience the thrill of live sports action at {event.venue}!
                            Join thousands of passionate fans for an unforgettable {event.category} event.
                            Don't miss this opportunity to witness world-class athletes compete at the highest level.
                        </Text>
                        <View style={styles.highlightCard}>
                            <View style={styles.highlightRow}>
                                <View style={styles.highlightItem}>
                                    <Ionicons name="people" size={20} color={COLORS.primary} />
                                    <Text style={styles.highlightValue}>{event.totalSeats?.toLocaleString()}</Text>
                                    <Text style={styles.highlightLabel}>Total Capacity</Text>
                                </View>
                                <View style={styles.highlightItem}>
                                    <Ionicons name="ticket" size={20} color={COLORS.secondary} />
                                    <Text style={styles.highlightValue}>{event.availableSeats?.toLocaleString()}</Text>
                                    <Text style={styles.highlightLabel}>Seats Left</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 'seating':
                return (
                    <View style={styles.tabContent}>
                        <Text style={styles.seatingSectionTitle}>Seat Categories</Text>
                        <View style={styles.seatCategories}>
                            <View style={[styles.seatCategoryCard, { borderColor: COLORS.seatVIP }]}>
                                <View style={[styles.seatDot, { backgroundColor: COLORS.seatVIP }]} />
                                <View style={styles.seatCategoryInfo}>
                                    <Text style={styles.seatCategoryName}>VIP Section</Text>
                                    <Text style={styles.seatCategoryDesc}>Premium view, exclusive access</Text>
                                </View>
                                <Text style={styles.seatCategoryPrice}>$200+</Text>
                            </View>
                            <View style={[styles.seatCategoryCard, { borderColor: COLORS.seatRingside }]}>
                                <View style={[styles.seatDot, { backgroundColor: COLORS.seatRingside }]} />
                                <View style={styles.seatCategoryInfo}>
                                    <Text style={styles.seatCategoryName}>Ringside</Text>
                                    <Text style={styles.seatCategoryDesc}>Close to the action</Text>
                                </View>
                                <Text style={styles.seatCategoryPrice}>$150+</Text>
                            </View>
                            <View style={[styles.seatCategoryCard, { borderColor: COLORS.seatNormal }]}>
                                <View style={[styles.seatDot, { backgroundColor: COLORS.seatNormal }]} />
                                <View style={styles.seatCategoryInfo}>
                                    <Text style={styles.seatCategoryName}>Normal</Text>
                                    <Text style={styles.seatCategoryDesc}>Great stadium view</Text>
                                </View>
                                <Text style={styles.seatCategoryPrice}>$75+</Text>
                            </View>
                            <View style={[styles.seatCategoryCard, { borderColor: COLORS.seatEndStand }]}>
                                <View style={[styles.seatDot, { backgroundColor: COLORS.seatEndStand }]} />
                                <View style={styles.seatCategoryInfo}>
                                    <Text style={styles.seatCategoryName}>End Stands</Text>
                                    <Text style={styles.seatCategoryDesc}>Budget-friendly option</Text>
                                </View>
                                <Text style={styles.seatCategoryPrice}>$45+</Text>
                            </View>
                        </View>
                    </View>
                );
            case 'rules':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.ruleItem}>
                            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                            <Text style={styles.ruleText}>Valid ID required for entry</Text>
                        </View>
                        <View style={styles.ruleItem}>
                            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                            <Text style={styles.ruleText}>Gates open 2 hours before event</Text>
                        </View>
                        <View style={styles.ruleItem}>
                            <Ionicons name="close-circle" size={20} color={COLORS.error} />
                            <Text style={styles.ruleText}>No outside food or beverages</Text>
                        </View>
                        <View style={styles.ruleItem}>
                            <Ionicons name="close-circle" size={20} color={COLORS.error} />
                            <Text style={styles.ruleText}>No professional cameras</Text>
                        </View>
                        <View style={styles.ruleItem}>
                            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                            <Text style={styles.ruleText}>Mobile tickets accepted</Text>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <LinearGradient
                        colors={GRADIENTS.primary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.heroGradient}
                    >
                        {/* Back Button */}
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                        </TouchableOpacity>

                        {/* Favorite Button */}
                        <TouchableOpacity style={styles.favoriteButton}>
                            <Ionicons name="heart-outline" size={24} color={COLORS.white} />
                        </TouchableOpacity>

                        {/* Event Icon */}
                        <View style={styles.eventIconContainer}>
                            <Ionicons name="american-football" size={60} color={COLORS.white} />
                        </View>

                        {/* Category Badge */}
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{event.category}</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Event Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.eventTitle}>{event.title}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <View style={styles.infoIconContainer}>
                                <Ionicons name="location" size={18} color={COLORS.primary} />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Venue</Text>
                                <Text style={styles.infoValue}>{event.venue}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.dateTimeRow}>
                        <View style={styles.dateTimeItem}>
                            <View style={[styles.infoIconContainer, { backgroundColor: COLORS.secondary + '20' }]}>
                                <Ionicons name="calendar" size={18} color={COLORS.secondary} />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Date</Text>
                                <Text style={styles.infoValue}>{formatDate(event.date)}</Text>
                            </View>
                        </View>
                        <View style={styles.dateTimeItem}>
                            <View style={[styles.infoIconContainer, { backgroundColor: COLORS.accent + '20' }]}>
                                <Ionicons name="time" size={18} color={COLORS.accent} />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Time</Text>
                                <Text style={styles.infoValue}>{formatTime(event.date)}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Price Range */}
                    <View style={styles.priceContainer}>
                        <View>
                            <Text style={styles.priceLabel}>Price Range</Text>
                            <Text style={styles.priceValue}>
                                ${event.minPrice} - ${event.maxPrice}
                            </Text>
                        </View>
                        <View style={styles.availabilityBadge}>
                            <View style={styles.availabilityDot} />
                            <Text style={styles.availabilityText}>
                                {event.availableSeats} seats available
                            </Text>
                        </View>
                    </View>

                    {/* Tabs */}
                    <View style={styles.tabsContainer}>
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab.id}
                                onPress={() => setActiveTab(tab.id)}
                                style={[
                                    styles.tab,
                                    activeTab === tab.id && styles.activeTab,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === tab.id && styles.activeTabText,
                                    ]}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {renderTabContent()}
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomPrice}>
                    <Text style={styles.bottomPriceLabel}>Starting from</Text>
                    <Text style={styles.bottomPriceValue}>${event.minPrice}</Text>
                </View>
                <Button
                    title="Select Seats"
                    onPress={() => navigation.navigate('SeatSelection', { eventId: event.id })}
                    variant="primary"
                    size="large"
                    style={styles.selectButton}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    loadingText: {
        fontSize: FONTS.sizes.lg,
        color: COLORS.textSecondary,
    },
    heroContainer: {
        height: 280,
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: SPACING.xl,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteButton: {
        position: 'absolute',
        top: 50,
        right: SPACING.xl,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryBadge: {
        position: 'absolute',
        bottom: SPACING.xl,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
    },
    categoryText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.semibold,
        textTransform: 'uppercase',
    },
    infoContainer: {
        padding: SPACING.xl,
        marginTop: -20,
        backgroundColor: COLORS.background,
        borderTopLeftRadius: BORDER_RADIUS.xl,
        borderTopRightRadius: BORDER_RADIUS.xl,
    },
    eventTitle: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.lg,
    },
    infoRow: {
        marginBottom: SPACING.md,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIconContainer: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    infoLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    infoValue: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textPrimary,
    },
    dateTimeRow: {
        flexDirection: 'row',
        marginBottom: SPACING.lg,
    },
    dateTimeItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundLight,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.xl,
    },
    priceLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    priceValue: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.primary,
    },
    availabilityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.success + '20',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
    },
    availabilityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.success,
        marginRight: SPACING.xs,
    },
    availabilityText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.success,
        fontWeight: FONTS.weights.medium,
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.lg,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xs,
    },
    tab: {
        flex: 1,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.md,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textSecondary,
    },
    activeTabText: {
        color: COLORS.white,
    },
    tabContent: {
        paddingBottom: 100,
    },
    description: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        lineHeight: 24,
        marginBottom: SPACING.lg,
    },
    highlightCard: {
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
    },
    highlightRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    highlightItem: {
        alignItems: 'center',
    },
    highlightValue: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
        marginTop: SPACING.sm,
    },
    highlightLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    seatingSectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.lg,
    },
    seatCategories: {
        gap: SPACING.md,
    },
    seatCategoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        borderLeftWidth: 4,
    },
    seatDot: {
        width: 16,
        height: 16,
        borderRadius: 4,
        marginRight: SPACING.md,
    },
    seatCategoryInfo: {
        flex: 1,
    },
    seatCategoryName: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
    },
    seatCategoryDesc: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    seatCategoryPrice: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    ruleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    ruleText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textPrimary,
        marginLeft: SPACING.md,
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
    bottomPrice: {
        marginRight: SPACING.xl,
    },
    bottomPriceLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    bottomPriceValue: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    selectButton: {
        flex: 1,
    },
});

export default EventDetailsScreen;
