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
        // name: 'Noter',
        // description:
        //   "Noter is a collaborative note-taking platform built for simplicity and productivity. It's free fast and open source.",
        // homepage: 'https://noter.sambitsahoo.com',
        // author: {
        //   name: 'sambit Sahoo',
        //   email: 'soulsam480@hotmail.com',
        // },
        // repository: 'https://github.com/soulsam480/noter',
        // build: {
        appId: 'com.sambitsahoo.noter',
        productName: 'Noter',
        copyright: 'Copyright © 2021 Sambit Sahoo',
        buildVersion: '0.5.0',
        nsis: {
          oneClick: false,
        },
        // },
      },
    },
  },
};
