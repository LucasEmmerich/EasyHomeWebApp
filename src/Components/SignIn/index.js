import React, { useState } from 'react';
import UserService from '../../Service/UserService';
import { FaArrowRight } from 'react-icons/fa';
import { Form, Button, ButtonGroup } from 'react-bootstrap';

export default function SignIn() {
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');

    async function handleLoginData(event) {
        event.preventDefault();
        await UserService.login({
            Login,
            Password
        });
    }
    return (
        <div className="flex-center">
            <Form style={{ width: '350px', height: '10vh', marginTop: '150px'  }}>
                <h1 className="text-center">EasyHome</h1>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Login"
                        value={Login}
                        onChange={e => setLogin(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={Password}
                        onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <div className="flex-center">
                    <ButtonGroup>
                        <Button variant="primary" size='sm' href="/register" style={{ marginRight: '3px' }}> Cadastre-se </Button>
                        <Button variant="success" size='sm' onClick={handleLoginData}> Entrar <FaArrowRight /> </Button>
                    </ButtonGroup>
                </div>
            </Form>
        </div>
    );
}