module.exports = {
  // If you are deploying to github pages repo without a custom
  // domain name set publicPath: '/repo-name/'

  // If deploying to custom domain on github pages set publicPath: '/'
  devServer: {
    port: 8500,
  },
  publicPath: '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {},
      },
    },
  },
  pwa: {
    name: 'Noter',
    themeColor: '#d4d4f5',
    msTileColor: '#d4d4f5',
    //todo webpack-workbox config
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './sw.js',
      exclude: [/_redirects/],
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
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.sambitsahoo.noter',
        productName: 'Noter',
        copyright: 'Copyright © 2021 Sambit Sahoo',
        buildVersion: '0.5.0',
        nsis: {
          oneClick: false,
        },
      },
    },
  },
};
