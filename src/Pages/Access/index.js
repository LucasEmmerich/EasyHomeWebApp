import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Login from '../../Components/Login';
import { getUser } from '../../Helpers/UserHelper';

export default function Access() {

    const user = getUser();
    console.log('dale')
    if (user) {
        window.location.href = "/";
    }
    else {
        return (
            <div>
                <Header />
                <div style={{height: '85vh' }}>
                    <Login />
                </div>
                <Footer />
            </div>
        );
    }
}