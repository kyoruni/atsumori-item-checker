module.exports = {
  outputDir: 'docs',
  publicPath: '/atsumori-item-checker/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/main.sass"`
      },
      scss: {
        prependData: `@import "@/assets/scss/main.scss";`
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}