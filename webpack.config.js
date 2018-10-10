const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  devtool: 'inline-source-map', // 映射
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: 'HappyPack/loader?id=jsHappy',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // {
      //   test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
      //   loader: 'babel-loader', //使用的加载器名称
      //   query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
      //       presets: ['env', 'react'],
      //       cacheDirectory: true  // 启动babel缓存 加快后续改动编译的速度 开发环境用
      //   }
      // },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },

    ]
  },
  externals: { // 外部链接lodash
    lodash: 'lodash'
  },
  optimization: {   // 打包公共的组件，原版本new webpack.optimize.CommonsChunkPlugin，新版本替换
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),       // 启动清除dist
    new webpack.HotModuleReplacementPlugin(), // 开发启用热模块 不需要刷新页面
    // new ParallelUglifyPlugin({ // webpack-parallel-uglify-plugin插件可以并行运行UglifyJS插件，这可以有效减少构建时间，当然，该插件应用于生产环境而非开发环境
    //   cacheDir: '.cache/',
    //   uglifyJS:{
    //     output: {
    //       comments: false
    //     },
    //     compress: {
    //       warnings: false
    //     }
    //   }
    // }),
    new HappyPack({ // happypack多核加快编译速度
      id: 'jsHappy',
      cache: true,
      threadPool: happyThreadPool,
      loaders: [{
        path: 'babel-loader',
        query: {
          cacheDirectory: '.webpack_cache', // babel缓存
          presets: ['stage-3', 'react']
        }
      }]
    }),
    new HtmlWebpackPlugin({       // html输出插件
      template: './index.html', //指定模板路径
      filename: 'index.html', //指定文件名
    })
  ],
  devServer: {
    contentBase: './dist' // 开发目录
  },
}