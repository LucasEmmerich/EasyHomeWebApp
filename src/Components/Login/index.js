import React, { useState } from 'react';
import UserService from '../../Service/UserService';
import './index.css';
import { FaArrowRight } from 'react-icons/fa';

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginData(event) {
        event.preventDefault();
        await UserService.login({
            Login: login,
            Senha: password
        });
    }
    return (
        <div className="d-flex justify-content-center flex-row" style={{ height: '79vh', paddingTop: '150px' }}>
            <form className="w-25">
                <h1 className="text-center">EasyHome</h1>
                <div className="form-group">
                    <input type="text" className="form-control" id="login" placeholder="Login" value={login} onChange={e=>setLogin(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="senha" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
                </div>
                <div className="row form-group">
                    <div className="col-md-6 form-check">
                        <input type="checkbox" className="form-check-input" id="checkLoginRemember" />
                        <label className="form-check-label" for="checkLoginRemember">Lembrar Login</label>
                    </div>
                    <a className="col-md-6 btn-link">Esqueceu a Senha?</a>
                </div>
                <hr className="my-4" />
                <p className="text-center">
                    <button type="submit" className="btn btn-primary" onClick={handleLoginData}>Entrar</button>
                </p>
            </form>
        </div>
    );
}