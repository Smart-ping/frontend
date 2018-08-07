module.exports = {
  head: {
    title: 'SmartPing - лучшее решение для мониторинга вашего сайта',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'SmartPing решение для монитринга вашего сайта' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    middleware: ['auth']
  },
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome',
    '@nuxtjs/moment'
  ],
  axios: {
     proxy: true
  },
  proxy: {
    '/auth': process.env.API_AUTH_URL || 'http://localhost:8080',
    '/data': process.env.API_DATA_URL || 'http://localhost:8080'
  },
  devtool: 'source-map',
  build: {
    cssSourceMap: false,
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
