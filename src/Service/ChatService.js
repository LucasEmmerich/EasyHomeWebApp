import tokenHelper from '../Helpers/TokenHelper';
import api from '../api';

export default {
    addChat: async (chat) => {
        await api.post('/chat',chat, { headers: { authorization: tokenHelper.getTokenFromCurrentUser() } });
    },
    getChatsFromCurrentUser: async ()=> {
        const response = await api.get('/chat', { headers: { authorization: tokenHelper.getTokenFromCurrentUser() } });
        return response;
    },
    getMessagesFromChat: async (chatId) => {
        const response = await api.get(`/chat/${chatId}`, { headers: { authorization: tokenHelper.getTokenFromCurrentUser() } });
        return response;
    }
}