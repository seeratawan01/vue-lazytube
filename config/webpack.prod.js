const { merge } = require('webpack-merge')

const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const version = require('../package.json').version

module.exports = merge({}, {
  mode: 'production',
  devtool: false,

  entry: ['./src/index.js'],

  output: {
    library: 'vue-lazytube',
    libraryTarget: 'umd',
    globalObject: '(typeof self !== "undefined" ? self : this)',
    filename: 'vue-lazytube.umd.min.js',
    publicPath: './'
  },

  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          // Note: Only style-loader works for me !!!
          // 'vue-style-loader',
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }

    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new CompressionWebpackPlugin({
      test: /\.js(\?.*)?$/i
    }),
    new webpack.BannerPlugin(`Vue Lazytube version ${version} under MIT License copyright ${new Date().getFullYear()} seeratawan01`)
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false
      })
    ]
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }

  // plugins: [

  // Extracts CSS into separate files
  // Note: style-loader is for development, MiniCssExtractPlugin is for production
  // new MiniCssExtractPlugin({
  //     filename: 'styles.css',
  // }),
  // ],
  // module: {
  //     rules: [
  //         {
  //             test: /\.(scss|css)$/,
  //             use: [
  //                 MiniCssExtractPlugin.loader,
  //                 {
  //                     loader: 'css-loader',
  //                     options: {
  //                         importLoaders: 2,
  //                         sourceMap: false,
  //                     },
  //                 },
  //                 'postcss-loader',
  //                 'sass-loader',
  //             ],
  //         },
  //     ],
  // },
  // optimization: {
  //     minimize: true,
  //     minimizer: [new CssMinimizerPlugin(), "..."],
  //     // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
  //     // instead of having their own. This also helps with long-term caching, since the chunks will only
  //     // change when actual code changes, not the webpack runtime.
  //     // runtimeChunk: {
  //     //     name: 'runtime',
  //     // },
  // },
  // performance: {
  //     hints: false,
  //     maxEntrypointSize: 512000,
  //     maxAssetSize: 512000,
  // },
})
