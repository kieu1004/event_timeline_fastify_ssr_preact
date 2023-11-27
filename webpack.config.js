const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");

module.exports = [
    //for server
    {
        mode: 'production',
        target: "node",
        entry: {
            server: "./src/server.js"
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'server.js',
        },
        module: {
            rules: [
                {
                    test: /.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.(jpeg|png|jpg|svg|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                        publicPath: 'assets/'
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'event_timeline',
            }),
            new webpack.BannerPlugin({
                banner: 'require("source-map-support").install();',
                raw: true,
                entryOnly: false
            })
        ],
        devtool: "source-map",
        externals: [nodeExternals()],
    },

    //for client
    {
        mode: 'production',
        target: 'web',
        entry: {
            client: "./src/client.js"
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'client.js',
        },
        module: {
            rules: [
                {
                    test: /.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.(jpeg|png|jpg|svg|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                        publicPath: 'assets/'
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'event_timeline',
                manifest: "manifest.json",
            }),
        ],
        devtool: 'inline-source-map',
    },
];