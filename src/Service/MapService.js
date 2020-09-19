import api from '../api';

export default {
    getMapData: async () => {
        return api.get('/propriedade', {
            headers: {
                'Content-type': 'application/json'
            }
        });
    }
}