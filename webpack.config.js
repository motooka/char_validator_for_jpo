const path = require('path');

module.exports = {
    entry: './tmp/app.js',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'app.js',
    },
    devtool: 'inline-source-map',
    mode: 'development',
};
