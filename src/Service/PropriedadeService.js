import tokenHelper from '../Helpers/TokenHelper';
import api from '../api';

function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}


export default {
    create: async (obj) => {
        const response = await api.post('/propriedade', obj, { headers: { authorization: tokenHelper.getTokenFromCurrentUser() } });
        
        return response.data;
    },
    update: async (obj) => {
        await api.put('/propriedade', obj, {
            headers: {
                authorization: tokenHelper.getTokenFromCurrentUser(),
                'Content-Type': 'application/json'
            },
        })
    },
    list: () => {
        return api.get('/user/propriedade', {
            headers: {
                'Authorization': `${tokenHelper.getTokenFromCurrentUser()}`,
                'Content-type': 'application/json'
            }
        });
    },
    delete: async (propId) => {
        await api.delete(`/propriedade/${propId}`, {
            headers: {
                'Authorization': `${tokenHelper.getTokenFromCurrentUser()}`
            }
        });
    },
    uploadPropriedadeImages: async (propId, images) => {
        const formData = new FormData();

        formData.append('Propriedade_ID', propId);

        for (const img of images) formData.append('image', img);

        await api.post(`/propriedade/imagens`, formData ,{
            headers: {
                'Content-type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `${tokenHelper.getTokenFromCurrentUser()}`
            }
        });

    }
}