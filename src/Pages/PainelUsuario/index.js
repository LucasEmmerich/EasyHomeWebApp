import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import PropriedadePainel from '../../Components/PropriedadePainel';
import PainelUsuarioSideBar from '../../Components/PainelUsuarioSideBar';
import { getUser } from '../../Helpers/UserHelper';

export default function PainelUsuario() {
    const user = getUser();

    if (user) {
        return (
            <div>
                <Header />
                <div style={{ display: 'flex',height: '85vh' }}>
                    <PainelUsuarioSideBar />
                    <PropriedadePainel />
                </div>
                <Footer />
            </div>
        );
    }
    else {
        window.location.href = "/login";
    }
}