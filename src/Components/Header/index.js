import React from 'react';
import HeaderUserPanel from '../HeaderUserPanel';
import { Nav, Navbar } from 'react-bootstrap';

export default function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" style={{height:'8vh'}}>
                <Navbar.Brand href="/">EasyHome</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Tutorial</Nav.Link>
                </Nav>
                <Nav inline>
                    <HeaderUserPanel />
                </Nav>
            </Navbar>
        </header>
    );
}