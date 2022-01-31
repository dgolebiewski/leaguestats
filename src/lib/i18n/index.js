import i18n from 'sveltekit-i18n';

export const config = {
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./common/en.json')).default
		},
		{
			locale: 'en',
			key: 'home',
			loader: async () => (await import('./home/en.json')).default,
			routes: ['/']
		},
		{
			locale: 'en',
			key: 'summoner',
			loader: async () => (await import('./summoner/en.json')).default,
			routes: [/(.{2,4})\/(.+)/i]
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
