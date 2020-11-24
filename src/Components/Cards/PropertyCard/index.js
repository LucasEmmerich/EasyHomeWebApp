import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import './index.css';

const PropertyCard = class PropertyCard extends Component {
    render() {
        return (
            <Card style={{ cursor: 'pointer', margin: '5px' }} className="cardHover">
                <div onClick={this.props.onEdit} style={{ position: 'relative' }}>
                    <Card.Header>
                        <span className="text-break-default">{this.props.Property.Description} - {this.props.Property.Type}</span>
                    </Card.Header>
                    <Card.Body >
                            <Card.Text>{this.props.Property.Address}</Card.Text>
                            <Card.Text>{this.props.Property.Informations}</Card.Text>
                            <Card.Text className="text-muted">Última atualização: {this.props.Property.created_at}</Card.Text>
                    </Card.Body>
                </div>
                <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                    <Button
                        variant="danger"
                        size='sm'
                        onClick={this.props.onDelete}
                        style={{ display: 'flex', alignItems: 'center' }}>
                        <FaTrash size={18} />
                    </Button>
                </div>
            </Card>
        );
    }
}

export default PropertyCard;