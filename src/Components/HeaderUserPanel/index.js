import React from 'react';
import { FaUser, FaHome, FaSignInAlt, FaPowerOff } from 'react-icons/fa';
import {Button} from 'react-bootstrap';

export default function HeaderUserPanel() {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
        return (
            <div>
                <Button variant='success'  style={{fontWeight:'700'}} href="/perfil">{user.userInformation.Nome} <FaUser size={20} /> </Button>
                <Button variant='info' style={{fontWeight:'700',margin:'0px 3px 0px 3px'}} href="/painel">Painel do Usuário <FaHome size={20} /> </Button>
                <Button variant='secondary' style={{fontWeight:'700'}} href="/logout">Logout <FaPowerOff size={20} /> </Button>
            </div>
        );
    }
    else {
        return (
            <div>
                <Button className="m-1 btn btn-info font-weight-bold" href="/register"> Criar Conta </Button>
                <Button className="btn btn-success font-weight-bold" href="/login"> Logar <FaSignInAlt size={20} /> </Button>
            </div>
        );
    }
}