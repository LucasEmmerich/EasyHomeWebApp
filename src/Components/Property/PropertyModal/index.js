import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaSearch } from 'react-icons/fa';
import Marker from '../../Marker';
import PropertyService from '../../../Service/PropertyService';
import { toast } from 'react-toastify';
import { Modal, Form, FormControl, Col, Row, Button } from 'react-bootstrap';
const config = require('../../../../package.json').config;

export default function PropertyPanel(props) {
    const constructMarker = (obj) => {
        if (obj) {
            const objCoordinates = JSON.parse(JSON.parse(obj));
            let cordinates = objCoordinates.cordinates;
            return <Marker lat={cordinates.lat} lng={cordinates.lng} propType={Type} />
        }
        else return null;
    }

    const Id = props.Property?.Id ?? 0;
    const [Description, setDescription] = useState(props.Property?.Description ?? '');
    const [Type, setType] = useState(props.Property?.Type ?? '');
    const [Address, setAddress] = useState(props.Property?.Address ?? '');
    const [Informations, setInformations] = useState(props.Property?.Informations ?? '');
    const [currentMarker, setCurrentMarker] = useState(constructMarker(props.Property?.AreaJsonConfig));
    const [imageFiles, setImageFiles] = useState([]);

    const [selectedFileList, setSelectedFileList] = useState([]);


    const handlePropriedadeData = async (event) => {
        event.preventDefault();
        let areaJsonConfig = {
            type: 'point',
            cordinates: { lat: currentMarker.props.lat, lng: currentMarker.props.lng }
        };

        const obj = {
            Id,
            Type,
            Description,
            Address,
            Informations,
            AreaJsonConfig: JSON.stringify(areaJsonConfig)
        };

        if (Id) {
            const response = await PropertyService.update(obj);

            let returnedId = response.data.Property_ID;

            await PropertyService.uploadPropertyImages(returnedId, imageFiles);

        }
        else {
            const response = await PropertyService.create(obj);

            let returnedId = response.Property_ID;
            
            await PropertyService.uploadPropertyImages(returnedId, imageFiles);
        }

        toast.success('Sucesso!');

        props.closeFunction();
    }

    const [currentCenter, setCurrentCenter] = useState({ lat: -15.826691, lng: -47.92182039999999 });
    const [currentZoom, setCurrentZoom] = useState(3);

    const searchAddress = async () => {
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(Address.replace(" ", "+"))}&key=${config.googleMapsApiKey}`);
        let result = (await response.json()).results[0];
        if (result) {
            setCurrentCenter(result.geometry.location);
            setCurrentZoom(18);
            setCurrentMarker(<Marker lat={result.geometry.location.lat} lng={result.geometry.location.lng} propType={Type} />)
        }
        else {
            toast.warning(
                <div>
                    {'Busca de endereço falhou!'}
                    <br />
                    {'Seja mais específico, escreva todo o endereço!'}
                    <br />
                    {'Ex: Rua Brasil 103 Varginha RJ.'}
                </div>);
        }
    };

    const showSelectedFileList = (files) => {
        let list = [];
        for (const file of files) {
            list.push(<div><img alt={file.name} style={{ width: '50px', height: '50px' }} src={URL.createObjectURL(file)} /><span>{file.name}</span><br /></div>);
        }
        setSelectedFileList(list);
    };

    return (
        <Modal 
        show={props.modalOpen} 
        onHide={props.closeFunction} 
        size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Propriedade</Modal.Title>
            </Modal.Header>
            <Form style={{margin:'5px'}}>
                <Row>
                    <Col xl={9} style={{ marginBottom: '5px' }}>
                        <FormControl
                            placeholder="Descreva a propriedade."
                            value={Description}
                            onChange={e => setDescription(e.target.value)} />
                    </Col>
                    <Col xl={3} style={{ marginBottom: '5px' }}>
                        <FormControl as="select" value={Type} onChange={e => setType(e.target.value)}>
                            <option value="">Selecione um Tipo</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Terreno">Terreno</option>
                            <option value="Comercial">Comercial</option>
                            <option value="República">República</option>
                        </FormControl>
                    </Col>
                    <Col xl={11} style={{ marginBottom: '5px' }}>
                        <FormControl
                            placeholder="Forneça-nos o endereço. Coloque o nome da rua, do bairro e da cidade ajudar na pesquisa! 😀"
                            value={Address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </Col>
                    <Col xl={1} style={{ marginBottom: '5px' }}>
                        <Button variant='primary' onClick={searchAddress}><FaSearch size={16} /></Button>
                    </Col>
                    <Col xl={6} style={{ marginBottom: '5px' }}>
                        <FormControl rows={5}
                            as="textarea"
                            value={Informations}
                            onChange={e => setInformations(e.target.value)}
                            placeholder="Informe aqui tudo o que você julga importante!&#10;Ex: 2 padarias e 1 pizzaria a 100 metros.&#10;Bairro contêm 1 hospital. &#10;Venda seu peixe! 🤣" />
                        <Form.File multiple accept="image/*" onChange={(e) => { setImageFiles(e.target.files); showSelectedFileList(e.target.files); }} style={{ marginTop: '5px' }} />
                        <div style={{ marginTop: '5px', overflowY: 'scroll', height: '150px' }}>
                            {selectedFileList}
                        </div>
                    </Col>
                    <Col xl={6}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: config.googleMapsApiKey, language: "pt-BR" }}
                            zoom={currentZoom}
                            center={currentCenter}
                            options={{ streetViewControl: true }}>
                            {currentMarker}
                        </GoogleMapReact>
                    </Col>
                </Row>
            </Form>
            <Modal.Footer>
                <Button variant='danger' onClick={props.closeFunction}>Fechar</Button>
                <Button variant='primary' onClick={handlePropriedadeData}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}