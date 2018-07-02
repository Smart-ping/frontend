import api from '~/api'
import cookies from 'js-cookie'

export const state = () => ({
    user: null
})
export const mutations = {
    set_user(store, data) {
        store.user = data
    },
    reset_user(store) {
        store.user = null
    }
}
export const actions = {
    fetch({ commit }, context ) {
        return api.auth.me(context.$axios)
            .then(response => {
                commit('set_user', response.data.result)
            //    context.$axios.defaults.headers.common['x-access-token'] = cookies.get('x-access-token')
                return response
            })
            .catch(error => {
                commit('reset_user')
                return error
            })
    },
    login({ commit },  data) {
        return api.auth.login($nuxt.$axios, data)
            .then(response => {
                commit('set_user', response.data.user)
            //    $nuxt.$axios.defaults.headers.common['x-access-token'] = cookies.get('x-access-token')
                cookies.set('x-access-token', response.data.token, { expires: 7 })
                return response
            })
    },
    reset({ commit }) {
        commit('reset_user')
        delete $nuxt.$axios.defaults.headers.common['x-access-token']
        cookies.remove('x-access-token')
        return Promise.resolve()
    }
}