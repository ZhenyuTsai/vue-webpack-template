const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const _env = require('dotenv').config({ path: './.env.' + process.env.ENV_MODE }).parsed
const webpack = require('webpack')
module.exports = () => {
  return {
    devtool: 'source-map',
    // entry: 配置入口文件 (从哪个文件开始打包)
    entry: './src/main.js',
    // output: 配置输出 (打包到哪去)
    output: {
      // 部署应用包时的基本 URL
      publicPath:'',
      // 打包输出的目录 (必须是绝对路径)
      path: path.join(__dirname, 'dist'),
      // 打包生成的文件名
      filename: 'js/bundle.js'
    },
    // 配置解析
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    },
    // 配置module模块加载规则
    module: {
      // loader的规则
      rules: [
        {
          test: /\.css$/,
          use: [ 
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath:'../',
              },
            }, 
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            // 分离出 css 内容
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                  publicPath:'../',
              },
            }, 
            'css-loader',
            'less-loader' 
          ]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            { 
              loader: 'url-loader',
              options: {
                // 超过 8k 就不转 base64, 小于 8k 才转
                limit: 8 * 1024,
                // 配置输出的文件名
                name: '[name].[ext]',
                // 配置静态资源的引用路径
                publicPath: '../images/',
                // 配置输出的文件目录
                outputPath: 'images/'
              }  
            }
          ]
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8 * 1024,
                name: '[name].[ext]',
                outputPath:'media/',
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8 * 1024,
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    // 配置插件
    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html' }),
      new MiniCssExtractPlugin({filename: 'css/index.css' }),
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(_env)
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: false,
        parallel: true
      })
    ]
  }
}

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}