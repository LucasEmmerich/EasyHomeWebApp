import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import userService from '../../Service/UserService';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Row, Col, InputGroup, Image } from 'react-bootstrap';
import './index.css';
import NoUserImage from '../../assets/imgs/NoUserImage.jpg';

export default function SignUp() {

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Contact, setContact] = useState('');
    const [Email, setEmail] = useState('');
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const [Type, setType] = useState('Física');

    const [Document, setDocument] = useState('');

    const [ImageFile, setImageFile] = useState();
    const [ImgSrc, setImgSrc] = useState(NoUserImage);

    const [validated, setValidated] = useState(false);

    const onImageUpload = (event) => {
        event.preventDefault()
        let imageFile = event.target.files[0];
        setImgSrc(URL.createObjectURL(imageFile));
        setImageFile(imageFile);
    }

    const handleRegisterData = async (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            await userService.create({
                FirstName,
                LastName,
                Contact,
                Email,
                Login,
                Password,
                Document,
                Type
            }, ImageFile);
        }
        setValidated(true);
    }

    return (
        <Form style={{ padding: '25px', height: '86vh' }} noValidate validated={validated} onSubmit={handleRegisterData}>
            <h1 className="text-center">EasyHome</h1>
            <Row>
                <Col lg={4} className="d-flex justify-content-center">
                    <Image id='profileImage' style={{ width: '200px', height: '200px' }} roundedCircle src={ImgSrc} />
                    <Button style={{ position: 'absolute', bottom: '20px', left: '30px' }} size='sm' onClick={() => document.getElementById('fileSelect').click()}>Upload</Button>
                    <Form.File id='fileSelect' onChange={onImageUpload} style={{ display: 'none' }} />
                </Col>
                <Col lg={8}>
                    <Form.Group style={{ display: 'flex' }}>
                        <Form.Control
                            required
                            maxLength={25}
                            type="text"
                            placeholder="Nome"
                            size='sm'
                            value={FirstName}
                            onChange={e => setFirstName(e.target.value)} />
                        <Form.Control
                            required
                            type="text"
                            maxLength={25}
                            placeholder="Sobrenome"
                            size='sm'
                            value={LastName}
                            onChange={e => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            required
                            maxLength={50}
                            type="email"
                            placeholder="Email"
                            size='sm'
                            value={Email}
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control
                                required
                                type="text"
                                minLength={4}
                                maxLength={20}
                                placeholder="Login"
                                size='sm'
                                value={Login}
                                onChange={e => setLogin(e.target.value)} />
                            <Form.Control
                                required
                                type="password"
                                minLength={4}
                                maxLength={20}
                                placeholder="Password"
                                size='sm'
                                value={Password}
                                onChange={e => setPassword(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <InputGroup style={{ marginBottom: '15px' }}>
                <Form.Control
                    type="text"
                    maxLength={11}
                    placeholder="Telefone"
                    value={Contact}
                    size='sm'
                    onChange={e => setContact(e.target.value)} >
                </Form.Control>
                <Form.Control
                    as="select"
                    required
                    placeholder="Tipo"
                    value={Type}
                    size='sm'
                    onChange={ e => {
                        setType(e.target.value);
                        let documentInput = document.querySelector('#document-input');
                        if (e.target.value === 'Física') {
                            setDocument('');
                            documentInput.placeholder = 'CPF';  
                            documentInput.setAttribute('maxlength',11);
                        }
                        else {
                            setDocument('');
                            documentInput.placeholder = 'CNPJ'; 
                            documentInput.setAttribute('maxlength',14);
                        }
                            
                    }}>
                    <option value="Física">P. Física</option>
                    <option value="Jurídica">P. Jurídica</option>
                </Form.Control>
                <Form.Control
                    required
                    type="number"
                    size='sm'
                    maxLength={11}
                    placeholder='CPF'
                    id="document-input"
                    value={Document}
                    onChange={e => setDocument(e.target.value)} />
            </InputGroup>
            <p className="text-center">
                <Button variant='link' href="/login" size='sm'>Já tenho uma conta!</Button>
                <Button variant='success' size='sm' className="m-1" type="submit">Registrar <FaCheck /> </Button>
            </p>
        </Form>
    );
}

