import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/fonts';

const ProfileScreen = ({ navigation }) => {
    const { user, logout, isAdmin } = useAuth();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: logout },
            ]
        );
    };

    const menuItems = [
        {
            id: 'account',
            title: 'Account Settings',
            items: [
                {
                    icon: 'person-outline',
                    label: 'Edit Profile',
                    onPress: () => navigation.navigate('EditProfile'),
                },
                {
                    icon: 'lock-closed-outline',
                    label: 'Change Password',
                    onPress: () => Alert.alert('Info', 'Coming soon!'),
                },
                {
                    icon: 'card-outline',
                    label: 'Payment Methods',
                    onPress: () => Alert.alert('Info', 'Coming soon!'),
                },
            ],
        },
        {
            id: 'preferences',
            title: 'Preferences',
            items: [
                {
                    icon: 'notifications-outline',
                    label: 'Push Notifications',
                    toggle: true,
                    value: notifications,
                    onToggle: setNotifications,
                },
                {
                    icon: 'moon-outline',
                    label: 'Dark Mode',
                    toggle: true,
                    value: darkMode,
                    onToggle: setDarkMode,
                },
                {
                    icon: 'language-outline',
                    label: 'Language',
                    value: 'English',
                    onPress: () => Alert.alert('Info', 'Coming soon!'),
                },
            ],
        },
        {
            id: 'support',
            title: 'Support',
            items: [
                {
                    icon: 'help-circle-outline',
                    label: 'Help Center',
                    onPress: () => Alert.alert('Info', 'Coming soon!'),
                },
                {
                    icon: 'chatbubble-outline',
                    label: 'Contact Us',
                    onPress: () => Alert.alert('Info', 'Coming soon!'),
                },
                {
                    icon: 'document-text-outline',
                    label: 'Terms of Service',
                    onPress: () => Alert.alert('Info', 'Coming soon!'),
                },
                {
                    icon: 'shield-checkmark-outline',
                    label: 'Privacy Policy',
                    onPress: () => Alert.alert('Info', 'Coming soon!'),
                },
            ],
        },
    ];

    // Add admin panel option if user is admin
    if (isAdmin) {
        menuItems.unshift({
            id: 'admin',
            title: 'Administration',
            items: [
                {
                    icon: 'settings-outline',
                    label: 'Admin Dashboard',
                    onPress: () => navigation.navigate('AdminDashboard'),
                    badge: 'Admin',
                },
                {
                    icon: 'calendar-outline',
                    label: 'Manage Events',
                    onPress: () => navigation.navigate('ManageEvents'),
                },
                {
                    icon: 'analytics-outline',
                    label: 'Reports',
                    onPress: () => navigation.navigate('Reports'),
                },
            ],
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Ionicons name="settings-outline" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Profile Card */}
                <LinearGradient colors={GRADIENTS.primary} style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </Text>
                        </View>
                        {isAdmin && (
                            <View style={styles.adminBadge}>
                                <Ionicons name="shield-checkmark" size={16} color={COLORS.white} />
                            </View>
                        )}
                    </View>
                    <Text style={styles.userName}>{user?.name || 'User'}</Text>
                    <Text style={styles.userEmail}>{user?.email || 'user@email.com'}</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Events</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>48</Text>
                            <Text style={styles.statLabel}>Tickets</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>$2.4k</Text>
                            <Text style={styles.statLabel}>Spent</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Menu Sections */}
                {menuItems.map((section) => (
                    <View key={section.id} style={styles.menuSection}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.menuCard}>
                            {section.items.map((item, index) => (
                                <TouchableOpacity
                                    key={item.label}
                                    style={[
                                        styles.menuItem,
                                        index !== section.items.length - 1 && styles.menuItemBorder,
                                    ]}
                                    onPress={item.onPress}
                                    disabled={item.toggle}
                                >
                                    <View style={styles.menuItemLeft}>
                                        <View
                                            style={[
                                                styles.menuIconContainer,
                                                section.id === 'admin' && { backgroundColor: COLORS.accent + '20' },
                                            ]}
                                        >
                                            <Ionicons
                                                name={item.icon}
                                                size={20}
                                                color={section.id === 'admin' ? COLORS.accent : COLORS.primary}
                                            />
                                        </View>
                                        <Text style={styles.menuItemLabel}>{item.label}</Text>
                                        {item.badge && (
                                            <View style={styles.badgeContainer}>
                                                <Text style={styles.badgeText}>{item.badge}</Text>
                                            </View>
                                        )}
                                    </View>
                                    {item.toggle ? (
                                        <Switch
                                            value={item.value}
                                            onValueChange={item.onToggle}
                                            trackColor={{ false: COLORS.surface, true: COLORS.primary + '50' }}
                                            thumbColor={item.value ? COLORS.primary : COLORS.textMuted}
                                        />
                                    ) : (
                                        <View style={styles.menuItemRight}>
                                            {item.value && (
                                                <Text style={styles.menuItemValue}>{item.value}</Text>
                                            )}
                                            <Ionicons
                                                name="chevron-forward"
                                                size={20}
                                                color={COLORS.textMuted}
                                            />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text style={styles.versionText}>StadiumBook v1.0.0</Text>
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
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.huge,
        paddingBottom: SPACING.lg,
    },
    headerTitle: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
    },
    settingsButton: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    profileCard: {
        marginHorizontal: SPACING.xl,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        alignItems: 'center',
        marginBottom: SPACING.xl,
        ...SHADOWS.large,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: SPACING.md,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: FONTS.sizes.xxxl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
    },
    adminBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.primary,
    },
    userName: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
        marginBottom: SPACING.xs,
    },
    userEmail: {
        fontSize: FONTS.sizes.md,
        color: COLORS.white,
        opacity: 0.8,
        marginBottom: SPACING.lg,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: BORDER_RADIUS.lg,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
    },
    statItem: {
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
    },
    statValue: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.white,
    },
    statLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.white,
        opacity: 0.8,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    menuSection: {
        marginBottom: SPACING.lg,
        paddingHorizontal: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.textSecondary,
        marginBottom: SPACING.md,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    menuCard: {
        backgroundColor: COLORS.backgroundCard,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.lg,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    menuItemLabel: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textPrimary,
        fontWeight: FONTS.weights.medium,
    },
    badgeContainer: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        borderRadius: BORDER_RADIUS.sm,
        marginLeft: SPACING.sm,
    },
    badgeText: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.white,
        fontWeight: FONTS.weights.bold,
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemValue: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginRight: SPACING.sm,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: SPACING.xl,
        marginTop: SPACING.xl,
        padding: SPACING.lg,
        backgroundColor: COLORS.error + '10',
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.error + '30',
    },
    logoutText: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.semibold,
        color: COLORS.error,
        marginLeft: SPACING.sm,
    },
    versionText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginTop: SPACING.xl,
        marginBottom: SPACING.lg,
    },
});

export default ProfileScreen;
