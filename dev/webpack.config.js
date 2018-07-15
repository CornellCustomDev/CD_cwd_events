const path = require('path');

//output the source file to two locations local for testing with index.html
var config = {
    // TODO: Add common Configuration
    module: {},
};

//builds into dev sourc location
devBuild = Object.assign({}, config,{
    mode: 'development',
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'app.bundle.js',
        libraryTarget: 'var',//expose localList
        library: 'CWD_LocalList',       
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, './components'),
            environment: path.resolve(__dirname, './environment'),
            styles: path.resolve(__dirname, './styles'),
        },
    },    
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }          
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
});

//builds into drupal module file locations
drupalBuild = Object.assign({}, config,{
    mode: 'production',
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, '../js'),
        filename: 'cwd_events.js',
        libraryTarget: 'var',//expose LocalList
        library: 'CWD_LocalList',          
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, './components'),
            environment: path.resolve(__dirname, './environment'),
            styles: path.resolve(__dirname, './styles'),
        },
    },       
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }               
        ]    
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
});

module.exports =  [
    devBuild, drupalBuild,  	
];
