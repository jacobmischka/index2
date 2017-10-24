/* eslint-env node */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.html$/,
				use: [
					'babel-loader',
					'svelte-loader'
				]
			},
			{
				test: /\.svg$/,
				use: 'svg-inline-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [
									require('postcss-cssnext')
								]
							}
						}
					]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
		new HtmlWebpackPlugin({
			filename: 'index.php',
			title: 'index2',
			template: './src/index.php',
			xhtml: true,
			inlineSource: '.(js|css)$'
		}),
		new HtmlWebpackInlineSourcePlugin()
	],
	devtool: 'source-map'
};
