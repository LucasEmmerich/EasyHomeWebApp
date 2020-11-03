import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import './index.css';

export default function PropertyCard(props) {
    const property = props.Property;
    return (
        <div>
            <Card style={{ cursor: 'pointer',margin:'5px' }} 
                  className="cardHover"
                  onClick={props.onEdit}>
                <Card.Header>
                    <span className="text-break-default">{property.Description} - {property.Type}</span>
                </Card.Header>
                <Card.Body>
                    <div style={{ position: 'relative' }}>
                        <Card.Text>{property.Address}</Card.Text>
                        <Card.Text>{property.Informations}</Card.Text>
                        <Card.Text className="text-muted">Last updated 3 mins ago</Card.Text>
                    </div>
                    <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                        <Button
                            variant="danger"
                            size='sm'
                            onClick={props.onDelete}
                            style={{ display: 'flex', alignItems: 'center' }}>
                            <FaTrash size={18} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}