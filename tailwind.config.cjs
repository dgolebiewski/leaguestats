const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
			'sans-secondary': ['Montserrat', 'sans-serif']
		},
		colors: {
			'gray-900': '#1C1C1C',
			'gray-800': '#1F1F1F',
			'gray-700': '#333333',
			'gray-600': '#404040',
			'gray-500': '#616161',
			'gray-400': '#9A9A9A',
			'gray-300': '#B7B5B5',
			'gray-200': '#C2C2C2',
			'teal-500': '#007B74',
			'teal-400': '#02BCB1',
			'victory-blue': '#00A3FF',
			'defeat-red': '#E83636',
			'team-blue': '#0066FF',
			'team-red': '#FF0000',
			transparent: '#00000000',
			gold: '#FFC907',
			white: '#FFFFFF',
			black: '#000000'
		},
		extend: {
			fontSize: {
				'2xs': '0.625rem',
				'3xs': '0.5rem'
			}
		}
	},

	plugins: []
};

module.exports = config;
