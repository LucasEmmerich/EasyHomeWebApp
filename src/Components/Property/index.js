import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropertyModal from './PropertyModal';
import PropertyService from '../../Service/PropertyService';
import PropertyCard from '../Cards/PropertyCard';

export default function Property() {
    const [modal,setModal] = useState(null);

    //#region modalFunctions
    const newPropOpenModal = () => {
        setModal(<PropertyModal modalOpen={true} closeFunction={closeModal} Property={null} />);
    }
    const editPropOpenModal = (p) => {
        setModal(<PropertyModal modalOpen={true} closeFunction={closeModal} Property={p} />);
    }
    const closeModal = () => {
        setModal(null);
        getPropertyList();
    }
    //#endregion

    

    const deletePropHandler = async (propId) => {
        await PropertyService.delete(propId);
        getPropertyList();
    }

    const [propriedades, setPropriedades] = useState([]);
    const getPropertyList = () => {
        PropertyService.list().then(r => setPropriedades(r.data));
    }

    useEffect(() => { getPropertyList(); }, []);

    return (
        <div style={{ width: '100%' }}>
            <p style={{ textAlign: 'right' }}>
                <Button variant='success' onClick={newPropOpenModal} style={{ margin: '10px' }}>Novo</Button>
                {modal}
            </p>
            {
                propriedades.length > 0 ?
                    propriedades.map(p => (
                    <PropertyCard 
                    Property={p} 
                    key={p.Id} 
                    onEdit={() => { editPropOpenModal(p) }} 
                    onDelete={() => { deletePropHandler(p.Id) }} />
                    ))
                    :
                    <div>
                        <h3 style={{ textAlign: 'center' }}>Sem Propriedades!</h3>
                        <h4 style={{ textAlign: 'center' }}>Cadastre sua primeira propriedade para visualizá-la!</h4>
                    </div>
            }
        </div>
    );
}