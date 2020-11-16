import React from 'react';
import Header from '../../Components/Header';
import SignUpComponent from '../../Components/SignUp';
import Footer from '../../Components/Footer';
import { getSessionUser } from '../../Helpers/UserHelper';

export default function Register() {
    const user = getSessionUser();

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