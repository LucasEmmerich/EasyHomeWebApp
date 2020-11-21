import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import SignInComponent from '../../Components/SignIn';
import UserHelper from '../../Helpers/UserHelper';

export default function SignIn() {
    const user = UserHelper.getSessionUser();

    if (user) window.location.href = "/"; 
    else {
        return (
            <section>
                <Header />
                <SignInComponent />
                <Footer />
            </section>
        );
    }
}