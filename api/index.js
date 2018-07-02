
export default {
    auth: {
        me: (axios) => axios.get('auth/me'),
        login: (axios, data) => axios.post('auth/login', data)
    },
    checks: {
        fetch: (axios) => axios.get('data/checks'),
        create: (axios, data) => axios.post('data/checks', data)
    }
}