const path = require("path");
module.exports = {

    mode: "development",
    entry: "./js/app.js",
    output: {
        filename: "./out.js",
        path: path.resolve(__dirname, "build")
    },
    module: {
        rules: [
            { test: /\.(png|jpg|svg|gif)$/, loader: 'file-loader?name=./images/[name].[ext]' },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            targets: {
                                browsers: [
                                    'ie 11'
                                ]
                            }
                        }]
                    ]
                }
            }
        }]
    }
}