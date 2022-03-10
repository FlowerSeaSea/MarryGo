let path = require("path");
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^api": "/api",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.extensions
      .add(".js")
      .add(".json")
      .add(".vue")
    config.resolve.alias
      .set("@", path.resolve(__dirname, "./src"))
  },
};
