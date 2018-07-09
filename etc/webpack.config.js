var path = require('path');
var webpack = require('webpack');
//output the source file to two locations local for testing with index.html
var config = {
    // TODO: Add common Configuration
    module: {},
};

etcBuild = Object.assign({}, config,{
    mode: 'development',
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
});

drupalBuild = Object.assign({}, config,{
    mode: 'development',
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, '../js'),
        filename: 'cwd_events.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
});

module.exports =  [
    etcBuild, drupalBuild,  	
];
