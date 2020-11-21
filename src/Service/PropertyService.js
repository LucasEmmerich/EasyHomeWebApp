import tokenHelper from '../Helpers/TokenHelper';
import api from '../api';

const PropertyService =  {
    create: async (obj) => {
        const response = await api.post('/property', obj, { headers: { authorization: tokenHelper.getTokenFromCurrentUser() } });
        return response.data;
    },
    update: async (obj) => {
        const response = await api.put('/property', obj, { headers: { authorization: tokenHelper.getTokenFromCurrentUser() }, });
        return response.data;
    },
    list: () => {
        return api.get('/user/property', { headers: { authorization: tokenHelper.getTokenFromCurrentUser()} });
    },
    delete: async (propId) => {
        await api.delete(`/property/${propId}`, { headers: { authorization: tokenHelper.getTokenFromCurrentUser()} });
    },
    uploadPropertyImages: async (propId, images) => {
        const formData = new FormData();
        
        formData.append('Property_ID', propId);
        for (const img of images) formData.append('image', img);
        
        await api.post(`/property/images`, formData , {
            headers: { 'Content-type': `multipart/form-data; boundary=${formData._boundary}`, authorization: tokenHelper.getTokenFromCurrentUser() }
        });
    }
}

export default PropertyService;