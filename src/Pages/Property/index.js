import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import PropertyComponent from '../../Components/Property';
import PanelSideBar from '../../Components/PanelSideBar';
import { getSessionUser } from '../../Helpers/UserHelper';

export default function Property() {
    const user = getSessionUser();

    if (user) {
        return (
            <div>
                <Header />
                <div style={{ display: 'flex',height: '85vh' }}>
                    <PanelSideBar/>
                    <PropertyComponent/>
                </div>
                <Footer />
            </div>
        );
    }
    else {
        window.location.href = "/login";
    }
}