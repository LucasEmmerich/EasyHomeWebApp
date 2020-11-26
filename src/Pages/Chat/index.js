import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Chats from '../../Components/Chats';
import PanelSideBar from '../../Components/PanelSideBar';
import UserHelper from '../../Helpers/UserHelper';

export default function Chat() {
    const user = UserHelper.getSession();

    if (user) {
        return (
            <div>
                <Header />
                <div style={{ display: 'flex',height: '86vh' }}>
                    <PanelSideBar/>
                    <Chats/>
                </div>
                <Footer />
            </div>
        );
    }
    else window.location.href = "/"; 
}