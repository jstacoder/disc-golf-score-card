let getConfig = require('./webpack.configmaker.js').getConfig;
let clean_options = require('./webpack.configmaker.js').clean_options;

module.exports = getConfig(clean_options);