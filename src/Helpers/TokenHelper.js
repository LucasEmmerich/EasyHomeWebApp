module.exports = {
    getTokenFromCurrentUser: () => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if(user.auth){
            return user.token;
        }
    }
}