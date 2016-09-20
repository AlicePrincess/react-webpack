var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractPlugin = require('extract-text-webpack-plugin')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var path = require('path')


//定义是否是 production
var production = process.env.NODE_ENV === 'production'
var project=process.env.NAME?process.env.NAME:'index'
var tem=process.env.TEM?process.env.TEM:'default'


//定义module
modules = {
    loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
    }, {
        test: /\.css$/,
        // exclude: /node_modules/,
        loaders: ["style", "css", 'postcss']
    }, {
        test: /\.less$/,
        loaders: ["style", "css", 'postcss', 'less']
    }, {
        test: /\.scss$/,
        loaders: ["style", "css", 'postcss', 'sass']
    },{
      test: /\.(ttf|eot|woff(2)?)(\?(t=)?[a-z0-9]+)?$/,
      loader: 'url?limit=50000&hash=sha512&digest=hex&name=[hash].[ext]'
    }, {
      test: /\.(svg?)(\?(t=)?[a-z0-9]+)$/,
      loader: 'url?limit=50000&hash=sha512&digest=hex&name=[hash].[ext]'
    },{
			test: /\.svg$/,
			loader: 'svg-inline'
		},{
			test: /\.(jpe?g|png|gif)$/i,
			loaders: [
        'url?limit=50000&hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
			]
		}, {
        test: /\.mp3$/,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
        ]
    }]
}

// 定义插件
plugins = [
  new HtmlwebpackPlugin({
      template: __dirname + '/templates/'+tem+'.html',
      filename: 'index.html',
      chunks: '[name]',
      inject: 'body'
  }),
    new webpack.HotModuleReplacementPlugin(),
]

// production 插件
if (production) {
    plugins = plugins.concat([
        new CleanPlugin('dist'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200,
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
            },
        }),
        new webpack.DefinePlugin({
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false,
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
        }),
    ])
}

module.exports = {
    debug: !production,
    entry: {
        app: './'+project+'/client.jsx',
    },
    module: modules,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    postcss: [require('autoprefixer')({
  		browsers: ['last 2 versions']
  	}), require('precss')],
    plugins: plugins,
    devtool: production ? false : 'eval',
}
