const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

const entries = (srcList) => {
  const path = require('path');
  sources = Object.values(srcList).map((src) =>
    path.resolve(__dirname, src)
  );
  return WebpackWatchedGlobEntries.getEntries(sources, {
    ignore: path.resolve(__dirname, './src/**/_*')
  })();
};

const htmlGlobPlugins = () => {
  const htmlEntries = entries(['./src/*.html']);
  return Object.keys(htmlEntries).map((key) =>
    new HtmlWebpackPlugin({
      filename: `${__dirname}/docs/${key}.html`,
      template: `${__dirname}/src/${key}.html`,
      inject: 'head',
    })
  );
};

module.exports = {
  entry: entries(['./src/*.js', './src/*.css']),
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
      filename: './assets/css/[name].css',
    }),
    ...htmlGlobPlugins()
  ]
}
