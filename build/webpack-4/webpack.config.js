const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MyPlugin = require('./plugins/ftl')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader'
            }, {
            test: /\.(html)$/,
            use: [{
                loader: path.resolve(__dirname, 'loaders/htmlDate.js'),
                options: {
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new MyPlugin()
    ]
};
