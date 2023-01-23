const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin    = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.js',
    style: './src/style.css'
  },
  output: {
    path: `${__dirname}/docs`,
    filename: "./assets/js/[name].js",
    clean: {
      keep: /\.html$/
    }
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
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: `${__dirname}/docs/index.html`,
      inject: 'head'
    }),
  ]
}
