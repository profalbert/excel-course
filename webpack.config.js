const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'


const filename = ext => {
  if(isDev) return `bundle.${ext}` 
  if(isProd) return `bundle.[hash].${ext}`
}

const jsLoaders = () => {
  const loaders = ['babel-loader']

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'), // .[hash] - хэш, нужен для того, чтобы пользоватлеь всегда заказивал актуальный бандл)
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: { // для удобства, чтобы не отслеживать пути
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(), // при новой сборке, чтобы происходила зачистка старых бандлов
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      }
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src/favicon.ico'), 
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    rules: [ // описываем loaders в проекте
      {
        test: /\.s[ac]ss$/i, // sass or scss
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,          
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  }
}


