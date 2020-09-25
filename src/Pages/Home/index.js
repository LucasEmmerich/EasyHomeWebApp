import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Map from '../../Components/Map';

export default function Home() {
    return (
        <div>
            <div>
                <div>
                    <Header />
                    <div style={{ height: '85vh' }}>
                        <Map />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}