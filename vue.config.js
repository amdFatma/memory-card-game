module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
            @import "src/scss/config/index.scss";
            @import "src/scss/mixins/index.scss";
        `
      }
    }
  }
};