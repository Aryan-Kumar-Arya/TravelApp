import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Pressable,
    Platform,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
    FadeIn,
    SlideInDown,
} from 'react-native-reanimated';
import { theme as T } from '../theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Simple Custom Calendar ────────────────────────────────────
// Instead of a heavy dependency, we build a lightweight range picker
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const toDateStr = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const MiniCalendar = ({ startDate, endDate, onSelectDate }) => {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const isInRange = (dateStr) => {
        if (!startDate || !endDate) return false;
        return dateStr >= startDate && dateStr <= endDate;
    };

    const isStart = (dateStr) => dateStr === startDate;
    const isEnd = (dateStr) => dateStr === endDate;

    const cells = [];
    // Blank cells for offset
    for (let i = 0; i < firstDay; i++) {
        cells.push(<View key={`blank-${i}`} style={calStyles.dayCell} />);
    }
    // Days
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = toDateStr(viewYear, viewMonth, d);
        const inRange = isInRange(dateStr);
        const start = isStart(dateStr);
        const end = isEnd(dateStr);
        const selected = start || end;

        cells.push(
            <TouchableOpacity
                key={dateStr}
                style={[
                    calStyles.dayCell,
                    inRange && calStyles.dayCellInRange,
                    start && calStyles.dayCellStart,
                    end && calStyles.dayCellEnd,
                ]}
                onPress={() => onSelectDate(dateStr)}
                activeOpacity={0.7}
            >
                <Text
                    style={[
                        calStyles.dayText,
                        inRange && calStyles.dayTextInRange,
                        selected && calStyles.dayTextSelected,
                    ]}
                >
                    {d}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={calStyles.container}>
            {/* Month nav */}
            <View style={calStyles.monthNav}>
                <TouchableOpacity onPress={prevMonth} style={calStyles.navBtn}>
                    <Text style={calStyles.navBtnText}>‹</Text>
                </TouchableOpacity>
                <Text style={calStyles.monthTitle}>
                    {MONTH_NAMES[viewMonth]} {viewYear}
                </Text>
                <TouchableOpacity onPress={nextMonth} style={calStyles.navBtn}>
                    <Text style={calStyles.navBtnText}>›</Text>
                </TouchableOpacity>
            </View>

            {/* Day headers */}
            <View style={calStyles.dayHeaders}>
                {DAY_NAMES.map((name) => (
                    <View key={name} style={calStyles.dayCell}>
                        <Text style={calStyles.dayHeaderText}>{name}</Text>
                    </View>
                ))}
            </View>

            {/* Grid */}
            <View style={calStyles.grid}>{cells}</View>

            {/* Legend */}
            {startDate && (
                <View style={calStyles.legend}>
                    <Text style={calStyles.legendText}>
                        {startDate}
                        {endDate ? ` → ${endDate}` : ' → Pick end date'}
                    </Text>
                </View>
            )}
        </View>
    );
};

