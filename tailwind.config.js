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
				'manrope-extrabold': ['Manrope_800ExtraBold'],
				'manrope-bold-ios': ['Manrope Bold'],
				'manrope-medium-ios': ['Manrope Medium'],
				'manrope-regular-ios': ['Manrope Regular'],
				'manrope-semibold-ios': ['Manrope SemiBold'],
				'manrope-extrabold-ios': ['Manrope ExtraBold'],
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
