/**
 * @Author: jeCyu
 * @Date: 2017-10-05 11:37:09 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-08 9:23:56 am 
 */
var webpack = require('webpack');      
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置,dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法（针对多个页面时，避免重复代码）
var getHtmlConfig = function(name) {
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/' + name +'.html',
        inject: true,
        hash: true,
        chunks: ['common', name]    
    }
}

// webpack config
var config = {
    entry:  { 
        'common': ["./src/page/common/index.js"],
        'index': ["./src/page/index/index.js"],
        'login': [ "./src/page/login/index.js"]
    },
    output: {
        path: "./dist",//打包后的文件存放的地方
        publicPath: '/dist',  // 浏览器访问依赖包的路径
        filename: 'js/[name].js' //打包后输出文件的文件名
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    // devServer: {
    //     inline: true, // 实时刷新
    //     port: 8088
    // }, // devServer: {
    //     inline: true, // 实时刷新
    //     port: 8088
    // },
    module: {
        // rules: [
        //     {
        //         test: /\.css$/,
        //         use: [
        //             { loader: "css-loader"},
        //             { loader: "style-loader"}
        //         ]
        //     }
        // ]
        // 第一种写法版本不兼容
        loaders: [
            // {test: /\.css$/, loader: "style-loader!css-loader"},
            // 提取css文件
            { 
                test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            // 图片和字体文件的加载处理
            { 
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' 
            }
        ]
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin('css/[name].css'),
        // html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
}

// 使用环境变量来判断开发环境来启动服务器
if('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
    console.log(WEBPACK_ENV);
}

module.exports = config;

