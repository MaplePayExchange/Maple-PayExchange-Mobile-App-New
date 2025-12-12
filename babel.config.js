module.exports = {
	presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['.'],
				alias: {
					'@src': './src',
					'@zustand': './zustand',
					'@config': './config',
					'@lib': './lib',
					'@interfaces': './interfaces',
					'@constants': './constants',
					'@types': './types',
					'@services': './services',
					'@data': './data',
					'@assets': './assets',
					'@hooks': './hooks',
				},
			},
		],
	],
};
