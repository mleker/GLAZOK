const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = process.env.PORT || 8000;
const BUILD_DIR = path.resolve(__dirname, './public');

module.exports = () => {
    process.env.WEBPACK_MODE = 'development';

    return {
        mode: 'development',
        entry: './src/index.jsx',
        devtool: 'inline-source-map',
        output: {
            path: BUILD_DIR,
            filename: 'index.bundle.js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.svg$/,
                    use: [
                        { loader: 'file-loader?name=[name].[ext]' },
                        {
                            loader: 'svgo-loader',
                            options: {
                                plugins: [
                                    { removeTitle: true },
                                    { convertColors: { shorthex: false } },
                                    { convertPathData: false }
                                ],
                                esModule: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|ico|webmanifest|xml)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: '[name].[ext]'
                        }
                    }],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        }
                    }],
                },
                {
                    test: /(manifest\.webmanifest|browserconfig\.xml)$/,
                    use: [
                        {
                            loader: "file-loader"
                        },
                        {
                            loader: "app-manifest-loader"
                        }
                    ]
                }

            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
        ],
        devServer: {
            historyApiFallback: true,
            hot: true,
            open: true,
            contentBase: path.join(__dirname, 'public'),
            host: 'localhost',
            port: port,
            compress: true,
        },
    };
};
