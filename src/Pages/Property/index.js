import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import PropertyComponent from '../../Components/Property';
import PanelSideBar from '../../Components/PanelSideBar';
import UserHelper from '../../Helpers/UserHelper';

export default function Property() {
    const user = UserHelper.getSession();

    if (user) {
        return (
            <div>
                <Header />
                <div style={{ display: 'flex', height: '86vh' }}>
                    <PanelSideBar />
                    <PropertyComponent />
                </div>
                <Footer />
            </div>
        );
    }
    else window.location.href = "/";
}