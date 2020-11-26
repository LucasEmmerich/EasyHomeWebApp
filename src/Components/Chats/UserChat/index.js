import './index.css';
import React, { Component } from 'react';
import ChatService from '../../../Service/ChatService';
import userHelper from '../../../Helpers/UserHelper';
import soundfile from '../../../assets/sounds/chatSound.mp3';

export default class UserChat extends Component {
    constructor() {
        super();
        this._chatAudio = new Audio(soundfile);
        this.state = {
            curUser: userHelper.getSession().user,
            messages: [],
            message: ''
        };
    }

    componentDidMount() {
        this.refresh();
        this.scrollToEnd();

        clearInterval(window.chatJob);
        window.chatJob = setInterval(() => {
            this.refresh();
        }, 5000);

        window.onkeydown = (e) => { if (e.key === 13) this.send(); }
    }

    messageComponent = (props) => {
        return <div className={"msg "+ props.pos +"-msg"} key={props.Id}>
            <img className="msg-img" src={props.ImageUrl} alt={props.ImageUrl}/>
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{props.FirstName}</div>
                    <div className="msg-info-time">{props.created_at}</div>
                </div>
                <div className="msg-text">{props.Message}</div>
            </div>
        </div>;
    }

    playNotification = () => this._chatAudio.play();

    scrollToEnd() {
        const chatDiv = document.querySelector(".msger-chat");
        chatDiv.scrollTop = chatDiv.scrollHeight;
    };

    clearMessageSent() {
        document.querySelector('#message-input').value = "";
        this.setState({ message: '' });
    };

    send = async (e) => {
        e.preventDefault();

        if (this.state.message) {
            const chat = {
                User_To_ID: this.props.conversationWith.Id,
                Message: this.state.message
            };
            this.clearMessageSent();
            await ChatService.addChat(chat);
            this.refresh(true);
            this.scrollToEnd();
        };
    }

    refresh(selfSend = false) {
        ChatService.getMessagesFromChat(this.props.chatID).then(response => {
            const msgs = [];
            response.data.forEach((x) => {
                if (x.User_ID === this.state.curUser.Id) {
                    msgs.push({
                        Id: x.Id,
                        ImageUrl: this.state.curUser.ImageUrl,
                        FirstName: this.state.curUser.FirstName,
                        created_at: x.created_at,
                        Message: x.Message,
                        pos: 'right'
                    });
                }
                else {
                    msgs.push({
                        Id: x.Id,
                        ImageUrl: this.props.conversationWith.ImageUrl,
                        FirstName: this.props.conversationWith.Name,
                        created_at: x.created_at,
                        Message: x.Message,
                        pos: 'left'
                    });
                }
            });

            if (!selfSend && (this.state.messages.length !== 0 && msgs.length !== this.state.messages.length))
                this.playNotification();

            this.setState({ messages: msgs });
            this.scrollToEnd();
        })
    }

    render() {
        const msgs = this.state.messages.map(m => this.messageComponent(m));
        return (
            <section className="msger">
                <header className="msger-header">
                    <strong>Conversa com {this.props.conversationWith.Name}</strong>
                </header>
                <main className="msger-chat">
                    {msgs}
                </main>
                <form className="msger-inputarea">
                    <input
                        type="text"
                        id="message-input"
                        autoComplete="off"
                        className="msger-input" placeholder="Enter your message..."
                        onChange={e => {
                            this.setState({
                                message: e.target.value
                            });
                        }}
                    />
                    <button type="submit" className="msger-send-btn" onClick={this.send}>Enviar</button>
                </form>
            </section>
        );
    }
}
