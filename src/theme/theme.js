// ─── Vaya Dark Theme ─────────────────────────────────────────
// Deep Charcoal/Black with Electric Indigo accents
// ──────────────────────────────────────────────────────────────

export const theme = {
    // Backgrounds
    bg: {
        primary: '#111827',        // Deep Slate (Main background)
        secondary: '#1F2937',      // Slightly lighter slate (Cards/Header)
        card: '#1F2937',           // Card background
        elevated: '#374151',       // Elevated surfaces / modals
        input: '#374151',          // Input fields
    },

    // Brand Colors
    brand: {
        primary: '#06B6D4',        // Bright Cyan
        primaryLight: '#22D3EE',   // Lighter cyan (hover states)
        primaryDark: '#0891B2',    // Darker cyan (pressed states)
        primaryMuted: 'rgba(6, 182, 212, 0.15)', // Cyan tint for badges
        gold: '#F59E0B',           // Premium gold
        goldMuted: 'rgba(245, 158, 11, 0.15)',
    },

    // Text
    text: {
        primary: '#F9FAFB',        // Bright white
        secondary: '#D1D5DB',      // Light gray
        tertiary: '#9CA3AF',       // Muted gray
        inverse: '#111827',        // Dark text on light backgrounds
        accent: '#67E8F9',         // Cyan-tinted text
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
        color: '#06B6D4',
        soft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
        },
        glow: {
            shadowColor: '#06B6D4',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 10,
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
