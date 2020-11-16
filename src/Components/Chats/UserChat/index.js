import React from 'react';
import './index.css';
import ChatService from '../../../Service/ChatService';
import userHelper from '../../../Helpers/UserHelper';
import { useState, useEffect } from 'react';
import soundfile from '../../../assets/sounds/chatSound.mp3';
const config = require('../../../../package.json').config;

export default function UserChat(props) {
    const curUser = userHelper.getSessionUser();
    const chatNotificationNoise = new Audio(soundfile);
    const playNotification = () => chatNotificationNoise.play();

    const [Message, setMessage] = useState('');
    const [Messages, setMessages] = useState([]);

    const refreshMessages = async (selfSend = false) => {
        const response = await ChatService.getMessagesFromChat(props.chatID);
        let msgs = [];
        response.data.forEach((x) => {
            if (x.User_ID === curUser.userInformation.Id) {
                msgs.push(
                    <div className='msg right-msg' key={x.Id}>
                        <img className="msg-img" src={config.dsvApiAddress + curUser.userInformation.ProfileImageUrl} alt="" />
                        <div className="msg-bubble">
                            <div className="msg-info">
                                <div className="msg-info-name">{curUser.userInformation.FirstName}</div>
                                <div className="msg-info-time">{x.created_at}</div>
                            </div>
                            <div className="msg-text">{x.Message}</div>
                        </div>
                    </div>
                )
            }
            else {
                msgs.push(
                    <div className='msg left-msg' key={x.Id}>
                        <img className="msg-img" src={props.chatWith.ImageUrl} alt="" />
                        <div className="msg-bubble">
                            <div className="msg-info">
                                <div className="msg-info-name">{props.chatWith.Nome}</div>
                                <div className="msg-info-time">{x.created_at}</div>
                            </div>
                            <div className="msg-text">{x.Message}</div>
                        </div>
                    </div>
                )
            }
        });

        if (!selfSend && (Messages.length !== 0 && msgs.length !== Messages.length)) playNotification();

        setMessages(msgs);
    };

    clearInterval(window.chatJob);
    window.chatJob = setInterval(async () => {
        await refreshMessages();
    }, 5000);

    useEffect(() => {
        async function load() {
            await refreshMessages();
            scrollToEnd();
        }
        load();
        document.onkeydown = (e) => { if (e.key === 13) sendChat(); }
        // eslint-disable-next-line
    }, []);

    const scrollToEnd = () => {
        let chatDiv = document.querySelector(".msger-chat");
        chatDiv.scrollTop = chatDiv.scrollHeight;
    };

    const clearMessageSent = () => {
        let messageDiv = document.querySelector("#message-input");
        messageDiv.value = '';
        setMessage('');
    }

    const sendChat = async (e) => {
        e.preventDefault();
        if (Message) {
            let chat = {
                User_To_ID: props.chatWith.Id,
                Message
            };
            clearMessageSent();
            await ChatService.addChat(chat);
            await refreshMessages(true);
            scrollToEnd();
        };
    }

    return (
        <section className="msger">
            <header className="msger-header">
                <strong>Conversa com {props.chatWith.Nome}</strong>
            </header>
            <main className="msger-chat">
                {Messages}
            </main>
            <form className="msger-inputarea">
                <input type="text" id="message-input" autoComplete="off" className="msger-input" placeholder="Enter your message..." onChange={e => setMessage(e.target.value)} />
                <button type="submit" className="msger-send-btn" onClick={sendChat}>Enviar</button>
            </form>
        </section>
    );
}