import React, { useEffect, useState } from 'react';
import './index.css';
import ChatService from '../../Service/ChatService';
import NoUserImage from '../../assets/imgs/NoUserImage.jpg';
import UserChat from './UserChat';
const config = require('../../../package.json').config;

export default function Chats() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const userImage = user?.userInformation?.ProfileImageUrl ? config.dsvApiAddress + user?.userInformation?.ProfileImageUrl : NoUserImage;
    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState(null);

    const setChatContainer = (chatID,chatWith) => {
        clearInterval(window.chatJob);
        setChat(<UserChat chatID={chatID} chatWith={chatWith} />)
    }

    useEffect( () => {
        async function load() {
            await getChatsFromCurrentUser();
        };
        load();
        // eslint-disable-next-line
    }, []);

    const getChatsFromCurrentUser = async () => {
        const response = await ChatService.getChatsFromCurrentUser();
        let CHATS = [];
        response.data.forEach(x => {
            let chatWith;
            if (user.userInformation.Id === x.OriginUserId) {
                chatWith = {
                    Id: x.DestinationUserId,
                    Nome: x.DestinationUserName,
                    ImageUrl: x.DestinationUserImageUrl ? config.dsvApiAddress + x.DestinationUserImageUrl : NoUserImage
                }
                CHATS.push(
                    <button className="chat-badge" onClick={() => setChatContainer(x.Id,chatWith) } key={x.Id}>
                        <img className="user-icon" src={x.DestinationUserImageUrl ? config.dsvApiAddress + x.DestinationUserImageUrl : NoUserImage} alt="" />
                        <span className="user-name">{x.DestinationUserName}</span>
                    </button>
                )
            }
            else {
                chatWith = {
                    Id: x.OriginUserId,
                    Nome: x.OriginUserName,
                    ImageUrl: x.OriginUserImageUrl ? config.dsvApiAddress + x.OriginUserImageUrl : NoUserImage
                }
                CHATS.push(
                    <button className="chat-badge" onClick={() => setChatContainer(x.Id,chatWith) } key={x.Id}>
                        <img className="user-icon" src={x.OriginUserImageUrl ? config.dsvApiAddress + x.OriginUserImageUrl : NoUserImage} alt="" />
                        <span className="user-name">{x.OriginUserName}</span>
                    </button>
                )
            }
        });

        setChats(CHATS);
    }

    return (
        <div className="chatPanel">
            <div className="leftSideBar">
                <div className="cur-user">
                    <img className="user-icon" src={userImage} alt="" />
                    <span className="user-name">{user.userInformation.FirstName}</span>
                </div>
                {chats}
            </div>
            <div className="chat">
                {chat}
            </div>
        </div>
    );
}
