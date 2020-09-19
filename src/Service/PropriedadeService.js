import tokenHelper from '../Helpers/TokenHelper';
import api from '../api';

function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}


export default {
    create: async (obj,imageFiles) => {
        let formData = getFormData(obj);

        for(let i = 0 ; i < imageFiles.length ; i++) formData.append('file',imageFiles[i]); 

        await api.post('/propriedade', formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                authorization: tokenHelper.getTokenFromCurrentUser()
            }
        })
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
    }
}