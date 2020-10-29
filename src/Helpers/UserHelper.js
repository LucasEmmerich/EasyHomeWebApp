module.exports = {

    getSessionUser: () => {
        return JSON.parse(localStorage.getItem('userInfo'));
    },
    setSessionUser: (user) => localStorage.setItem('userInfo',JSON.stringify(user)),
    delSessionUser: () => localStorage.removeItem('userInfo')
}