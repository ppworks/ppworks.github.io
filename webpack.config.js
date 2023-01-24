const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

const entries = (src, options = {}) => {
  const path = require('path');
  return WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, src)], options)();
};

const htmlGlobPlugins = () => {
  const htmlEntries = entries('./src/*.html');
  return Object.keys(htmlEntries).map((key) =>
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: `${key}.html`,
      template: `src/${key}.html`,
      chunks: [key],
    })
  );
};

module.exports = {
  entry: {
    main: './src/main.js',
    style: './src/style.css'
  },
  output: {
    path: `${__dirname}/docs`,
    filename: "./assets/js/[name].js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          },
          "ejs-plain-loader"
        ],
      }
    ]
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new WebpackWatchedGlobEntries(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
    ...htmlGlobPlugins()
  ]
}
