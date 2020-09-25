import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
const config = require('../../../../package.json').config;

export default function PropriedadeInfoWindowModal(props) {

  return (
    <Card>
      <Card.Header as="h5" style={{textAlign:'center'}}>Informações da Propriedade</Card.Header>
      <Card.Body>
        <Card.Title>{props.Propriedade.Descricao} - {props.Propriedade.Tipo}</Card.Title>
        <Card.Text><strong>{props.Propriedade.Tipo}</strong> registrada no endereço:<br/>{props.Propriedade.Endereco}</Card.Text>
        <br />
        <Card.Title>Registrada por:</Card.Title>
        <Card.Text>{props.Propriedade.NomeUsuario} - Pessoa {props.Propriedade.TipoUsuario}</Card.Text>
        <Card.Text style={{textAlign:'center'}}><Button>Ir à página da Propriedade <FaArrowRight/></Button></Card.Text>
      </Card.Body>
    </Card>
  );
}
