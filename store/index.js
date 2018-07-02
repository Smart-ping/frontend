import cookie from 'cookie'

export const actions = {
  nuxtServerInit({ dispatch }, app) {
    return new Promise((resolve, reject) => {
      if (!app.req) 
        return
      const cookies = cookie.parse(app.req.headers.cookie || '')
      if (cookies.hasOwnProperty('x-access-token')) {
        app.$axios.defaults.headers.common['x-access-token'] = cookies['x-access-token']
        dispatch('auth/fetch', app)
          .then(result => {
            resolve(true)
          })
          .catch(error => {
            delete app.$axios.defaults.headers.common['x-access-token']
            resolve(false)
          })
      } else {
        delete app.$axios.defaults.headers.common['x-access-token']
        resolve(false)
      }
    })
  }
}