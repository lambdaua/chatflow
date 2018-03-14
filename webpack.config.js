const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './dist');

module.exports = function () {
    const ENV = process.env.ENV || 'local';

    console.log('ENV:', ENV);
    const isLocal = ENV === 'local';
    const isProd = !isLocal;

    const plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        new webpack.EnvironmentPlugin({
            NODE_ENV: isProd ? 'production' : 'development',
            ENV: ENV
        }),

        new webpack.NamedModulesPlugin(),

        new HtmlWebpackPlugin(),
    ];

    if (isProd) {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
        );
    }

    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                modules: false,
                localIdentName: '[local]--[hash:base64:5]',
                minimize: isProd,
                sourceMap: isLocal,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require('autoprefixer'),
                    require('postcss-object-fit-images')
                ]
            }
        },
        'sass-loader',
    ];

    let devServer = {
        contentBase: sourcePath,
        host: process.env.HOST,
        port: 3000,
        compress: false,
        inline: true,
        hot: true,
        disableHostCheck: true,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: false,
            colors: {
                green: '\u001b[32m',
            }
        },
        historyApiFallback: {
            index: '/'
        },
        /*setup: function (app) {
            app.get(/((?:(?:(?:s?css|fonts|img|js)\/(?:[^\/]+\/)*)?[^\/ ]+\.[^\/ ]+))$/, function (req, res, next) {
                if (!/^\/(?:s?css|fonts|img|js)\//.test(req.path) && /^\/[^\/]+\//.test(req.path)) {
                    var path = req.params[0];
                    //console.log(req.path + ': redirect to: ' + path);
                    res.redirect('/' + path);
                }
                else {
                    //console.log(req.path + ': no redirect');
                    next();
                }
            });
        },*/
    };

    return {
        devtool: isProd ? 'source-map' : 'eval',
        context: sourcePath,
        entry: {
            js: ['./index.js']
        },
        output: {
            path: staticsPath,
            filename: 'index.js',
        },
        module: {
            rules: [
                // hack to fix Lodash global exporting
                {
                    parser: {
                        amd: false,
                    },
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
                },
                {
                    test: /\.(png|jpe?g|gif|ttf|eot|ico|otf)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[hash].[ext]',
                        },
                    },
                },
                {
                    test: /\.json$/,
                    use: 'json-loader',
                },
                {
                    test: /\.svg$/,
                    use: {
                        loader: 'react-svg-loader',
                        options: {
                            svgo: {
                                plugins: [
                                    {removeTitle: true},
                                ],
                            },
                        },
                    },
                },
                {
                    test: /\.(s?css)$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                hmr: isLocal,
                            },
                        },
                        ...cssLoaders,
                    ]
                },
                {
                    test: /\.(jsx?)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ],
        },
        resolve: {
            extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.json'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                sourcePath,
            ],
        },

        plugins,

        stats: {
            colors: {
                green: '\u001b[32m',
            }
        },

        devServer,
    };
};