import User from '../model/User';
import Api from '../api';
import NoUserImage from '../assets/imgs/NoUserImage.jpg';

export default class UserHelper {
    static getSession() {
        const session = JSON.parse(localStorage.getItem('session'));
        return session;
    };
    static setSession(newSession) {
        const newSessionUser = newSession.userInformation;

        const authorizedUser = new User(
            newSessionUser.Id,
            newSessionUser.FirstName,
            newSessionUser.LastName,
            newSessionUser.Email,
            newSessionUser.Contact,
            newSessionUser.Type,
            newSessionUser.Document,
            newSessionUser.Login,
            newSessionUser.Password,
            newSessionUser.ProfileImageUrl ? Api.baseURL + newSessionUser.ProfileImageUrl : NoUserImage
        );

        localStorage.setItem('session', JSON.stringify({
            authorizedIn: new Date(),
            token: newSession.token,
            user: authorizedUser
        }));
    };
    static delSession() {
        localStorage.removeItem('session');
    };
}