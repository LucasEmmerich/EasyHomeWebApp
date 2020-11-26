import React from 'react';
import { FaPowerOff, FaList, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Image, Nav, Navbar } from 'react-bootstrap';
import NoUserImage from '../../assets/imgs/NoUserImage.jpg';
import UserHelper from '../../Helpers/UserHelper';
import { config } from '../../../package.json';

export default function HeaderUserPanel() {
    const session = UserHelper.getSession();

    if (session) {
        return (
            <Navbar style={{ height: '8vh', width: '100%', backgroundColor: '#292b2c' }}>
                <Navbar.Brand href="/" style={{ color: 'white' }} >EasyHome</Navbar.Brand>
                <Nav className="mr-auto" href="/tutorial" style={{ color: 'white' }} > Tutorial </Nav>
                <Nav>
                    <Image className="mb-1" alt={session.user.FirstName} roundedCircle src={session.user.ImageUrl} style={{ width: '30px', height: '30px', marginTop: '5px' }} />
                    <Nav.Link href="/account" style={{ color: 'white' }} ><span className="hideOnMobile">{session.user.FirstName}</span></Nav.Link>
                    <Nav.Link href="/property"><FaList color='lightblue' /></Nav.Link>
                    <Nav.Link href="/logout"><FaPowerOff color='red' /></Nav.Link>
                </Nav>
            </Navbar>
        );
    }
    else {
        return (
            <Navbar bg='dark' expand='lg' style={{ height: '8vh', width: '100%' }}>
                <Navbar.Brand href="/" style={{ color: 'white' }} >EasyHome</Navbar.Brand>
                <div className="d-flex" style={{ position: 'absolute', right: 0 }}>
                    <Nav.Link href="/register" style={{ color: 'white' }}>
                        <div className="flex-box d-flex">
                            <span className="m-1 font-weight-bold hideOnMobile">Registrar </span>
                            <FaUserPlus size={20}/>
                        </div>
                    </Nav.Link>
                    <Nav.Link href="/login" style={{ color: 'white' }}>
                        <div className="flex-box d-flex">
                            <span className="m-1 font-weight-bold hideOnMobile">Entrar </span>
                            <FaSignInAlt size={20}/>
                        </div>
                    </Nav.Link>
                </div>
            </Navbar>
        )
    }
}


