import React from 'react';
import HeaderUserPanel from '../HeaderUserPanel';
import './index.css';

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">Easy Home</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Quero achar minha Casa!</a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <HeaderUserPanel/>
                    </div>
                </div>
            </nav>
        </header>
    );
}