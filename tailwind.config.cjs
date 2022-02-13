const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
			'sans-secondary': ['Montserrat', 'sans-serif']
		},
		extend: {
			colors: {
				gray: {
					950: '#121212',
					900: '#1C1C1C',
					800: '#1F1F1F',
					700: '#333333',
					600: '#404040',
					500: '#616161',
					400: '#9A9A9A',
					300: '#B7B5B5',
					200: '#C2C2C2'
				},
				teal: {
					500: '#007B74',
					400: '#02BCB1'
				},
				'victory-blue': '#00A3FF',
				'defeat-red': '#E83636',
				'team-blue': '#0066FF',
				'team-red': '#FF0000',
				gold: '#FFC907'
			},
			fontSize: {
				'2xs': '0.625rem',
				'3xs': '0.5rem'
			}
		}
	},

	plugins: []
};

module.exports = config;
