class UserHelper{
    static getSessionUser(){
        return JSON.parse(localStorage.getItem('userInfo'));
    };
    
    static setSessionUser(user){
        localStorage.setItem('userInfo', JSON.stringify(user));
    };
    
    static delSessionUser(){
        localStorage.removeItem('userInfo');
    };
}
export default UserHelper;