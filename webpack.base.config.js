const path = require("path");

const DIST = path.resolve(__dirname, "./dist");
const SOURCE = path.resolve(__dirname, "./source");

module.exports = {
    entry: path.join(SOURCE, "index.js"),

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },

    output: {
        filename: "has-consent.js",
        path: DIST,
        libraryTarget: "commonjs2"
    }
};
