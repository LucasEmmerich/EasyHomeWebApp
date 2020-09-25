import React from 'react';
import NoImage from '../../../assets/imgs/NoImage.png';
import { Card, ListGroup, ListGroupItem, ButtonGroup ,Button } from 'react-bootstrap';

export default function PropriedadeCard(props) {
    const propriedade = props.Propriedade;
    return (
        <Card>
            <Card.Header>
                <span className="h4">{propriedade.Descricao} - {propriedade.Tipo}</span>
                <ButtonGroup style={{ float: 'right' }}>
                    <Button variant="info" size='sm' onClick={props.onEdit}>Editar</Button>
                    <Button variant="danger" size='sm' onClick={props.onDelete}>Excluir</Button>
                </ButtonGroup>
            </Card.Header>
            <Card.Body>
                <Card.Text>{propriedade.Endereco}</Card.Text>
                <Card.Text>{propriedade.Informacoes}</Card.Text>
                <Card.Text className="text-muted">Last updated 3 mins ago</Card.Text>
            </Card.Body>
        </Card>
    );
}