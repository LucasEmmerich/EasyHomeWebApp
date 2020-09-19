import React, { useState } from 'react';
import './index.css';
import { FaSignInAlt } from 'react-icons/fa';
import userService from '../../Service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function SignUp() {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [tipo, setTipo] = useState('Física');
    const [cpfCpnj, setCpfCpnj] = useState('');

    const handleRegisterData = async (event) => {
        event.preventDefault();
        await userService.create({
            Nome: name,
            Contato: phone,
            Email: email,
            Login: login,
            Senha: password,
            Documento: cpfCpnj,
            Tipo: tipo
        });
        toast.success('Cadastrado! 😀');
    }

    return (
        <div className="d-flex justify-content-center flex-row" style={{ height: '79vh', paddingTop: '50px' }}>
            <form className="w-50">
                <h1 className="text-center">EasyHome</h1>
                <div className="form-group">
                    <input placeholder="Nome" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="row">
                    <div className="form-group col-md-4">
                        <input  placeholder="Telefone" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className="form-group col-md-4">
                        <select className="form-control form-control-md" value={tipo} onChange={e => setTipo(e.target.value)}>
                            <option value="Física">Física</option>
                            <option value="Jurídica">Jurídica</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <input  placeholder="Cpf/Cpnj" className="form-control" value={cpfCpnj} onChange={e => setCpfCpnj(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="login" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="senha" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <hr className="my-4" />
                <p className="text-center">
                    <button type="submit" className="btn btn-success m-1" onClick={handleRegisterData}>Registrar</button>
                    <a type="submit" className="btn btn-primary" href="/login">Já tenho uma conta! <FaSignInAlt size={16}/></a>
                </p>
            </form>
        </div>
    );
}

