const path = require("path");

const DIST = path.resolve(__dirname, "./dist");
const SOURCE = path.resolve(__dirname, "./source");

const baseConfig = {
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
        path: DIST
    }
};

module.exports = (env, argv) => {
    return argv.mode === "production"
        ? [baseConfig]
        : [baseConfig];
};
