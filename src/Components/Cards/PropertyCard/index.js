import React from 'react';
import { Card, ButtonGroup, Button } from 'react-bootstrap';

export default function PropertyCard(props) {
    const property = props.Property;
    return (
        <div>
            <Card>
                <Card.Header>
                    <span className="h4">{property.Description} - {property.Type}</span>
                    <ButtonGroup style={{ float: 'right' }}>
                        <Button variant="info" size='sm' onClick={props.onEdit}>Editar</Button>
                        <Button variant="danger" size='sm' onClick={props.onDelete}>Excluir</Button>
                    </ButtonGroup>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{property.Address}</Card.Text>
                    <Card.Text>{property.Informations}</Card.Text>
                    <Card.Text className="text-muted">Last updated 3 mins ago</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}