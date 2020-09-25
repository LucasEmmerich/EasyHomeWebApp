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
                <Header />
                <div style={{ height: '85vh' }}>
                    <SignUp />
                </div>
                <Footer />
            </div>
        );
    }
}