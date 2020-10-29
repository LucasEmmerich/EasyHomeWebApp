import React from 'react';
import './index.css';
import { FaHome, FaComment, FaUser} from 'react-icons/fa';
export default function PanelSideBar() {
    const curAction = window.location.href.split('/').reverse()[0];
    
    return (
        <div className="sidebar">
            <a href="/property" className={curAction === 'property' ? 'active' : ''}><FaHome size={20}/> <span>Propriedades</span></a>
            <a href="/chats" className={curAction === 'chats' ? 'active' : ''}><FaComment size={20}/> <span>Conversas</span></a>
            <a href="/account" className={curAction === 'account' ? 'active' : ''}> <FaUser size={20}/> <span>Conta</span></a>
        </div>
    );
}