/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Premium palette extensions
                'brand': {
                    'teal': '#0E6973',
                    'teal-dark': '#084B52',
                    'teal-light': '#148B99',
                    'gold': '#C8A86B',
                    'gold-dark': '#A68B56',
                    'gold-light': '#DBC392',
                    'dark': '#0F172A',
                    'sand': '#F4F1EA',
                    'stone': '#475569',
                    'accent': '#E2E8F0',
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-slide-up': 'fadeSlideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
                'fade-slide-down': 'fadeSlideDown 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
                'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeSlideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeSlideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))',
            }
        },
    },
    plugins: [],
}

