
export default {
    auth: {
        me: (axios) => axios.get('auth/me'),
        login: (axios, data) => axios.post('auth/login', data),
        register: (axios, data) => axios.post('auth/register', data)
    },
    checks: {
        fetch: (axios) => axios.get('data/checks'),
        create: (axios, data) => axios.post('data/checks', data),
        log: (axios, data) => axios.get('data/checks/log/' + data.id),
        delete: (axios, data) => axios.delete('data/checks/' + data.id)
    },
    logs: {
        fetch: (axios, data) => axios.get('/data/checks/log/' + data.id, { params: data.params }),
        stat: (axios, data) => axios.get('/data/checks/stat/' + data.id, { params: data.params })
    }

}