var webpack = require('webpack');
module.exports = {
    entry: {
        client: './src/front/client.ts'
    },
    output: {
        path: __dirname + "/wwwroot/public/js",
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'}
        ]
    }
}