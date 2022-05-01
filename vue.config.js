let path = require("path");
module.exports = {

  //=>关闭生产环境下的资源映射（生产环境下不在创建xxx.js.map文件）
  productionSourceMap: false,
  // 构建好的文件输出到哪里
  outputDir: "dist",
 
  // assetsDir: "base" //静态资源打包地址
  publicPath: "./",

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^api": "/api",
        },
      },
      "/laohuangli": {
        target: "http://v.juhe.cn",
        changeOrigin: true,
        pathRewrite: {
          "^laohuangli": "/laohuangli",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.extensions.add(".js").add(".json").add(".vue");
    config.resolve.alias.set("@", path.resolve(__dirname, "./src"));
  },
};
