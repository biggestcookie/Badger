module.exports = {
  lintOnSave: false,
  pages: {
    popup: {
      template: "public/index.html",
      entry: "./src/popup/main.ts",
      title: "Popup"
    },
    options: {
      template: "public/index.html",
      entry: "./src/options/main.ts",
      title: "Options"
    }
  },
  css: {
    // sourceMap: process.env.NODE_ENV !== "production",
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/_variables.scss";'
      }
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.ts"
        }
      }
    }
  }
};
