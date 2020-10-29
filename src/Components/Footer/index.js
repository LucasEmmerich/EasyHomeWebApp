import React from 'react';
import { FaTwitter, FaTwitch, FaInstagram } from 'react-icons/fa';

export default function Header() {
    return (
        <footer className="footer sticky" style={{height:'7vh', backgroundColor:'#292b2c'}}>
            <div className="d-flex justify-content-center">
                <a className="m-2" href={"http://google.com"} target="_blank" rel="noopener noreferrer" style={{ color: '#1DA1F2' }}>
                <span style={{color:'white'}}>Twitter </span> <i><FaTwitter size={16} /> </i>
                </a>
                <a className="m-2" href={"http://google.com"} target="_blank" rel="noopener noreferrer" style={{ color: '#6441a5' }}>
                <span style={{color:'white'}}>Twitch </span> <i><FaTwitch size={16} /> </i>
                </a>
                <a className="m-2" href={"http://google.com"} target="_blank" rel="noopener noreferrer" style={{ color: '#C13584' }}>
                    <span style={{color:'white'}}>Instagram </span><i><FaInstagram size={16} /> </i>
                </a>
            </div>
        </footer>
    );
}