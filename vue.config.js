module.exports = {
  lintOnSave: false,
  pages: {
    popup: {
      template: "public/index.html",
      entry: "./src/pages/popup/popup.ts",
      title: "Badger"
    },
    options: {
      template: "public/index.html",
      entry: "./src/pages/options/options.ts",
      title: "Badger - Settings"
    }
  },
  css: {
    sourceMap: process.env.NODE_ENV !== "production",
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
