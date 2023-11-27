const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

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
            client: [
                './src/client.js',
                './src/dragDrop.js',
                './src/dragDropTouchEvent.js'
              ]
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
            }),
            new WebpackManifestPlugin({
                seed: {
                    name: "My Preact PWA",
                    short_name: "PreactPWA",
                    description: "A Preact Progressive Web App",
                    start_url: "/",
                    display: "standalone",
                    background_color: "#ffffff",
                    theme_color: "#000000",
                    icons: [
                        {
                            src: "/assets/start-152x152.png",
                            sizes: "152x152",
                            type: "image/png"
                        },
                        {
                            src: "/assets/start.png",
                            sizes: "512x512",
                            type: "image/png"
                        }
                    ]
                }
            }),
        ],
        devtool: 'inline-source-map',
    },
];