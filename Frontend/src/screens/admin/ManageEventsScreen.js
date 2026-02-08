import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/fonts';

const MOCK_EVENTS = [
    {
        id: '1',
        title: 'Premier League: Manchester United vs Liverpool',
        date: '2026-02-15',
        venue: 'Old Trafford Stadium',
        status: 'active',
        sold: 65000,
        total: 75000,
        revenue: '$2.4M',
    },
    {
        id: '2',
        title: 'Championship Wrestling Night',
        date: '2026-02-20',
        venue: 'Madison Square Garden',
        status: 'active',
        sold: 18500,
        total: 20000,
        revenue: '$890K',
    },
    {
        id: '3',
        title: 'NBA Finals Game 7',
        date: '2026-02-22',
        venue: 'Staples Center',
        status: 'draft',
        sold: 0,
        total: 19000,
        revenue: '$0',
    },
    {
        id: '4',
        title: 'World Cup Qualifier',
        date: '2026-02-25',
        venue: 'AT&T Stadium',
        status: 'active',
        sold: 45000,
        total: 80000,
        revenue: '$1.8M',
    },
];

const ManageEventsScreen = ({ navigation }) => {
    const [events, setEvents] = useState(MOCK_EVENTS);
    const [filter, setFilter] = useState('all');

    const filteredEvents = filter === 'all'
        ? events
        : events.filter((e) => e.status === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return COLORS.success;
            case 'draft':
                return COLORS.warning;
            case 'cancelled':
                return COLORS.error;
            default:
                return COLORS.textMuted;
        }
    };

    const handleDeleteEvent = (eventId) => {
        Alert.alert(
            'Delete Event',
            'Are you sure you want to delete this event?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setEvents(events.filter((e) => e.id !== eventId));
                    },
                },
            ]
        );
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
                <Text style={styles.headerTitle}>Manage Events</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('CreateEvent')}
                >
                    <Ionicons name="add" size={24} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterContainer}
                contentContainerStyle={styles.filterContent}
            >
                {['all', 'active', 'draft', 'cancelled'].map((status) => (
                    <TouchableOpacity
                        key={status}
                        onPress={() => setFilter(status)}
                        style={[
                            styles.filterTab,
                            filter === status && styles.filterTabActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === status && styles.filterTextActive,
                            ]}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Stats Summary */}
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{events.length}</Text>
                    <Text style={styles.statLabel}>Total Events</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={[styles.statValue, { color: COLORS.success }]}>
                        {events.filter((e) => e.status === 'active').length}
                    </Text>
                    <Text style={styles.statLabel}>Active</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={[styles.statValue, { color: COLORS.warning }]}>
                        {events.filter((e) => e.status === 'draft').length}
                    </Text>
                    <Text style={styles.statLabel}>Drafts</Text>
                </View>
            </View>

            {/* Events List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {filteredEvents.map((event) => (
                    <View key={event.id} style={[styles.eventCard, SHADOWS.medium]}>
                        <View style={styles.eventHeader}>
                            <View style={styles.eventInfo}>
                                <View style={styles.eventTitleRow}>
                                    <Text style={styles.eventTitle} numberOfLines={1}>
                                        {event.title}
                                    </Text>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            { backgroundColor: getStatusColor(event.status) + '20' },
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.statusDot,
                                                { backgroundColor: getStatusColor(event.status) },
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                styles.statusText,
                                                { color: getStatusColor(event.status) },
                                            ]}
                                        >
                                            {event.status}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.eventMeta}>
                                    <View style={styles.metaItem}>
                                        <Ionicons name="calendar" size={14} color={COLORS.textSecondary} />
                                        <Text style={styles.metaText}>{event.date}</Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <Ionicons name="location" size={14} color={COLORS.textSecondary} />
                                        <Text style={styles.metaText}>{event.venue}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Progress Bar */}
                        <View style={styles.progressContainer}>
                            <View style={styles.progressHeader}>
                                <Text style={styles.progressLabel}>Tickets Sold</Text>
                                <Text style={styles.progressValue}>
                                    {event.sold.toLocaleString()}/{event.total.toLocaleString()}
                                </Text>
                            </View>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${(event.sold / event.total) * 100}%` },
                                    ]}
                                />
                            </View>
                        </View>

                        {/* Revenue */}
                        <View style={styles.revenueRow}>
                            <Text style={styles.revenueLabel}>Revenue</Text>
                            <Text style={styles.revenueValue}>{event.revenue}</Text>
                        </View>

                        {/* Actions */}
                        <View style={styles.actionsRow}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="eye" size={18} color={COLORS.primary} />
                                <Text style={styles.actionText}>View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="create" size={18} color={COLORS.accent} />
                                <Text style={[styles.actionText, { color: COLORS.accent }]}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="grid" size={18} color={COLORS.secondary} />
                                <Text style={[styles.actionText, { color: COLORS.secondary }]}>Seats</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleDeleteEvent(event.id)}
                            >
                                <Ionicons name="trash" size={18} color={COLORS.error} />
                                <Text style={[styles.actionText, { color: COLORS.error }]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateEvent')}
            >
                <LinearGradient colors={GRADIENTS.primary} style={styles.fabGradient}>
                    <Ionicons name="add" size={28} color={COLORS.white} />
                </LinearGradient>
            </TouchableOpacity>
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
    addButton: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        maxHeight: 50,
        marginBottom: SPACING.md,
    },
    filterContent: {
        paddingHorizontal: SPACING.lg,
    },
    filterTab: {
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.backgroundLight,
        marginRight: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    filterTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterText: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textSecondary,
    },
    filterTextActive: {
        color: COLORS.white,
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    statValue: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    statLabel: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: 100,
    },
    eventCard: {
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    eventHeader: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    eventTitle: {
        flex: 1,
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
        marginRight: SPACING.md,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: SPACING.xs,
    },
    statusText: {
        fontSize: FONTS.sizes.xs,
        fontWeight: FONTS.weights.semibold,
        textTransform: 'capitalize',
    },
    eventMeta: {
        flexDirection: 'row',
        gap: SPACING.lg,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginLeft: SPACING.xs,
    },
    progressContainer: {
        marginBottom: SPACING.md,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
    },
    progressLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    progressValue: {
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textPrimary,
    },
    progressBar: {
        height: 6,
        backgroundColor: COLORS.surface,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },
    revenueRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        marginBottom: SPACING.md,
    },
    revenueLabel: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
    },
    revenueValue: {
        fontSize: FONTS.sizes.lg,
        fontWeight: FONTS.weights.bold,
        color: COLORS.secondary,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.sm,
    },
    actionText: {
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.medium,
        color: COLORS.primary,
        marginLeft: SPACING.xs,
    },
    fab: {
        position: 'absolute',
        bottom: 100,
        right: SPACING.xl,
        ...SHADOWS.large,
    },
    fabGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ManageEventsScreen;
