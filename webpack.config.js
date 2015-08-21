module.exports = {
  entry: {'bundle': './index'},
  output: {
    path: '',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ["", ".jsx", ".js"]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  }
};
