const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry: {
        script: './src/scripts/script.js',
        game: './src/scripts/game.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/', to: 'src' },
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true,
        static: {
            directory: path.resolve(__dirname, '.'),
          },
    }
};
