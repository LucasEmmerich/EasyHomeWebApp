import React from 'react';
import { Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';

export default function FilterMenu(props) {
    const selectFilters = () => {
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

        props.onSelectFilters(filters);
    }

    return (
        <div>
            <DropdownButton title={' Clique aqui para aplicar filtros'} >
                <Form style={{ width: '248px' }}>
                    <p style={{ textAlign: 'center' }}><strong>Tipo</strong></p>
                    <div style={{display:'flex'}}>
                        <Form.Check type={'checkbox'} style={{marginLeft:'15px'}} id='checkCasa' defaultChecked/>
                        <span style={{margin:'2px'}}>Casa</span>
                    </div>
                    <div style={{display:'flex'}}>
                        <Form.Check type={'checkbox'} style={{marginLeft:'15px'}} id='checkApartamento' defaultChecked/>
                        <span style={{margin:'2px'}}>Apartamento</span>
                    </div>
                    <div style={{display:'flex'}}>
                        <Form.Check type={'checkbox'} style={{marginLeft:'15px'}} id='checkTerreno' defaultChecked/>
                        <span style={{margin:'2px'}}>Terreno</span>
                    </div>
                    <div style={{display:'flex'}}>
                        <Form.Check type={'checkbox'} style={{marginLeft:'15px'}} id='checkComercial' defaultChecked/>
                        <span style={{margin:'2px'}}>Comercial</span>
                    </div>
                    <div style={{display:'flex'}}>
                        <Form.Check type={'checkbox'} style={{marginLeft:'15px'}} id='checkRepública' defaultChecked/>
                        <span style={{margin:'2px'}}>República</span>
                    </div>
                    <Dropdown.Divider />
                    <p style={{ textAlign: 'center' }}><strong>Tipo de Acordo</strong></p>
                    <div style={{display:'flex'}}>
                        <Form.Check type={'checkbox'} style={{marginLeft:'15px'}} id='checkVenda' defaultChecked/>
                        <span style={{margin:'2px'}}>Venda</span>
                    </div>
                    <div style={{display:'flex'}}>
                        <Form.Check type={'checkbox'} style={{marginLeft:'15px'}} id='checkAluguel' defaultChecked/>
                        <span style={{margin:'2px'}}>Aluguel</span>
                    </div>
                    <Dropdown.Divider />
                    <p style={{ textAlign: 'center', margin: '0' }}><Button size='sm' onClick={() => selectFilters()} >Aplicar</Button></p>
                </Form>
            </DropdownButton>
        </div>
    );
}
