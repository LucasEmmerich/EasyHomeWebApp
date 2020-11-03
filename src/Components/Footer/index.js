import React from 'react';
import { FaLinkedin,FaGithub } from 'react-icons/fa';

export default function Header() {
    return (
        <footer className="footer sticky" style={{ backgroundColor:'#292b2c',height:'6vh'}}>
            <div className="d-flex justify-content-center">
                <a 
                className="m-2" 
                href={"https://www.linkedin.com/in/lucas-araujo-6213aa199"} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#2867B2',textDecoration:'none' }}>
                    <span style={{color:'white'}}>
                        LinkedIn
                    </span>
                    <i>
                        <FaLinkedin size={18} style={{marginBottom:'3px'}} />
                    </i>
                </a>
                <a 
                className="m-2" 
                href={"https://github.com/LucasEmmerich"} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'black',textDecoration:'none' }}>
                    <span 
                    style={{color:'white'}}>
                        GitHub
                    </span>
                    <i>
                        <FaGithub 
                        size={18} 
                        style={{marginBottom:'3px'}}
                        />
                    </i>
                </a>
            </div>
        </footer>
    );
}