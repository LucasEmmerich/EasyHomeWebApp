import React from 'react';
import { Dropdown,Button } from 'react-bootstrap';

export default function PainelUsuarioSideBar() {
    return (
        <Dropdown>
        <Button>Home</Button>
            <Button style={{borderRadius: '0 !important;'}}>Home</Button>
            <Button>Home</Button>
            <Button>Home</Button>
            <Button>Home</Button>
            <Button>Home</Button>
        </Dropdown>
    );
}