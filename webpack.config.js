module.exports = {
  entry: [
    `./src/main.js`,
  ],
  output: {
    path: `${__dirname}/docs`,
    filename: "./assets/js/[name].js",
    clean: {
      keep: /\.html$/
    }
  }
}
