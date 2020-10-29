import api from '../api';
import { delSessionUser, setSessionUser } from '../Helpers/UserHelper';

export default {
    create: async (obj, imgFile) => {
        const response = await api.post('/user', obj);
        
        let formDataImg = new FormData();
        formDataImg.append('User_ID',response.data.User_ID);
        formDataImg.append('userImage',imgFile);

        console.log(imgFile)

        await api.post('/user/image', formDataImg, {
            headers: { 'Content-type': `multipart/form-data; boundary=${formDataImg._boundary}`}
        });
        
        const loginResponse = await api.post('/login', obj);
        setSessionUser(loginResponse.data);
        window.location.href = '/';
    },
    login: async (obj) => {
        const loginResponse = await api.post('/login', obj);
        setSessionUser(loginResponse.data);
        window.location.href = '/';
    },
    logout: () => {
        delSessionUser();
        window.location.href = '/';
    }
}