import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$assets: resolve('./src/assets'),
					$components: resolve('./src/components')
				}
			},
			css: {
				postcss: {
					plugins: [
						//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
						tailwindcss(),
						//But others, like autoprefixer, need to run after,
						autoprefixer
					]
				}
			}
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
