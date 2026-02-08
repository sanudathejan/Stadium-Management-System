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
import { COLORS, GRADIENTS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/fonts';

const { width } = Dimensions.get('window');

const AdminDashboardScreen = ({ navigation }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    const stats = [
        {
            id: '1',
            title: 'Total Bookings',
            value: '2,847',
            change: '+12.5%',
            isPositive: true,
            icon: 'ticket',
            color: COLORS.primary,
        },
        {
            id: '2',
            title: 'Revenue',
            value: '$158,290',
            change: '+8.2%',
            isPositive: true,
            icon: 'cash',
            color: COLORS.secondary,
        },
        {
            id: '3',
            title: 'Active Events',
            value: '24',
            change: '+3',
            isPositive: true,
            icon: 'calendar',
            color: COLORS.accent,
        },
        {
            id: '4',
            title: 'Cancellations',
            value: '156',
            change: '-23%',
            isPositive: true,
            icon: 'close-circle',
            color: COLORS.error,
        },
    ];

    const quickActions = [
        {
            icon: 'add-circle',
            label: 'New Event',
            color: COLORS.primary,
            onPress: () => navigation.navigate('CreateEvent'),
        },
        {
            icon: 'grid',
            label: 'Manage Seats',
            color: COLORS.secondary,
            onPress: () => navigation.navigate('ManageSeats'),
        },
        {
            icon: 'fast-food',
            label: 'Food Menu',
            color: COLORS.accent,
            onPress: () => navigation.navigate('ManageFood'),
        },
        {
            icon: 'analytics',
            label: 'Reports',
            color: COLORS.info,
            onPress: () => navigation.navigate('Reports'),
        },
    ];

    const recentBookings = [
        { id: '1', user: 'John Doe', event: 'Premier League Match', amount: '$245', time: '2 min ago' },
        { id: '2', user: 'Jane Smith', event: 'Wrestling Night', amount: '$180', time: '15 min ago' },
        { id: '3', user: 'Mike Johnson', event: 'NBA Finals', amount: '$450', time: '32 min ago' },
        { id: '4', user: 'Sarah Wilson', event: 'Super Bowl LX', amount: '$890', time: '1 hour ago' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Admin Dashboard</Text>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications" size={24} color={COLORS.textPrimary} />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                </View>

                {/* Welcome Banner */}
                <LinearGradient colors={GRADIENTS.primary} style={styles.welcomeBanner}>
                    <View style={styles.welcomeContent}>
                        <Text style={styles.welcomeText}>Welcome back, Admin!</Text>
                        <Text style={styles.welcomeSubtext}>
                            Here's what's happening with your stadium today.
                        </Text>
                    </View>
                    <View style={styles.welcomeIcon}>
                        <Ionicons name="bar-chart" size={50} color="rgba(255,255,255,0.5)" />
                    </View>
                </LinearGradient>

                {/* Period Selector */}
                <View style={styles.periodContainer}>
                    {['today', 'week', 'month', 'year'].map((period) => (
                        <TouchableOpacity
                            key={period}
                            onPress={() => setSelectedPeriod(period)}
                            style={[
                                styles.periodButton,
                                selectedPeriod === period && styles.periodButtonActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.periodText,
                                    selectedPeriod === period && styles.periodTextActive,
                                ]}
                            >
                                {period.charAt(0).toUpperCase() + period.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((stat) => (
                        <View key={stat.id} style={[styles.statCard, SHADOWS.small]}>
                            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                                <Ionicons name={stat.icon} size={22} color={stat.color} />
                            </View>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statTitle}>{stat.title}</Text>
                            <View style={styles.statChange}>
                                <Ionicons
                                    name={stat.isPositive ? 'trending-up' : 'trending-down'}
                                    size={14}
                                    color={stat.isPositive ? COLORS.success : COLORS.error}
                                />
                                <Text
                                    style={[
                                        styles.statChangeText,
                                        { color: stat.isPositive ? COLORS.success : COLORS.error },
                                    ]}
                                >
                                    {stat.change}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsGrid}>
                        {quickActions.map((action, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.actionCard}
                                onPress={action.onPress}
                            >
                                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                                    <Ionicons name={action.icon} size={28} color={action.color} />
                                </View>
                                <Text style={styles.actionLabel}>{action.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Recent Bookings */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Bookings</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bookingsList}>
                        {recentBookings.map((booking) => (
                            <View key={booking.id} style={styles.bookingItem}>
                                <View style={styles.bookingAvatar}>
                                    <Text style={styles.bookingAvatarText}>
                                        {booking.user.charAt(0)}
                                    </Text>
                                </View>
                                <View style={styles.bookingInfo}>
                                    <Text style={styles.bookingUser}>{booking.user}</Text>
                                    <Text style={styles.bookingEvent}>{booking.event}</Text>
                                </View>
                                <View style={styles.bookingRight}>
                                    <Text style={styles.bookingAmount}>{booking.amount}</Text>
                                    <Text style={styles.bookingTime}>{booking.time}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Chart Placeholder */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Revenue Overview</Text>
                    <View style={styles.chartPlaceholder}>
                        <Ionicons name="bar-chart" size={60} color={COLORS.textMuted} />
                        <Text style={styles.chartText}>Revenue Chart</Text>
                        <Text style={styles.chartSubtext}>
                            Interactive chart coming soon
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingBottom: 100,
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
    notificationButton: {
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.error,
    },
    welcomeBanner: {
        marginHorizontal: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        ...SHADOWS.large,
    },
    welcomeContent: {
        flex: 1,
    },
    welcomeText: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
        marginBottom: SPACING.xs,
    },
    welcomeSubtext: {
        fontSize: FONTS.sizes.md,
        color: COLORS.white,
        opacity: 0.9,
    },
    welcomeIcon: {
        marginLeft: SPACING.lg,
    },
    periodContainer: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    periodButton: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        marginRight: SPACING.sm,
        backgroundColor: COLORS.backgroundLight,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    periodButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    periodText: {
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textSecondary,
    },
    periodTextActive: {
        color: COLORS.white,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    },
    statCard: {
        width: (width - SPACING.lg * 2 - SPACING.md) / 2,
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    statIcon: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    statValue: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    statTitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    statChange: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.sm,
    },
    statChangeText: {
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.medium,
        marginLeft: SPACING.xs,
    },
    section: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.lg,
    },
    seeAll: {
        fontSize: FONTS.sizes.md,
        color: COLORS.primary,
        fontWeight: FONTS.weights.medium,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.md,
    },
    actionCard: {
        width: (width - SPACING.lg * 2 - SPACING.md * 3) / 4,
        alignItems: 'center',
    },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: BORDER_RADIUS.lg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    actionLabel: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
    bookingsList: {
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    bookingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    bookingAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    bookingAvatarText: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.primary,
    },
    bookingInfo: {
        flex: 1,
    },
    bookingUser: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textPrimary,
    },
    bookingEvent: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    bookingRight: {
        alignItems: 'flex-end',
    },
    bookingAmount: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.bold,
        color: COLORS.secondary,
    },
    bookingTime: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textMuted,
        marginTop: 2,
    },
    chartPlaceholder: {
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.huge,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chartText: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textSecondary,
        marginTop: SPACING.md,
    },
    chartSubtext: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        marginTop: SPACING.xs,
    },
});

export default AdminDashboardScreen;
