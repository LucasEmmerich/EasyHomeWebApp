import React from 'react';
import './index.css';
import { FaTwitter, FaTwitch, FaInstagram } from 'react-icons/fa';

export default function Header() {
    return (
        <footer className="footer sticky" >
            <div className="d-flex justify-content-center">
                <a className="m-2" href={"http://google.com"} target="_blank" rel="noopener noreferrer" style={{ color: '#1DA1F2' }}>
                    Twitter <i> <FaTwitter size={16} /> </i>
                </a>
                <a className="m-2" href={"http://google.com"} target="_blank" rel="noopener noreferrer" style={{ color: '#6441a5' }}>
                    Twitch <i> <FaTwitch size={16} /> </i>
                </a>
                <a className="m-2" href={"http://google.com"} target="_blank" rel="noopener noreferrer" style={{ color: '#C13584' }}>
                    Instagram <i> <FaInstagram size={16} /> </i>
                </a>
            </div>
        </footer>
    );
}