import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Modal from 'react-modal';
import ModalPropriedade from './ModalPropriedade';
import PropriedadeCard from '../Cards/PropriedadeCard';
import PropriedadeService from '../../Service/PropriedadeService';
export default function PropriedadePainel() {

    const customStyles = { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' } };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const newPropOpenModal = () => {
        setIsModalOpen(true);
    }

    const [propObj, setPropObj] = useState(null);
    const editPropOpenModal = (p) => {
        setPropObj(p);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setPropObj(null);
        getPropriedadesList();
    }

    const deletePropHandler = async (propId) => {
        await PropriedadeService.delete(propId);
        getPropriedadesList();
    }


    const [propriedades, setPropriedades] = useState([]);
    const getPropriedadesList = () => {
        PropriedadeService.list().then(r => setPropriedades(r.data));
    }

    useEffect(() => { getPropriedadesList() }, []);

    return (
        <div>
            <p style={{textAlign:'right'}}>
            <ButtonGroup style={{marginRight:'10px'}}>
                <Button variant='success' onClick={newPropOpenModal}>Novo</Button>
            </ButtonGroup>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} shouldCloseOnEsc={true} style={customStyles}>
                <ModalPropriedade closeFunction={closeModal} Propriedade={propObj} />
            </Modal>

            </p>
            {
                propriedades.length > 0 ?
                    propriedades.map(p => (<PropriedadeCard Propriedade={p} key={p.Id} onEdit={() => { editPropOpenModal(p) }} onDelete={() => { deletePropHandler(p.Id) }} />))
                    :
                    <div style={{ width: '95vw', height: '70vh' }}>
                        <h3 style={{textAlign:'right'}}>Sem Propriedades!</h3>
                        <h4 style={{textAlign:'right'}}>Cadastre sua primeira propriedade para visualizá-la!</h4>
                    </div>
            }
        </div>
    );
}