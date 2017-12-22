var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: { 
    app: path.resolve(__dirname, "./src/app.ts")
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
    publicPath: "/dist/"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
