import React from 'react';
import { FaPowerOff, FaList } from 'react-icons/fa';
import { Image, Nav, Navbar } from 'react-bootstrap';
import NoUserImage from '../../assets/imgs/NoUserImage.jpg';
const config = require('../../../package.json').config;

export default function HeaderUserPanel() {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const userImage = user?.userInformation?.ProfileImageUrl ? config.dsvApiAddress + user?.userInformation?.ProfileImageUrl : NoUserImage;

    if (user) {
        return (
            <Navbar style={{ height: '11vh', width:'100%',backgroundColor:'#292b2c' }}>
                <Navbar.Brand href="/" style={{ color: 'white' }} >EasyHome</Navbar.Brand>
                <Nav className="mr-auto" href="/tutorial" style={{ color: 'white' }} > Tutorial </Nav>
                <Nav>
                    <Image className="mb-1" alt={user.userInformation.Name} roundedCircle src={userImage} style={{ width: '30px', height: '30px', margin: '5px' }} />
                    <Nav.Link href="/account" style={{ color: 'white' }}>{user.userInformation.Name}</Nav.Link>
                    <Nav.Link href="/property"><FaList color='lightblue' /></Nav.Link>
                    <Nav.Link href="/logout"><FaPowerOff color='red' /></Nav.Link>
                </Nav>
            </Navbar>
        );
    }
    else {
        return (
            <Navbar bg='dark' expand='lg'  style={{ height: '11vh', width:'100%'}}>
                <Navbar.Brand href="/" style={{ color: 'white' }} >EasyHome</Navbar.Brand>
                <Nav className="mr-auto" href="/tutorial" style={{ color: 'white' }} > Tutorial </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'white' }} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="ml-auto">
                        <Nav.Link href="/register" style={{ color: 'white' }}> Criar Conta </Nav.Link>
                        <Nav.Link href="/login" style={{ color: 'white' }}> Logar  </Nav.Link>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        )

    }
}
       
       
       