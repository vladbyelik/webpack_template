const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    context: path.resolve(__dirname, 'src'), // исходники приложения
    mode: 'development',
    entry: {
        main: './js/index.js',
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".js", '.json', '.png'], 
        // допустимые расширения в проекте, которые нужно понимать по умолчанию (в конце названия файла во время импорта)
        alias: {
            images: path.resolve(__dirname, 'src/assets')
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: isDev,
        port: 8080,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'pages/test.html',
            template: './pages/test.html'
          }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/img/'),
                    to: path.resolve(__dirname, 'dist/img')
                },
                {
                    from: path.resolve(__dirname, 'src/assets/fonts/'),
                    to: path.resolve(__dirname, 'dist/fonts')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
        })
    ],
    module: { 
        // функционал модулей, позволяющий работать с другими типами файлов
        rules: [
            {
                test: /\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'dist')
                        }
                    }, 
                    { 
                        loader: 'css-loader', 
                        options: 
                            { 
                                url: false, 
                                sourceMap: true 
                            } 
                    },
                ] // работает справа на лево
            },
            {
                test: /\.(sass|scss)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'dist')
                        }
                    },
                    { 
                        loader: 'css-loader', 
                        options: 
                            { 
                                url: false, 
                                sourceMap: true 
                            } 
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpeg|jpg|svg|gif)$/,
                loader: 'file-loader',
                type: 'asset/resource',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ]

    } 
}