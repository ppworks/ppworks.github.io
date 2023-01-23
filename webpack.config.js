module.exports = {
  entry: `./src/main.js`,
  output: {
    path: `${__dirname}/docs`,
    filename: "./assets/js/main.js",
    clean: true,
    keep: 'index.html'
  }
}
