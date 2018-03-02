const path = require('path');
const entryConfig = require('./entry.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
entry: entryConfig.entry,
output: {
    path: path.resolve(__dirname, '../src/jcr_root/etc/designs/morningstar'),
    filename: '[name].js'
},
plugins: [
  new CopyWebpackPlugin(entryConfig.copies)
],
module: {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }
  ]
}
};