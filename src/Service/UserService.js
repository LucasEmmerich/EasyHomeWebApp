import api from '../api';
import UserHelper from '../Helpers/UserHelper';

const UserService = {
    create: async (obj, imgFile) => {
        const response = await api.post('/user', obj);
        
        if(imgFile){
            const formDataImg = new FormData();
            formDataImg.append('User_ID',response.data.User_ID);
            formDataImg.append('userImage',imgFile);

            await api.post('/user/image', formDataImg, {
                headers: { 'Content-type': `multipart/form-data; boundary=${formDataImg._boundary}`}
            });
        }

        const loginResponse = await api.post('/login', { 
            Login: obj.Login,
            Password: obj.Password
        });
        UserHelper.setSessionUser(loginResponse.data);
        window.location.href = '/';
    },
    login: async (obj) => {
        const loginResponse = await api.post('/login', obj);
        if(loginResponse.data.auth) UserHelper.setSessionUser(loginResponse.data);
        return loginResponse.data;
    },
    logout: () => {
        UserHelper.delSessionUser();
        window.location.href = '/';
    }
}

export default UserService;