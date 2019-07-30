const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.join(__dirname, '.'),
	entry: {
		app: ['babel-polyfill', './app/dev/App.jsx'],
	},
	output: {
		path: path.join(__dirname, './app/build'),
		filename: '[name].bundle.[hash].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './app/dev/dev.html',
		}),
	],
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: /node_modules/,
				include: path.join(__dirname, './app/dev'),
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								['es2015', { modules: false }],
								'react',
								'stage-2',
							],
							env: {
								production: {
									presets: ['minify'],
								},
							},
							plugins: [
								'syntax-dynamic-import',
							],
						},
					},
				],
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader',
			},
		],
	},
	resolve: {
		alias: {
			Components: path.join(__dirname, './app/dev/_components'),
			Split: path.join(__dirname, './app/dev/_split'),
			Actions: path.join(__dirname, './app/dev/actions'),
			Reducers: path.join(__dirname, './app/dev/reducers'),
			Store: path.join(__dirname, './app/dev/store'),
			Styles: path.join(__dirname, './app/dev/styles'),
			Templates: path.join(__dirname, './app/dev/templates'),
			Utilities: path.join(__dirname, './app/dev/utilities'),
		},
	},
};
