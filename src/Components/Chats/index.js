import './index.css';
import React, { Component } from 'react';
import UserHelper from '../../Helpers/UserHelper';
import ChatService from '../../Service/ChatService';
import NoUserImage from '../../assets/imgs/NoUserImage.jpg';
import UserChat from './UserChat';
import Api from '../../api';

export default class Chats extends Component {
    constructor() {
        super();
        this.state = {
            user: UserHelper.getSession().user,
            chats: [],
            currentChat: null
        }
    }
    componentDidMount() {
        this.loadUserConversations();
    }

    setChatContainer(chatID, conversationWith) {
        clearInterval(window.chatJob);
        this.setState({
            currentChat: <UserChat chatID={chatID} conversationWith={conversationWith} />
        });
    }

    loadUserConversations() {
        ChatService.getChatsFromCurrentUser().then(response => {
            const CHATS = [];
            response.data.forEach(x => {
                if (this.state.user.Id === x.OriginUserId)
                    CHATS.push({
                        Id: x.Id,
                        conversationWith: {
                            Id: x.DestinationUserId,
                            Name: x.DestinationUserName,
                            ImageUrl: x.DestinationUserImageUrl ? Api.baseURL + x.DestinationUserImageUrl : NoUserImage
                        }
                    })
                else
                    CHATS.push({
                        Id: x.Id,
                        conversationWith: {
                            Id: x.OriginUserId,
                            Name: x.OriginUserName,
                            ImageUrl: x.OriginUserImageUrl ? Api.baseURL + x.OriginUserImageUrl : NoUserImage
                        }
                    })
            });
            this.setState({ chats: CHATS });
        });
    }

    render() {
        return (
            <div className="chatPanel">
                <div className="leftSideBar">
                    <div className="cur-user">
                        <img className="user-icon" src={this.state.user.ImageUrl} alt="" />
                        <span className="user-name">{this.state.user.FirstName}</span>
                    </div>
                    {this.state.chats.map(c =>
                        <div className="chat-badge" onClick={() => this.setChatContainer(c.Id, c.conversationWith)} key={c.Id}>
                            <img className="user-icon" src={c.conversationWith.ImageUrl} alt="" />
                            <span className="user-name">{c.conversationWith.Name}</span>
                        </div>
                    )}
                </div>
                <div className="chat">
                    {this.state.currentChat}
                </div>
            </div>
        );
    }
}
