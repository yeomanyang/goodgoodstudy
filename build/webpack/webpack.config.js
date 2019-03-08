//webpack配置文件符合commonJs模块规范
var path = require('path'),

    //简化生成适合webpack打包的html
    HtmlWebpackPlugin = require('html-webpack-plugin'),

    MiniCssExtractPlugin = require("mini-css-extract-plugin");

    //抽取css字符串并生成css文件
    // ExtractTextPlugin = require("extract-text-webpack-plugin"),

    //这里引入webpack是为了使用webpack的热更新功能以及其他自带插件，见 module.exports.plugins
    webpack = require('webpack');

module.exports = {
    // 入口文件，webpack据此对项目进行打包
    // 类型： String字符串 | Array数组 | Object对象
    // 如果是SPA（single page app 单页面应用），使用字符串即一个入口即可；如果是MPA（multiple page app），建议使用Object类型
    entry: [
        // 给webpack-dev-server启动一个本地服务，并连接到8080端口
        'webpack-dev-server/client?http://localhost:8080',

        // 给上面启动的本地服务开启自动刷新功能，'only-dev-server'的'only-'意思是只有当模块允许被热更新之后才有热加载，否则就是整页刷新
        'webpack/hot/only-dev-server',

        // webpack的入口文件，注意这个声明必须写在上面两个后面，webpack-dev-server才有效
        './src/main.js'
    ],
    // 定义webpack打包时的输出文件名及路径
    output: {
        // 定义webpack打包之后的文件名
        filename: '[name].[hash].js',

        // 定义打包文件的存储路径：当前目录的build文件夹
        path: path.resolve(__dirname, './dist'),

        // 声明资源（js、css、图片等）的引用路径
        // webpack打包时会把html页面上的相对路径根据publicPath解析成绝对路径
        // eg：当publicPath为'https://jd.com/'时，如果有html或者css含有一张图片相对路径为'./img/test.jpg',打包之后html（或css）中图片的路径就会变成'https://jd.com/img/test.jpg'
        publicPath: ''
    },

    // 用于解析entry选项的基础目录(必须是绝对路径)，该目录必须包含入口文件
    // 默认: process.cwd()
    context: __dirname,

    // 定义项目里各种类型模块的处理方式
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     // 处理.css文件
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     })
            // },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(jpg|png)$/,
                // 处理.png和.jpg格式的图片文件
                use: ['url-loader?limit=10000&name=img/[name].[ext]'
                    // limit参数指图片大小（10kb），当小于这个值时图片转为base64，当把值修改为60000时，1.jpg（50kb）会被解析成base64，打包后查看index.html代码可以看到
                    // name参数指图片文件的命名格式，前面可以加 img/ 表示图片存储路径
                ]
            },
            {
                test: /\.html$/,
                // 处理.html文件
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['env']
                    // }
                }
            }
        ]
    },

    // webpack插件
    plugins: process.env.NODE_ENV !== 'production' ? [
        // 生成html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'test',
        //     minChunks: 2,
        //     filename: 'test.[hash].js'
        // }),
        // 压缩js文件
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: true
        //     }
        // }),
        // 生成css文件，一下括号中的'style.css' 是打包后的css文件名，可自定义
        // new ExtractTextPlugin("[name].[contenthash].css"),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css"
        }),
        // 在webpack打包的时候会对这些变量做替换
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'LODOP.PRINT': 'LODOP.PREVIEW()'
        }),

        // // 给打包文件加上你的签名
        // new webpack.BannerPlugin({
        //     banner: 'This is created by nek-ui'
        // })
    ] : [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // 开启webpack全局热更新
        new webpack.HotModuleReplacementPlugin(),

        // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            cleverdog: '"LODOP.PREVIEW()"'
        })
    ],
    // 定义webpack-dev-server
    devServer: {
        // 静态文件目录位置，只有当你需要在webpack-dev-server本地服务器查看或引用静态文件时用到。类型：boolean | string | array, 建议使用绝对路径
        contentBase: path.resolve(__dirname, 'src'),
        // 模块热更新。依赖于HotModuleReplacementPlugin
        hot: true,
        // 在命令行窗口显示打包信息
        noInfo: false,
    },
    resolve: {
        // eg：入口文件改成webpack.entry，打包时webpack会先检索webpack.entry文件，返回结果为空时给文件补上.js文件尾缀再继续检索，依此类推。
        extensions: ['.js', '.scss', '.html'],
        alias: {
            // 这里可以给一些常用的模块添加别名，可以减少webpack查找该模块的时间，比如说：vue
            // 'vue': 'vue/dist/vue.common.js'
        }
    },
    // 打包时将不会把以下第三方库打包进webpack.bundle.js中但可被webpack全局调用，比如说jquery，但需要在html文件中用script引入jquery
    externals: {
        jquery: 'jQuery'
    }
};
