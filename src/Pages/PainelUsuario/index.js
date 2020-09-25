import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import PropriedadePainel from '../../Components/PropriedadePainel';
export default function PainelUsuario() {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
        return (
            <div>
                <Header />
                <div style={{ height: '85vh' }}>
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