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
