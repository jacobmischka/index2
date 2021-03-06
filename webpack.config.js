/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
	const productionPlugins = env && env.production
		? [
			new webpack.DefinePlugin({
				NODE_ENV: 'production'
			}),
			new UglifyJSPlugin()
		]
		: [];

	return {
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
					exclude: /index\.html$/,
					use: [
						'babel-loader',
						'svelte-loader'
					]
				},
				{
					test: /\.svg$/,
					exclude: /node_modules/,
					use: 'svg-inline-loader'
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					include: /node_modules/,
					use: 'base64-inline-loader'
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
			...productionPlugins,
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

};
