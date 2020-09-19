import React from 'react';
import Header from '../../Components/Header';
import SignUp from '../../Components/SignUp';
import Footer from '../../Components/Footer';

export default function Register() {
    const user = JSON.parse(sessionStorage.getItem('userInfo'));

    if (user) {
        window.location.href = "/";
    }
    else {
        return (
            <div>
                <div style={{ width: '100vw', height: '10vh' }}>
                    <Header />
                </div>
                <div style={{ width: '100vw', height: '80vh' }}>
                    <SignUp />
                </div>
                <div style={{ width: '100vw', height: '10vh' }}>
                    <Footer />
                </div>
            </div>
        );
    }
}