const path = require("path");
const entryConfig = require("./entry.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");

//add clientlib to html
const entry = entryConfig.copies.forEach(function (item) {
  if (item.transform) {
    item.transform = function (content, path) {
      return "<section>\n" + content + "\n<include clientLib here></include>\n</section>";
    }
  }
});

module.exports = {
  entry: entryConfig.entry,
  output: {
    path: path.resolve(__dirname, "../src/jcr_root/etc/designs/morningstar"),
    filename: "[name].js"
  },
  plugins: [
    new CopyWebpackPlugin(entryConfig.copies)
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/
    }]
  }
};