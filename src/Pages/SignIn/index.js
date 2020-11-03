import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import SignInComponent from '../../Components/SignIn';
import { getSessionUser } from '../../Helpers/UserHelper';

export default function SignIn() {

    const user = getSessionUser();
    if (user) {
        window.location.href = "/";
    }
    else {
        return (
            <div>
                <Header />
                <div style={{ height: '83vh'}}>
                    <SignInComponent />
                </div>
                <Footer />
            </div>
        );
    }
}