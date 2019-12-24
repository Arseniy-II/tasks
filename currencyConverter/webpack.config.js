const
    path = require('path'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    autoprefixer = require('autoprefixer'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    TimeFixPlugin = require('time-fix-plugin');

const webpackConfig = () => {

    const publicFolder = './build';
    return {
        entry: './app/index.js',
        output: {
            path: path.resolve(__dirname, publicFolder),
            publicPath: '/',
        },
        devServer: {
            contentBase: publicFolder,
            open: true,
            hot: true,
            historyApiFallback: true,
        },
        resolve: {
            extensions: [ '.js', '.jsx' ],
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            browsers: [ '> 1%' ],
                                        }
                                    }
                                ],
                                '@babel/preset-react'
                            ],
                            plugins: [
                                'transform-class-properties',
                            ]
                        }
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: true }
                        }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: './',
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[local]___[hash:base64:5]',
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        overrideBrowserslist: [ '> 1%' ],
                                    }),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                'includePaths': [ 'app/style' ]
                            }
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [
                                    path.resolve(__dirname, 'app/assets/scss/_variables.scss'),
                                    path.resolve(__dirname, 'app/assets/scss/_mixins.scss'),
                                ],
                            },
                        },
                    ],
                },
            ]
        },
        plugins: [
            new TimeFixPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                template: './app/index.twig',
                filename: './index.html',
                chunksSortMode: 'none',
                inject: 'body',
                isProduction: true,
            }),
            new MiniCssExtractPlugin()
        ]
    };
};

module.exports = webpackConfig;
