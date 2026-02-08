import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBooking } from '../../context/BookingContext';
import BookingCard from '../../components/BookingCard';
import { COLORS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS } from '../../constants/fonts';

const TABS = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'cancelled', label: 'Cancelled' },
];

const BookingsScreen = ({ navigation }) => {
    const { bookingHistory } = useBooking();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [refreshing, setRefreshing] = useState(false);

    const filterBookings = () => {
        const now = new Date();
        return bookingHistory.filter((booking) => {
            const eventDate = new Date(booking.event?.date);
            if (activeTab === 'upcoming') {
                return booking.status === 'confirmed' && eventDate >= now;
            } else if (activeTab === 'past') {
                return booking.status === 'confirmed' && eventDate < now;
            } else {
                return booking.status === 'cancelled';
            }
        });
    };

    const filteredBookings = filterBookings();

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    const handleBookingPress = (booking) => {
        navigation.navigate('BookingDetails', { bookingId: booking.id });
    };

    const EmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                <Ionicons
                    name={
                        activeTab === 'upcoming'
                            ? 'calendar-outline'
                            : activeTab === 'past'
                                ? 'time-outline'
                                : 'close-circle-outline'
                    }
                    size={60}
                    color={COLORS.textMuted}
                />
            </View>
            <Text style={styles.emptyTitle}>
                {activeTab === 'upcoming'
                    ? 'No Upcoming Bookings'
                    : activeTab === 'past'
                        ? 'No Past Bookings'
                        : 'No Cancelled Bookings'}
            </Text>
            <Text style={styles.emptySubtitle}>
                {activeTab === 'upcoming'
                    ? "You haven't booked any events yet. Browse events to find your next experience!"
                    : activeTab === 'past'
                        ? "Your attended events will appear here"
                        : "Cancelled bookings will appear here"}
            </Text>
            {activeTab === 'upcoming' && (
                <TouchableOpacity
                    style={styles.browseButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.browseButtonText}>Browse Events</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bookings</Text>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        onPress={() => setActiveTab(tab.id)}
                        style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab.id && styles.activeTabText,
                            ]}
                        >
                            {tab.label}
                        </Text>
                        {activeTab === tab.id && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary}
                    />
                }
            >
                {filteredBookings.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <Text style={styles.resultCount}>
                            {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}
                        </Text>
                        {filteredBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onPress={() => handleBookingPress(booking)}
                            />
                        ))}
                    </>
                )}
            </ScrollView>
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
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.huge,
        paddingBottom: SPACING.lg,
    },
    headerTitle: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    searchButton: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.xl,
        marginBottom: SPACING.lg,
    },
    tab: {
        marginRight: SPACING.xxl,
        paddingBottom: SPACING.md,
        position: 'relative',
    },
    activeTab: {},
    tabText: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textSecondary,
    },
    activeTabText: {
        color: COLORS.textPrimary,
        fontWeight: FONTS.weights.semibold,
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: COLORS.primary,
        borderRadius: 2,
    },
    scrollContent: {
        paddingHorizontal: SPACING.xl,
        paddingBottom: 100,
    },
    resultCount: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.lg,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: SPACING.huge * 2,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    emptyTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
    },
    emptySubtitle: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        textAlign: 'center',
        paddingHorizontal: SPACING.xl,
        lineHeight: 22,
        marginBottom: SPACING.xl,
    },
    browseButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xxl,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
    },
    browseButtonText: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.white,
    },
});

export default BookingsScreen;
