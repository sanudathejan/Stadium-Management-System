import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS } from '../constants/fonts';

const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon,
    style,
    textStyle,
}) => {
    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    paddingVertical: SPACING.sm,
                    paddingHorizontal: SPACING.lg,
                };
            case 'large':
                return {
                    paddingVertical: SPACING.xl,
                    paddingHorizontal: SPACING.xxl,
                };
            default:
                return {
                    paddingVertical: SPACING.lg,
                    paddingHorizontal: SPACING.xl,
                };
        }
    };

    const getTextSize = () => {
        switch (size) {
            case 'small':
                return FONTS.sizes.sm;
            case 'large':
                return FONTS.sizes.xl;
            default:
                return FONTS.sizes.lg;
        }
    };

    const renderContent = () => (
        <>
            {loading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
                <>
                    {icon && icon}
                    <Text
                        style={[
                            styles.text,
                            { fontSize: getTextSize() },
                            variant === 'outline' && styles.outlineText,
                            variant === 'ghost' && styles.ghostText,
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                </>
            )}
        </>
    );

    if (variant === 'primary' || variant === 'gradient') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                style={[styles.buttonBase, getSizeStyles(), disabled && styles.disabled, style]}
            >
                <LinearGradient
                    colors={disabled ? [COLORS.surface, COLORS.surfaceLight] : GRADIENTS.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradient, getSizeStyles()]}
                >
                    {renderContent()}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={[
                styles.buttonBase,
                getSizeStyles(),
                variant === 'secondary' && styles.secondary,
                variant === 'outline' && styles.outline,
                variant === 'ghost' && styles.ghost,
                variant === 'danger' && styles.danger,
                disabled && styles.disabled,
                style,
            ]}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonBase: {
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: BORDER_RADIUS.lg,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    danger: {
        backgroundColor: COLORS.error,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: COLORS.white,
        fontWeight: FONTS.weights.semibold,
        marginLeft: SPACING.xs,
    },
    outlineText: {
        color: COLORS.primary,
    },
    ghostText: {
        color: COLORS.primary,
    },
});

export default Button;
