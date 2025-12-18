/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'retro-beige': '#FEFAE0',
                'retro-dark': '#283618',
                'retro-green': '#606C38',
                'retro-cream': '#FAEDCD',
                'retro-brown': '#D4A373',
                'retro-dark-800': '#1a1a1a',
                'retro-dark-700': '#2d2d2d',
                'retro-dark-600': '#4a4a4a',
                'retro-brown-700': '#5c3d2e',
            },
            fontFamily: {
                'pixel': ['"Zpix"', '"VT323"', 'monospace'],
            }
        },
    },
    plugins: [],
}
