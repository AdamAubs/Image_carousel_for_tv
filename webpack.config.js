const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./dist",
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/images.json", to: "images.json" }, // Copy images.json from src to dist
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // Apply to all JavaScript files
        exclude: /node_modules/, // Don't transpile node_modules
        use: {
          loader: "babel-loader", // Use babel-loader to transpile
          options: {
            presets: ["@babel/preset-env"], // Use preset-env to transpile ES6+ to ES5
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.json$/,
        type: "json",
      },
    ],
  },
};
