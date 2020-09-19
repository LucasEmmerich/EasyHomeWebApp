import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Map from '../../Components/Map';

export default function Home() {
    return (
        <div>
        <div>
            <div>
                <div style={{ width: '100vw', height: '10vh' }}>
                    <Header />
                </div>
                <div style={{ width: '100vw', height: '80vh' }}>
                    <Map />
                </div>
                <div style={{ width: '100vw', height: '10vh' }}>
                    <Footer />
                </div>
            </div>
        </div>
        </div>
    );
}