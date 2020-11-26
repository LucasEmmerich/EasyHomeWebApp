import UserHelper from '../Helpers/UserHelper';
import Api from '../api';

const PropertyService = {
    create: async (obj) => {
        const response = await Api.instance.post('/property', obj, {
            headers: {
                authorization: UserHelper.getSession().token
            },
        });
        return response.data;
    },
    update: async (obj) => {
        const response = await Api.instance.put('/property', obj, {
            headers: {
                authorization: UserHelper.getSession().token
            },
        });
        return response.data;
    },
    list: () => {
        return Api.instance.get('/user/property', {
            headers: {
                authorization: UserHelper.getSession().token
            },
        });
    },
    delete: async (propId) => {
        await Api.instance.delete(`/property/${propId}`, {
            headers: {
                authorization: UserHelper.getSession().token
            },
        });
    },
    uploadPropertyImages: async (propId, images) => {
        const formData = new FormData();

        formData.append('Property_ID', propId);
        for (const img of images) formData.append('image', img);

        await Api.instance.post(`/property/images`, formData, {
            headers: {
                'Content-type': `multipart/form-data; boundary=${formData._boundary}`,
                authorization: UserHelper.getSession().token
            }
        });
    }
}

export default PropertyService;