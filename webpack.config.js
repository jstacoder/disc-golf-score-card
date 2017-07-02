'use strict';

let webpack = require('webpack')
let path = require('path')

const BASE_PATH = path.join(path.resolve(__dirname), 'disc_golf_score_card')
const APP_PATH = path.join(BASE_PATH, 'src')
const DIST_PATH = path.join(BASE_PATH, 'dist') 

module.exports = () => {
	return {
		entry: path.join(APP_PATH, 'app.jsx'),
		output: {
			filename: 'app.min.js',
			path: DIST_PATH
		},
		module: {
			rules: [
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options:{
							presets:['react', 'stage-1']
						}
					}
				},
				{
					test: /\.css$/,
					use:[
						 {loader: 'style-loader'},
						 {loader: 'css-loader'}
					]
				},
				{
					test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
					loader: 'url-loader?limit=10000&mimetype=application/font-woff'
				},
      			{
					test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
					loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
				},
      			{
					test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
					loader: 'file-loader'
				},
      			{
					test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
					loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
				}
			]
		}
	};
}
		

