import api from '~/api'

export const state = () => ({
    checks: null
})

export const mutations = {
    set_checks(store, data) {
        store.checks = data
    },
    reset_checks(store) {
        store.checks = null
    }
}

export const actions = {
    fetch({ commit } ) {
        return api.checks.fetch(this.$axios)
            .then(response => {
                if (response.data.type == 'success')
                    commit('set_checks', response.data.checks)
                return response
            })
            .catch(error => {
                commit('reset_checks')
                return error
            })
    },
    create({ commit }, data ) {
        return api.checks.create(this.$axios, data)
            .then(response => {
        //        commit('set_checks', response.data.result)
                return response
            })
            .catch(error => {
                commit('reset_checks')
                return error
            })
    },

}