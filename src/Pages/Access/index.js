import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Login from '../../Components/Login';

export default function Access() {

    const user = JSON.parse(localStorage.getItem('userInfo'));

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
                    <Login />
                </div>
                <div style={{ width: '100vw', height: '10vh' }}>
                    <Footer />
                </div>
            </div>
        );
    }
}