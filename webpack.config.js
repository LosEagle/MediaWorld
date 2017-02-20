var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: path.resolve(__dirname, "assets/js/app.js"),

    output: {
        path: path.resolve(__dirname, "build/"),
        filename: "bundle.js",
        publicPath: "./build/"
    },

    module: {
        loaders: [
            {
                test: /(\.js$|\.jsx$)/,
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
                loader : "file-loader"
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "Hammer": "hammerjs/hammer"
        })
    ]
};