const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/scripts/index.js",
    ship: "./src/scripts/ship.js",
    gameboard: "./src/scripts/gameboard.js",
    player: "./src/scripts/player.js",
    gameLoop: "./src/scripts/gameLoop.js",
    gameDisplay: "./src/scripts/gameDisplay.js",
    events: "./src/scripts/events.js",
    gameboardDisplay: "./src/scripts/gameboardDisplay.js",
    pubsub: "./src/scripts/pubsub.js",
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/images/favicon.ico",
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif|)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
