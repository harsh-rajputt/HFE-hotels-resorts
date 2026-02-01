/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-teal': '#0E6973',
                'brand-gold': '#C8A86B',
                'brand-dark': '#0F172A',
                'brand-sand': '#F4F1EA',
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
