import React, { useState } from 'react';
import UserService from '../../Service/UserService';
import { FaArrowRight } from 'react-icons/fa';
import { Form, Button, Col } from 'react-bootstrap';
import NotificationHelper from '../../Helpers/NotificationHelper';

export default function SignIn() {
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');

    const [validated, setValidated] = useState(false);

    async function handleLoginData(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const loginObj = {
                Login,
                Password
            };
            const loginData = await UserService.login(loginObj);
            if (loginData.auth) {
                NotificationHelper.alertSuccess(`Bem Vindo!`);
                setTimeout(() => window.location.href = '', 1000);
            }
            else NotificationHelper.alertError(loginData.motivo);
        }
        
        setValidated(true);
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '86vh' }}>
            <Form style={{ width: '350px' }} noValidate validated={validated} onSubmit={handleLoginData}>
                <h1 className="text-center">EasyHome</h1>
                <Form.Row>
                    <Form.Group as={Col} md="12">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Login"
                            value={Login}
                            onChange={e => setLogin(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Informe o Login.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12">
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            value={Password}
                            onChange={e => setPassword(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Informe a Senha.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <div className="flex-center">
                    <Button variant="link" size='sm'> Esqueci minha senha </Button>
                    <Button variant="primary" size='sm' href="/register" style={{ marginRight: '5px' }}> Cadastrar </Button>
                    <Button type="submit" variant="success" size='sm'> Entrar <FaArrowRight /> </Button>
                </div>
            </Form>
        </div>
    );
}