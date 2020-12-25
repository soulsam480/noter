module.exports = {
  // If you are deploying to github pages repo without a custom
  // domain name set publicPath: '/repo-name/'

  // If deploying to custom domain on github pages set publicPath: '/'
  publicPath: '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {},
      },
    },
  },
  devServer: {
    port: 8085,
  },
  pwa: {
    name: 'Noter',
    themeColor: '#d4d4f5',
    msTileColor: '#d4d4f5',
    //todo webpack-workbox config
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './sw.js',
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 230000,
      },
    },
  },
};
