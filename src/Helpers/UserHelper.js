module.exports = {
    getUser : () => {
        return JSON.parse(localStorage.getItem('userInfo'));
    }
}