import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Card, Button, Modal, Row, Col } from 'react-bootstrap';
import ChatService from '../../../Service/ChatService';

export default function PropertyInfoWindowModal(props) {
  const [Message, setMessage] = useState('');
  
  const propertyOwnerId = props.Property.UserID;

  const sendChat = async () => {
    let chat = {
      User_To_ID: propertyOwnerId,
      Message
    };
    await ChatService.addChat(chat);
  };

  return (
    <Modal
      show={props.isModalOpen}
      onHide={props.onClose}
      size='xl'>
      <Card>
        <Card.Header as="h5" style={{ textAlign: 'center' }}>Informações da Propriedade</Card.Header>
        <Card.Body>
          <Row>
            <Col xl={6}>
              <Card.Title>{props.Property.Description} - {props.Property.Type}</Card.Title>
              <Card.Text><strong>{props.Property.Type}</strong> registrada no endereço:<br />{props.Property.Address}</Card.Text>
              <br />
              <Card.Title>Registrada por:</Card.Title>
              <Card.Text>{props.Property.UserName} - Pessoa {props.Property.UserType}</Card.Text>
            </Col>
            <Col xl={6}>
              <h5 className="text-center">Envie uma mensagem ao proprietário</h5>
              <textarea value={Message} onChange={(e) => setMessage(e.target.value)} rows={6} style={{width:'100%'}}/>
              <p className="text-center"><Button variant='success' onClick={sendChat} >Enviar</Button></p>
            </Col>
          </Row>
          <Card.Text style={{ textAlign: 'center' }}><Button>Ir à página da Propriedade <FaArrowRight /></Button></Card.Text>
        </Card.Body>
      </Card>
    </Modal>
  );
}
