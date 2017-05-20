const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stylelint = require('stylelint');
const postcssCssNext = require('postcss-cssnext');

module.exports = {
    target: 'web',
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
        app: './index.tsx',
        vendor: [
            'axios',
            'react',
            'redux',
            'bem-cn',
            'immutable',
            'react-dom',
            'react-redux',
            'redux-thunk',
            'react-router',
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'js/app.bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    'awesome-typescript-loader',
                    'tslint-loader'
                ]
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader?name=fonts/[hash].[ext]',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 2,
                            localIdentName: '[name][local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                    postcssCssNext({ browsers: ['> 1%', 'last 2 versions'] })
                                ]
                            }
                    }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'stylus-loader'
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'svg-inline-loader'
            },
            {
                test: /\.(png)/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[ext]',
                    limit: 10000
                }
            },
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.bundle.js',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.__HOST__': JSON.stringify('http://localhost:3000'),
        }),
        new webpack.NamedModulesPlugin(),
    ],

    devServer: {
        contentBase: path.resolve('..', 'build'),
        host: '0.0.0.0',
        port: 8080,
        inline: true,
        lazy: false,
        hot: false,
        historyApiFallback: true,
        stats: 'errors-only',
    },
};
