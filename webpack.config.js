const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: path.resolve(__dirname, "src/js/app.jsx"),

    output: {
        path: path.resolve(__dirname, "build/"),
        filename: "bundle.js",
        publicPath: "./build/"
    },

    module: {
        rules: [
            {
                enforce: "pre",
                test: /(\.js$|\.jsx$)/,
                loader: "eslint-loader"
            },
            {
                test: /(\.js$|\.jsx$)/,
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015"]
                },
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.sass$/,
                loaders: ["style-loader", "css-loader", "sass-loader?indentedSyntax"]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: "file-loader"
            }
        ]
    },

    target: "electron-main",

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "Hammer": "hammerjs/hammer"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
};