// ─── Main Modal Component ──────────────────────────────────────
const AddTripModal = ({ visible, onClose, onSave }) => {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectingEnd, setSelectingEnd] = useState(false);

    const handleDateSelect = (dateStr) => {
        if (!selectingEnd) {
            setStartDate(dateStr);
            setEndDate(null);
            setSelectingEnd(true);
        } else {
            if (dateStr < startDate) {
                // User picked an earlier date — swap
                setStartDate(dateStr);
                setEndDate(startDate);
            } else {
                setEndDate(dateStr);
            }
            setSelectingEnd(false);
        }
    };

    const handleSave = () => {
        if (!destination.trim() || !startDate || !endDate) return;

        const newTrip = {
            id: `trip-${Date.now()}`,
            user_id: 'current-user',
            destination_city: destination.trim(),
            start_date: startDate,
            end_date: endDate,
        };

        onSave(newTrip);
        // Reset
        setDestination('');
        setStartDate(null);
        setEndDate(null);
        setSelectingEnd(false);
    };

    const isValid = destination.trim().length > 0 && startDate && endDate;

    if (!visible) return null;

    return (
        <Animated.View
            entering={FadeIn.duration(200)}
            style={styles.overlay}
        >
            <Pressable style={styles.backdrop} onPress={onClose} />
            <Animated.View
                entering={SlideInDown.springify().damping(18).stiffness(140)}
                style={styles.modal}
            >
                {/* Handle */}
                <View style={styles.handle} />

                {/* Header */}
                <Text style={styles.headerTitle}>Where are you heading?</Text>
                <Text style={styles.headerSubtitle}>
                    Plan your next adventure ✈️
                </Text>

                {/* Destination Input */}
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputIcon}>📍</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter city (e.g. Tokyo, Paris)"
                        placeholderTextColor={T.text.tertiary}
                        value={destination}
                        onChangeText={setDestination}
                        autoCorrect={false}
                    />
                </View>

                {/* Date Picker */}
                <Text style={styles.datePickerLabel}>
                    {!selectingEnd ? 'Select start date' : 'Now select end date'}
                </Text>
                <MiniCalendar
                    startDate={startDate}
                    endDate={endDate}
                    onSelectDate={handleDateSelect}
                />

                {/* Save Button */}
                <TouchableOpacity
                    style={[styles.saveBtn, !isValid && styles.saveBtnDisabled]}
                    onPress={handleSave}
                    disabled={!isValid}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveBtnText}>
                        {isValid ? '🚀 Set Trip & Discover' : 'Fill in all details'}
                    </Text>
                </TouchableOpacity>

                {/* Cancel */}
                <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};

// ─── Calendar Styles ────────────────────────────────────────────
const calStyles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    monthNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    navBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: T.bg.input,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBtnText: {
        fontSize: 22,
        color: T.text.primary,
        fontWeight: '600',
    },
    monthTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: T.text.primary,
    },
    dayHeaders: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    dayCell: {
        width: `${100 / 7}%`,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: T.text.tertiary,
    },
    dayText: {
        fontSize: 14,
        fontWeight: '500',
        color: T.text.secondary,
    },
    dayTextInRange: {
        color: T.brand.primaryLight,
    },
    dayTextSelected: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    dayCellInRange: {
        backgroundColor: T.brand.primaryMuted,
    },
    dayCellStart: {
        backgroundColor: T.brand.primary,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    dayCellEnd: {
        backgroundColor: T.brand.primary,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    legend: {
        marginTop: 10,
        alignItems: 'center',
    },
    legendText: {
        fontSize: 13,
        fontWeight: '600',
        color: T.brand.primaryLight,
    },
});

// ─── Modal Styles ───────────────────────────────────────────────
const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        zIndex: 999,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
    modal: {
        backgroundColor: T.bg.elevated,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        maxHeight: '90%',
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: T.border.medium,
        alignSelf: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: T.text.primary,
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 15,
        color: T.text.secondary,
        marginBottom: 24,
    },

    // Input
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: T.bg.input,
        borderRadius: T.radius.md,
        borderWidth: 1,
        borderColor: T.border.subtle,
        paddingHorizontal: 14,
        marginBottom: 20,
    },
    inputIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        fontWeight: '500',
        color: T.text.primary,
    },

    // Date picker label
    datePickerLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: T.text.accent,
        marginBottom: 10,
    },

    // Save Button
    saveBtn: {
        backgroundColor: T.brand.primary,
        paddingVertical: 18,
        borderRadius: T.radius.md,
        alignItems: 'center',
        ...T.shadow.glow,
    },
    saveBtnDisabled: {
        backgroundColor: T.bg.input,
        shadowOpacity: 0,
    },
    saveBtnText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    cancelBtn: {
        alignItems: 'center',
        paddingVertical: 14,
    },
    cancelText: {
        fontSize: 15,
        fontWeight: '600',
        color: T.text.tertiary,
    },
});

export default AddTripModal;
