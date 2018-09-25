const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./buildConf/assetsPath');
const getIp = require('dev-ip');

const isDev = process.argv.indexOf('development') > -1;

module.exports = {
    devtool: 'source-map',
    output: {
        publicPath: config.setPublicPath(),
        filename: config.setAssetsPath('js/[name].[chunkhash:8].js')
    },
    devServer: {
        host: getIp()[0] || 'localhost',
        port: 9090,
        historyApiFallback: true,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name][hash:8].[ext]',
                            outputPath: config.setAssetsPath('images')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin({ openAnalyzer: !isDev }), // TODO
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            __DEV__: isDev,
            __ENV__: `"${process.env.NODE_ENV}"`,
            __SERVER_ENV__: `"${process.env.SERVER_ENV}"`
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.png'],
    }
};
