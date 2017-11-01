var path = require('path')
var webpack = require('webpack')

function resolve (file) {
  return path.join(__dirname, file)
}

module.exports = {
  entry: resolve('component.vue'),
  output: {
    path: resolve('dist'),
    filename: 'vue-json-schema.js',
    libraryTarget: 'umd',
    library: 'vue-json-schema',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
        query: { compact: false }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ],
  externals: {
    '@vx-components/input': '@vx-components/input',
    '@vx-components/select': '@vx-components/select',
    '@vx-components/textarea': '@vx-components/textarea',
    '@vx-components/fileinput': '@vx-components/fileinput',
    '@vx-components/checkbox': '@vx-components/checkbox'
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
