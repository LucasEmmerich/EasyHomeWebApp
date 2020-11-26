import UserHelper from '../Helpers/UserHelper';
import Api from '../api';

const ChatService = {
    addChat: async (chat) => {
        await Api.instance.post('/chat', chat, { headers: { authorization: UserHelper.getSession().token } });
    },
    getChatsFromCurrentUser: async () => {
        const response = await Api.instance.get('/chat', { headers: { authorization: UserHelper.getSession().token } });
        return response;
    },
    getMessagesFromChat: async (chatId) => {
        const response = await Api.instance.get(`/chat/${chatId}/messages`, { headers: { authorization: UserHelper.getSession().token } });
        return response;
    }
}

export default ChatService;