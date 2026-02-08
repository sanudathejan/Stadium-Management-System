import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING } from '../constants/fonts';

const Header = ({
    title,
    subtitle,
    showBack = false,
    onBack,
    rightIcon,
    onRightPress,
    transparent = false,
}) => {
    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                transparent && styles.transparent,
            ]}
        >
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    {showBack && (
                        <TouchableOpacity onPress={onBack} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={styles.subtitle} numberOfLines={1}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                <View style={styles.rightContainer}>
                    {rightIcon && (
                        <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
                            <Ionicons name={rightIcon} size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.background,
    },
    transparent: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        minHeight: 56,
    },
    leftContainer: {
        width: 40,
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    rightContainer: {
        width: 40,
        alignItems: 'flex-end',
    },
    backButton: {
        padding: SPACING.xs,
    },
    rightButton: {
        padding: SPACING.xs,
    },
    title: {
        fontSize: FONTS.sizes.xl,
        fontWeight: FONTS.weights.bold,
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
});

export default Header;
