const baseConfig = require("./webpack.base.config.js");

module.exports = (env, argv) => {
    return argv.mode === "production"
        ? [baseConfig]
        : [baseConfig];
};
