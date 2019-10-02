const mix = require('laravel-mix');
const eslintFormatter = require('eslint-friendly-formatter');

mix.setPublicPath('./dist')
    // Add eslint to .jsx, .js and .vue files
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.(jsx|js|vue)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    exclude: /(node_modules)/,
                    options: {
                        formatter: eslintFormatter
                    }
                }
            ]
        }
    })
    // This will process our entry point (app.js)
    // into the dist/js folder
    .js('js/app.js', './cwd_events.js')
    .sass('styles/app.scss', './cwd_events.css')
    .copy('dist', '../../includes');
