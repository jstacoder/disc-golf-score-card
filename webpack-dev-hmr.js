'use strict';
'esversion: 6';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var getConfig = require('./webpack.configmaker.js').getConfig;
var clean_options = require('./webpack.configmaker.js').clean_options;

let config = getConfig(clean_options); 

new WebpackDevServer(webpack(config),{
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback:true,
    contentBase:'./disc_golf_score_card/dist',
    inline:true,
 //   colors:true,
    }).listen(8080, 'localhost', function(err, res){
        if(err){
            return console.log(err);
        }
        console.log('listening on 8080');
})