'use strict';
/* jshint esversion: 6 */

const progressBar = require('progress');
const webpack = require('webpack');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const chalk = require('chalk');
const pkg = require('./package.json');
const Guage = require('gauge-webpack-plugin');

const BASE_PATH = path.join(path.resolve(__dirname), 'disc_golf_score_card');
const APP_PATH = path.join(BASE_PATH, 'src');
const DIST_PATH = path.join(BASE_PATH, 'dist/');

let clean_dirs = [DIST_PATH];

let clean_options = {
				root: BASE_PATH,
				exclude: [],
				verbose: false,
				dry: false
}
let htmlPluginOptions = {
				template: require('html-webpack-template'),
				appMountId: 'app',
				mobile: true
};
if (process.env['NODE_ENV'] === 'dev') {
				htmlPluginOptions['baseHref'] = 'http://localhost:8090/';
				htmlPluginOptions['devServer'] = 'http://localhost:3000';
}

let getConfig = (clean_options) => {
				return {
								entry: {
												main: [
																path.join(APP_PATH, 'index'),
																// 'react-hot-loader/patch', 'webpack-dev-server/client?http://0.0.0.0:3000', //
																// WebpackDevServer host and port 'webpack/hot/only-dev-server', // "only"
																// prevents reload on syntax errors 	vendor:
																// Object.keys(pkg.dependencies),//Object.keys(pkg.devDependencies).concat()
												],
												vendor: [
																'react',
																'redux',
																'react-redux',
																'react-router-redux',
																'axios',
																'redux-thunk',
																'react-bootstrap',
																'react-router-dom',
																'react-dom',
																'redux-storage-engine-localstorage',
																// 	'redux-storage', 'redux-promise', 'redux-logger', 'react-bootstrap-table',
																// 'isomorphic-fetch', 	'history', 'classnames',
																// 'bootstrap/dist/css/bootstrap.css','font-awesome/css/font-awesome.css','jquery
																// '
												]
								},
								// target:'node-webkit', node: { 	fs: 'empty', 	net:'mock', 	tls:'mock',
								// 	module:'empty', 	'../../package':'empty',
								output: {
												filename: '[name]-[hash].bundle.js',
												path: DIST_PATH,
												chunkFilename: '[name]-chunk-[chunkhash].bundle.js',
												publicPath: '/dist/'

								},
								module: {
												rules: [
																{
																				test: /\.jsx?$/,
																				exclude: /node_modules/,
																				use: {
																								loader: 'babel-loader',
																								// options:{ presets:['react', 'es2015', 'stage-0'], plugins:[
																								// 'transform-es2015-destructuring','syntax-object-rest-spread',
																								// 'transform-class-properties'], }
																				}
																}, {
																				test: /\.css$/,
																				use: ExtractTextPlugin.extract({
																								use: [
																												{
																																loader: 'css-loader',
																																options: {
																																				importLoaders: 1
																																}
																												}
																								]
																				}) //[
																				// {loader: ExtractTextPlugin.extract({ use:'css-loader!style-loader' })},
																				// {loader: 'style-loader'}, {loader: 'css-loader'} ]
																}, {
																				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
																				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
																}, {
																				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
																				loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
																}, {
																				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
																				loader: 'file-loader'
																}, {
																				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
																				loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
																}
												]
								},
								resolve: {
												extensions: [' ', '.js', '.jsx', '.css']
								},
								plugins: [
												new HtmlWebpackPlugin(htmlPluginOptions),
												new CleanWebpackPlugin(clean_dirs, clean_options),
												//new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
												new webpack.NamedModulesPlugin(),
												new webpack
																.optimize
																.CommonsChunkPlugin({
																				name: 'vendor',
																				filename: 'vendor-[hash].bundle.js',
																				minChunks(module, count) {
																								var context = module.context;
																								return context && context.indexOf('node_modules') >= 0;
																				}
																}),
												//*********** progress bar
												Guage(),
												// 		new ProgressBarPlugin( 			{ 				complete: chalk.bgGreen(' '),
												// 			incomplete: chalk.bgWhite('+'), 			width: 60, 			total: 100, 			clear:
												// false, clear:false, complete: '>', incomplete:'*',
												// 			format:chalk.bgGreen(chalk.black(':elapsed secs')+'
												// ')+'\t'+chalk.blue('[:current/:total]')+chalk.green(' { ') + ':bar'
												// +chalk.green(' }')+chalk.red(':percent')+'\t'+chalk.red(' :msg') 		} 	), new
												// webpack.ProgressPlugin(percentage => (new progressBar(":current % :bar",
												// 100)).update(percentage)), *************\
												// //*********************************** async chunks*************************
												// catch all - anything used in more than one place new
												// webpack.optimize.CommonsChunkPlugin({     //filename: 'used-twice.js',
												// async: 'used-twice',     minChunks(module, count) {         return count >=
												// 2;     }, }),
												new ExtractTextPlugin({filename: '[name]-[hash].bundle.css', allChunks: true})
								],
								devtool: 'eval-source-map',
								stats: {
												colors: true
								}
				};
};

let config = getConfig(clean_options);

module.exports = {
				config: config,
				getConfig: getConfig,
				clean_options: clean_options
};
