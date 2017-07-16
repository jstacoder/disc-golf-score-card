'use strict';
'esversion: 6';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var getConfig = require('./webpack.configmaker.js').getConfig;
var clean_options = require('./webpack.configmaker.js').clean_options;

let config = getConfig(clean_options); 
config.output.publicPath = "http://localhost:3000" + config.output.publicPath;
config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
)
new WebpackDevServer(
    webpack(config),
    {
        inline:true,
        publicPath: config.output.publicPath,
        //publicHost: "http://localhost:3000" ,
        hot: true,
        historyApiFallback:true,
        contentBase:'./disc_golf_score_card/dist',
        //contentBase:'http://localhost:3000/dist/', 
        headers: {
            'ACCESS-CONTROL-ALLOW-ORIGIN': '*'
        }        
    }
).listen(3000, 'localhost', function(err, res){
        if(err){
            return console.log(err);
        }
        console.log('listening on 3000');
        console.log(res);
});
