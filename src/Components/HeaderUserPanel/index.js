import React from 'react';
import './index.css';
import { FaUser, FaHome, FaSignInAlt, FaPowerOff } from 'react-icons/fa';

export default function HeaderUserPanel() {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
        return (
            <div>
                <a className="btn btn-success font-weight-bold" href="/perfil">{user.userInformation.Nome} <FaUser size={20} /> </a>
                <a className="m-1 btn btn-info font-weight-bold" href="/painel">Painel do Usuário <FaHome size={20} /> </a>
                <a className="btn btn-secondary font-weight-bold" href="/logout">Logout <FaPowerOff size={20} /> </a>
            </div>
        );
    }
    else {
        return (
            <div>
                <a className="m-1 btn btn-info font-weight-bold" href="/register"> Criar Conta </a>
                <a className="btn btn-success font-weight-bold" href="/login"> Logar <FaSignInAlt size={20} /> </a>
            </div>
        );
    }
}