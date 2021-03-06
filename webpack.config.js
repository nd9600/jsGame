var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/game.ts',
    output: {
        path: path.resolve(__dirname, './static/js/'),
        publicPath: 'static/js/',
        filename: 'game.js'
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],

                            // disable type checker - we will use it in fork plugin
                            //transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                // The loader that handles any js files presented alone.
                // It passes these to the babel-loader which (again) uses the es2015
                // and react presets.
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        //new BundleAnalyzerPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@components': path.resolve(__dirname, 'src/shell/vue/components'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({ 
                uglifyOptions: { 
                    compress: false, 
                    mangle: true 
                }
            })
        ],
        splitChunks: false
    },
    devServer: {
        compress: false,
        historyApiFallback: true,
        noInfo: false,
        overlay: true
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: true
    },
    //devtool: '#eval-source-map'
    devtool: '#cheap-module-eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
