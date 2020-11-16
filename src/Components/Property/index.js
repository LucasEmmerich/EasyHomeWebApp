import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropertyModal from './PropertyModal';
import PropertyService from '../../Service/PropertyService';
import PropertyCard from '../Cards/PropertyCard';

export default function Property() {
    const [modal, setModal] = useState();

    const openModal = (p = null) => {
        setModal(<PropertyModal modalOpen={true} closeFunction={closeModal} Property={p} />);
    }

    const closeModal = () => {
        setModal(null);
        getPropertyList();
    }

    const deletePropHandler = async (propId) => {
        await PropertyService.delete(propId);
        getPropertyList();
    }

    const [propriedades, setPropriedades] = useState([]);
    const getPropertyList = () => {
        PropertyService.list().then(r => {setPropriedades(r.data)});
    }

    useEffect(() => {
        getPropertyList();
    }, []);

    return (
        <div style={{ width: '100vw', overflowY: 'scroll' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="showOnMobile m-1">Clique para editar</span>
                <Button variant='success' onClick={openModal} className="m-1">Novo</Button>
            </div>
            {
                propriedades.length > 0 ?
                    propriedades.map(p => (
                        <PropertyCard
                            Property={p}
                            key={p.Id}
                            onEdit={() => { openModal(p) }}
                            onDelete={() => { deletePropHandler(p.Id) }} />
                    ))
                    :
                    <div>
                        <h3 style={{ textAlign: 'center' }}>Sem Propriedades!</h3>
                        <h4 style={{ textAlign: 'center' }}>Cadastre sua primeira propriedade para visualizá-la!</h4>
                    </div>
            }
            {modal}
        </div>
    );
}