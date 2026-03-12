// ─── Vaya Dark Theme ─────────────────────────────────────────
// Deep Charcoal/Black with Electric Indigo accents
// ──────────────────────────────────────────────────────────────

export const theme = {
    // Backgrounds
    bg: {
        primary: '#0F0F14',        // Deep charcoal-black
        secondary: '#1A1A24',      // Slightly lighter surface
        card: '#1E1E2A',           // Card background
        elevated: '#252536',       // Elevated surfaces / modals
        input: '#2A2A3C',          // Input fields
    },

    // Brand Colors
    brand: {
        primary: '#6366F1',        // Electric Indigo
        primaryLight: '#818CF8',   // Lighter indigo (hover states)
        primaryDark: '#4F46E5',    // Darker indigo (pressed states)
        primaryMuted: 'rgba(99, 102, 241, 0.15)', // Indigo tint for badges
        gold: '#F59E0B',           // Premium gold
        goldMuted: 'rgba(245, 158, 11, 0.15)',
    },

    // Text
    text: {
        primary: '#F8FAFC',        // Bright white
        secondary: '#94A3B8',      // Muted slate
        tertiary: '#64748B',       // Even more muted
        inverse: '#0F172A',        // Dark text on light backgrounds
        accent: '#A5B4FC',         // Indigo-tinted text
    },

    // Status colors
    status: {
        success: '#22C55E',
        successMuted: 'rgba(34, 197, 94, 0.15)',
        error: '#EF4444',
        errorMuted: 'rgba(239, 68, 68, 0.15)',
        warning: '#F59E0B',
    },

    // Borders
    border: {
        subtle: 'rgba(255, 255, 255, 0.06)',
        medium: 'rgba(255, 255, 255, 0.1)',
        accent: 'rgba(99, 102, 241, 0.3)',
    },

    // Shadows (for elevation on dark mode, use subtle glows)
    shadow: {
        color: '#6366F1',
        soft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
        },
        glow: {
            shadowColor: '#6366F1',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 8,
        },
    },

    // Radii
    radius: {
        sm: 8,
        md: 14,
        lg: 20,
        xl: 28,
        full: 999,
    },

    // Spacing
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
};

export default theme;
