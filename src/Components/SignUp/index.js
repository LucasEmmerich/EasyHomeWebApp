import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import userService from '../../Service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Row, Col, InputGroup, Image } from 'react-bootstrap';
import NoUserImage from '../../assets/imgs/NoUserImage.jpg';
toast.configure();

export default function SignUp() {

    const [Name, setName] = useState('');
    const [Contact, setContact] = useState('');
    const [Email, setEmail] = useState('');
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const [Type, setType] = useState('Física');
    const [Document, setDocument] = useState('');
    
    const [ImageFile,setImageFile] = useState();
    const [ImgSrc,setImgSrc] = useState(NoUserImage);

    const onImageUpload = (event) => {
        event.preventDefault()
        let imageFile = event.target.files[0];
        setImgSrc(URL.createObjectURL(imageFile));
        setImageFile(imageFile);
    }

    const handleRegisterData = async (event) => {
        event.preventDefault();
        await userService.create({
            Name,
            Contact,
            Email,
            Login,
            Password,
            Document,
            Type
        },ImageFile);
        toast.success('Cadastrado! 😀');
    }

    return (
        <div className="d-flex justify-content-center flex-row" style={{ height: '79vh', paddingTop: '50px' }}>
            <Form className="w-50">
                <h1 className="text-center">EasyHome</h1>
                <Row>
                    <Col xl={4} className="d-flex justify-content-center">
                        <Image id='profileImage' style={{ width: '200px', height: '200px' }} roundedCircle src={ImgSrc}/>
                        <Button style={{ position: 'absolute', bottom: '20px', left: '30px' }} size='sm' onClick={()=>document.getElementById('fileSelect').click()}>Upload</Button>
                        <Form.File id='fileSelect' onChange={onImageUpload} style={{display:'none'}}/>
                    </Col>
                    <Col xl={8}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                value={Name}
                                onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={Email}
                                onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
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

                    </Col>
                </Row>
                <InputGroup style={{ marginBottom: '15px' }}>
                    <Form.Control
                        type="text"
                        placeholder="Telefone"
                        value={Contact}
                        onChange={e => setContact(e.target.value)} />
                    <Form.Control as="select"
                        placeholder="Tipo"
                        value={Type}
                        onChange={e => setType(e.target.value)} >
                        <option value="Física">Pessoa Física</option>
                        <option value="Jurídica">Pessoa Jurídica</option>
                    </Form.Control>
                    <Form.Control
                        type="text"
                        placeholder="Cpf/Cpnj"
                        value={Document}
                        onChange={e => setDocument(e.target.value)} />
                </InputGroup>
                <p className="text-center">
                    <Button variant='link' href="/login" size='sm'>Já tenho uma conta!</Button>
                    <Button variant='success' className="m-1" onClick={handleRegisterData}>Registrar <FaCheck/> </Button>
                </p>
            </Form>
        </div >
    );
}

