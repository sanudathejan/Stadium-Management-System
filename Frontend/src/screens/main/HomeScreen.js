import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions,
    RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import EventCard from '../../components/EventCard';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/fonts';

const { width } = Dimensions.get('window');

// Mock data for events
const MOCK_EVENTS = [
    {
        id: '1',
        title: 'Premier League: Manchester United vs Liverpool',
        venue: 'Old Trafford Stadium',
        date: '2026-02-15T15:00:00',
        category: 'Football',
        minPrice: 45,
        maxPrice: 250,
        availableSeats: 1250,
        totalSeats: 75000,
        image: null,
        featured: true,
    },
    {
        id: '2',
        title: 'Championship Wrestling Night',
        venue: 'Madison Square Garden',
        date: '2026-02-20T19:30:00',
        category: 'Wrestling',
        minPrice: 35,
        maxPrice: 500,
        availableSeats: 890,
        totalSeats: 20000,
        image: null,
    },
    {
        id: '3',
        title: 'NBA Finals Game 7',
        venue: 'Staples Center',
        date: '2026-02-22T20:00:00',
        category: 'Basketball',
        minPrice: 150,
        maxPrice: 1500,
        availableSeats: 340,
        totalSeats: 19000,
        image: null,
        featured: true,
    },
    {
        id: '4',
        title: 'World Cup Qualifier: USA vs Mexico',
        venue: 'AT&T Stadium',
        date: '2026-02-25T18:00:00',
        category: 'Football',
        minPrice: 55,
        maxPrice: 300,
        availableSeats: 5600,
        totalSeats: 80000,
        image: null,
    },
    {
        id: '5',
        title: 'Super Bowl LX',
        venue: 'SoFi Stadium',
        date: '2026-03-01T18:30:00',
        category: 'American Football',
        minPrice: 500,
        maxPrice: 10000,
        availableSeats: 2100,
        totalSeats: 70000,
        image: null,
        featured: true,
    },
];

const CATEGORIES = [
    { id: 'all', name: 'All Events', icon: 'grid' },
    { id: 'football', name: 'Football', icon: 'football' },
    { id: 'basketball', name: 'Basketball', icon: 'basketball' },
    { id: 'wrestling', name: 'Wrestling', icon: 'body' },
    { id: 'concerts', name: 'Concerts', icon: 'musical-notes' },
];

const HomeScreen = ({ navigation }) => {
    const { user } = useAuth();
    const { selectEvent } = useBooking();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [refreshing, setRefreshing] = useState(false);
    const [events, setEvents] = useState(MOCK_EVENTS);
    const scrollY = useRef(new Animated.Value(0)).current;

    const featuredEvents = events.filter((e) => e.featured);
    const filteredEvents = events.filter((e) => {
        const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.venue.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            e.category.toLowerCase().includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    const handleEventPress = (event) => {
        selectEvent(event);
        navigation.navigate('EventDetails', { eventId: event.id });
    };

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary}
                    />
                }
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {/* Header */}
                <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.greeting}>
                            Hello, {user?.name?.split(' ')[0] || 'Guest'}! 👋
                        </Text>
                        <Text style={styles.headerTitle}>Find Your Perfect Seat</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <Ionicons name="notifications-outline" size={24} color={COLORS.textPrimary} />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationCount}>3</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Ionicons name="search" size={20} color={COLORS.textSecondary} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search events or venues..."
                            placeholderTextColor={COLORS.textMuted}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="options" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => setSelectedCategory(category.id)}
                            activeOpacity={0.7}
                        >
                            <LinearGradient
                                colors={
                                    selectedCategory === category.id
                                        ? GRADIENTS.primary
                                        : [COLORS.backgroundCard, COLORS.backgroundCard]
                                }
                                style={[
                                    styles.categoryButton,
                                    selectedCategory !== category.id && styles.categoryButtonInactive,
                                ]}
                            >
                                <Ionicons
                                    name={category.icon}
                                    size={18}
                                    color={
                                        selectedCategory === category.id
                                            ? COLORS.white
                                            : COLORS.textSecondary
                                    }
                                />
                                <Text
                                    style={[
                                        styles.categoryText,
                                        selectedCategory === category.id && styles.categoryTextActive,
                                    ]}
                                >
                                    {category.name}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Featured Events */}
                {featuredEvents.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>🔥 Featured Events</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={featuredEvents}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.featuredList}
                            renderItem={({ item }) => (
                                <View style={styles.featuredCard}>
                                    <EventCard
                                        event={item}
                                        variant="featured"
                                        onPress={() => handleEventPress(item)}
                                    />
                                </View>
                            )}
                        />
                    </View>
                )}

                {/* All Events */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>📅 Upcoming Events</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {filteredEvents.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Ionicons name="calendar-outline" size={60} color={COLORS.textMuted} />
                            <Text style={styles.emptyText}>No events found</Text>
                            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
                        </View>
                    ) : (
                        filteredEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onPress={() => handleEventPress(event)}
                            />
                        ))
                    )}
                </View>
            </Animated.ScrollView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.huge,
        paddingBottom: SPACING.lg,
    },
    headerLeft: {
        flex: 1,
    },
    greeting: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    headerTitle: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: COLORS.error,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationCount: {
        fontSize: 10,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.xl,
        marginBottom: SPACING.lg,
        gap: SPACING.md,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    searchInput: {
        flex: 1,
        fontSize: FONTS.sizes.md,
        color: COLORS.textPrimary,
        marginLeft: SPACING.sm,
    },
    filterButton: {
        width: 50,
        height: 50,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesContainer: {
        marginBottom: SPACING.lg,
    },
    categoriesContent: {
        paddingHorizontal: SPACING.xl,
        gap: SPACING.sm,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.full,
        marginRight: SPACING.sm,
    },
    categoryButtonInactive: {
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    categoryText: {
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textSecondary,
        marginLeft: SPACING.xs,
    },
    categoryTextActive: {
        color: COLORS.white,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    seeAll: {
        fontSize: FONTS.sizes.md,
        color: COLORS.primary,
        fontWeight: FONTS.weights.medium,
    },
    featuredList: {
        paddingHorizontal: SPACING.xl,
    },
    featuredCard: {
        width: width - 80,
        marginRight: SPACING.lg,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: SPACING.huge,
        marginHorizontal: SPACING.xl,
    },
    emptyText: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textPrimary,
        marginTop: SPACING.lg,
    },
    emptySubtext: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        marginTop: SPACING.sm,
    },
});

export default HomeScreen;
