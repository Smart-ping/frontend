import api from '~/api'

export const state = () => ({
    checks: null,
    events: null
})

export const mutations = {
    set_checks(store, data) {
        store.checks = data
    },
    reset_checks(store) {
        store.checks = null
    },
    remove_checks(store, data) {
        const idx = store.checks.findIndex(item => (item.id === data.id))
        if (idx >= 0)
            store.checks.splice(idx, 1)
    },
    set_log(store, data) {
        store.event = data
    },
    reset_log(store) {
        store.event = null
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
                return response
            })
            .catch(error => {
                return error
            })
    },
    log({ commit }, data ) {
        return api.checks.log(this.$axios, data)
            .then(response => {
                if (response.data.type == 'success')
                    commit('set_log', response.data.events)
                return response
            })
            .catch(error => {
                commit('reset_log')
                return error
            })
    },
    delete({ commit }, data ) {
        return api.checks.delete(this.$axios, data)
            .then(response => {

                if (response.data.type == 'success')
                commit('remove_checks', data)

                return response
            })
            .catch(error => {
                return error
            })
    },


}