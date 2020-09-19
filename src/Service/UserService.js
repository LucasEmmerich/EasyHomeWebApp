import api from '../api';

export default {
    create: async (obj) => { 
        const response = await api.post('/user', obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //login depois da criação de conta
        const loginResponse = await api.post('/login', obj, { headers: { 'Content-Type': 'application/json' }});
        localStorage.setItem('userInfo',JSON.stringify(loginResponse.data));
        window.location.href = '/';
    },
    login: async (obj) => {
        const loginResponse = await api.post('/login', obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        localStorage.setItem('userInfo',JSON.stringify(loginResponse.data));
        window.location.href = '/';
    },
    logout: () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    }
}