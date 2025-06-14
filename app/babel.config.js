module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			[
				'babel-preset-expo',
				{
					unstable_transformImportMeta: true,
				},
			],
		],
		plugins: [
			['inline-import', { extensions: ['.sql'] }],
			'react-native-reanimated/plugin',
		],
	};
};
