import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING, BORDER_RADIUS } from '../constants/fonts';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    error,
    icon,
    multiline = false,
    numberOfLines = 1,
    editable = true,
    style,
    inputStyle,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputContainerFocused,
                    error && styles.inputContainerError,
                    !editable && styles.inputContainerDisabled,
                ]}
            >
                {icon && (
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name={icon}
                            size={20}
                            color={isFocused ? COLORS.primary : COLORS.textSecondary}
                        />
                    </View>
                )}
                <TextInput
                    style={[
                        styles.input,
                        multiline && styles.multilineInput,
                        icon && styles.inputWithIcon,
                        inputStyle,
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textMuted}
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={editable}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={COLORS.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: FONTS.sizes.md,
        fontWeight: FONTS.weights.medium,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundLight,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    inputContainerFocused: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    inputContainerError: {
        borderColor: COLORS.error,
        borderWidth: 2,
    },
    inputContainerDisabled: {
        opacity: 0.6,
    },
    iconContainer: {
        paddingLeft: SPACING.lg,
    },
    input: {
        flex: 1,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.lg,
        fontSize: FONTS.sizes.lg,
        color: COLORS.textPrimary,
    },
    inputWithIcon: {
        paddingLeft: SPACING.md,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    eyeIcon: {
        paddingRight: SPACING.lg,
    },
    errorText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.error,
        marginTop: SPACING.xs,
    },
});

export default Input;
