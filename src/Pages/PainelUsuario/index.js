import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import PropriedadePainel from '../../Components/PropriedadePainel';
import './index.css'
export default function PainelUsuario() {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
        return (
            <div>
                <div style={{ width: '100vw', height: '10vh' }}>
                    <Header />
                </div>
                <div style={{ width: '100vw', height: '80vh' }}>
                    <PropriedadePainel />
                </div>
                <div style={{ width: '100vw', height: '10vh' }}>
                    <Footer />
                </div>
            </div>
        );
    }
    else {
        window.location.href = "/login";
    }
}