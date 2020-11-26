import Api from '../api';
import UserHelper from '../Helpers/UserHelper';

const UserService = {
    create: async (obj, imgFile) => {
        const response = await Api.instance.post('/user', obj);
        
        if(imgFile){
            const formDataImg = new FormData();
            formDataImg.append('User_ID',response.data.User_ID);
            formDataImg.append('userImage',imgFile);

            await Api.instance.post('/user/image', formDataImg, {
                headers: { 'Content-type': `multipart/form-data; boundary=${formDataImg._boundary}`}
            });
        }

        const loginResponse = await Api.instance.post('/login', { 
            Login: obj.Login,
            Password: obj.Password
        });
        UserHelper.setSession(loginResponse.data);
        window.location.href = '/';
    },
    login: async (obj) => {
        const loginResponse = await Api.instance.post('/login', obj);
        if(loginResponse.data.auth) 
            UserHelper.setSession(loginResponse.data);
        return loginResponse.data;
    },
    logout: () => {
        UserHelper.delSession();
        window.location.href = '/';
    }
}

export default UserService;