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
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    }
}