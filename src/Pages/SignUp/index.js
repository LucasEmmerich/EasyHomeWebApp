import React from 'react';
import Header from '../../Components/Header';
import SignUpComponent from '../../Components/SignUp';
import Footer from '../../Components/Footer';
import UserHelper from '../../Helpers/UserHelper';

export default function Register() {
    const user = UserHelper.getSessionUser();

    if (user) window.location.href = "/"; 
    else {
        return (
            <section>
                <Header />
                <SignUpComponent />
                <Footer />
            </section>
        );
    }
}