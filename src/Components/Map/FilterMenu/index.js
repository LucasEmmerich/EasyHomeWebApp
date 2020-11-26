import React, { Component } from 'react';
import { Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';

export default class FilterMenu extends Component {
    selectFilters = () => {
        let filters = {
            Types: [],
            SaleTypes: []
        }
        //type
        if (document.getElementById('checkCasa').checked) filters.Types.push('Casa');
        if (document.getElementById('checkApartamento').checked) filters.Types.push('Apartamento');
        if (document.getElementById('checkTerreno').checked) filters.Types.push('Terreno');
        if (document.getElementById('checkComercial').checked) filters.Types.push('Comercial');
        if (document.getElementById('checkRepública').checked) filters.Types.push('República');

        //saleType
        if (document.getElementById('checkVenda').checked) filters.SaleTypes.push('Venda');
        if (document.getElementById('checkAluguel').checked) filters.SaleTypes.push('Aluguel');

        this.props.onSelectFilters(filters);
    }

    render(){
        return (
            <div>
                <DropdownButton title={' Clique aqui para aplicar filtros'} >
                    <Form style={{ width: '248px' }}>
                        <p style={{ textAlign: 'center' }}><strong>Tipo</strong></p>
                        <div className="d-flex align-items-center">
                            <Form.Check type={'checkbox'} className="ml-4" id='checkCasa' defaultChecked/>
                            <span className="font-weight-light ml-1">Casa</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <Form.Check type={'checkbox'} className="ml-4" id='checkApartamento' defaultChecked/>
                            <span className="font-weight-light ml-1">Apartamento</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <Form.Check type={'checkbox'} className="ml-4" id='checkTerreno' defaultChecked/>
                            <span className="font-weight-light ml-1">Terreno</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <Form.Check type={'checkbox'} className="ml-4" id='checkComercial' defaultChecked/>
                            <span className="font-weight-light ml-1">Comercial</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <Form.Check type={'checkbox'} className="ml-4" id='checkRepública' defaultChecked/>
                            <span className="font-weight-light ml-1">República</span>
                        </div>
                        <Dropdown.Divider />
                        <p style={{ textAlign: 'center' }}><strong>Tipo de Acordo</strong></p>
                        <div className="d-flex align-items-center">
                            <Form.Check type={'checkbox'} className="ml-4" id='checkVenda' defaultChecked/>
                            <span className="font-weight-light ml-1">Venda</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <Form.Check type={'checkbox'} className="ml-4" id='checkAluguel' defaultChecked/>
                            <span className="font-weight-light ml-1">Aluguel</span>
                        </div>
                        <Dropdown.Divider />
                        <p className="m-0 text-center">
                            <Button size='sm' onClick={this.selectFilters} >
                                Aplicar
                            </Button>
                        </p>
                    </Form>
                </DropdownButton>
            </div>
        );
    }
}
