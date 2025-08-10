/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			/**
			|--------------------------------------------------
			| Font family s
			|--------------------------------------------------
			*/
			fontFamily: {
				'manrope-bold': ['Manrope_700Bold'],
				'manrope-medium': ['Manrope_500Medium'],
				'manrope-regular': ['Manrope_400Regular'],
				'manrope-semibold': ['Manrope_600SemiBold'],
			},

			/**
			|--------------------------------------------------
			| Colors
			|--------------------------------------------------
			*/
			colors: {
				pinkish: '#EE0979',
				orangish: '#FF6A00',
			},
		},
	},
	plugins: [],
};
