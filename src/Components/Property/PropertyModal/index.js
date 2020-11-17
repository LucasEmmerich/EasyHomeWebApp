import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaSearch, FaFileUpload, FaSave } from 'react-icons/fa';
import Marker from '../../Marker';
import PropertyService from '../../../Service/PropertyService';
import { Modal, Form, FormControl, Button, Col } from 'react-bootstrap';
import MapService from '../../../Service/MapService';
import './index.css';
import NotificationHelper from '../../../Helpers/NotificationHelper';
import { useEffect } from 'react';
const config = require('../../../../package.json').config;

export default function PropertyPanel(props) {
    const Id = props.Property?.Id ?? 0;
    const [Description, setDescription] = useState(props.Property?.Description ?? '');
    const [Type, setType] = useState(props.Property?.Type ?? 'Casa');
    const [SaleType, setSaleType] = useState(props.Property?.SaleType ?? 'Aluguel');
    const [Address, setAddress] = useState(props.Property?.Address ?? '');
    const [Informations, setInformations] = useState(props.Property?.Informations ?? '');
    const [currentMarker, setCurrentMarker] = useState(undefined);

    const [imageFiles, setImageFiles] = useState([]);
    const [imagesCounter, setImagesCounter] = useState(0);

    const [validated, setValidated] = useState(false);

    useEffect( () => {
        const obj = props.Property?.AreaJsonConfig;
        const imagesSrc = props.Property?.Images;

        if (obj) {
            const objCoordinates = JSON.parse(JSON.parse(obj));
            let cordinates = objCoordinates.cordinates;
            setCurrentMarker(<Marker lat={cordinates.lat} lng={cordinates.lng} propType={Type} />);
        }
        if (imagesSrc) setImagesCounter(imagesSrc.length); 
        // eslint-disable-next-line 
    },[])


    async function handleSubmit(event) {
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            if (!currentMarker) {
                NotificationHelper.alertWarning('Pesquise seu endereço e confirme o local apartir da marcação no mapa.')
                return;
            }

            const areaJsonConfig = {
                type: 'point',
                cordinates: { lat: currentMarker.props.lat, lng: currentMarker.props.lng }
            };

            const obj = {
                Id,
                Type,
                SaleType,
                Description,
                Address,
                Informations,
                AreaJsonConfig: JSON.stringify(areaJsonConfig)
            };

            let responseData;

            if (Id) responseData = await PropertyService.update(obj);
            else responseData = await PropertyService.create(obj);

            if (imageFiles.length > 0) await PropertyService.uploadPropertyImages(responseData.Property_ID, imageFiles);

            NotificationHelper.alertSuccess('Propriedade salva!')

            props.closeFunction();
        }

        setValidated(true);
    }

    const [currentCenter, setCurrentCenter] = useState({ lat: -15.826691, lng: -47.92182039999999 });
    const [currentZoom, setCurrentZoom] = useState(3);

    async function searchAddress() {
        let results = await MapService.searchAddressOnMaps(Address);
        let result = results[0]; //best match
        if (result) {
            setCurrentCenter(result.geometry.location);
            setCurrentZoom(18);
            setCurrentMarker(<Marker lat={result.geometry.location.lat} lng={result.geometry.location.lng} propType={Type} />)
        }
        else NotificationHelper.alertInformation('Busca de endereço falhou! Seja mais específico, escreva todo o endereço! Ex: Rua Brasil 103 Varginha RJ.');
    };


    return (
        <Modal
            show={props.modalOpen}
            onHide={props.closeFunction}
            dialogClassName="fullscreen-modal">
            <Modal.Header closeButton style={{ padding: '3px' }}>
                {
                    props.Property?.Id ?
                        <span style={{ fontSize: '18px', fontWeight: '700' }}>
                            Propriedade - Códº {props.Property?.Id}
                        </span>
                        :
                        <span style={{ fontSize: '18px', fontWeight: '700' }}>
                            Nova Propriedade
                    </span>
                }
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="12">
                        <div className="map">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: config.googleMapsApiKey, language: "pt-BR" }}
                                zoom={currentZoom}
                                center={currentCenter}
                                options={{ streetViewControl: true }}>
                                {currentMarker}
                            </GoogleMapReact>
                            <FormControl
                                required
                                placeholder="Descreva a propriedade."
                                maxLength={40}
                                minLength={3}
                                value={Description}
                                onChange={e => setDescription(e.target.value)}
                                className="prop-name-div"
                                size='sm' />
                            <Form.Group className="d-flex select-prop-type-div">
                                <FormControl
                                    required
                                    as="select"
                                    value={Type}
                                    onChange={e => setType(e.target.value)}
                                    size='sm'>
                                    <option value="Casa">Casa</option>
                                    <option value="Apartamento">Apartamento</option>
                                    <option value="Terreno">Terreno</option>
                                    <option value="Comercial">Comercial</option>
                                    <option value="República">República</option>
                                </FormControl>
                                <FormControl
                                    required
                                    as="select"
                                    value={SaleType}
                                    onChange={e => setSaleType(e.target.value)}
                                    size='sm'>
                                    <option value="Aluguel">Aluguel</option>
                                    <option value="Venda">Venda</option>
                                </FormControl>
                            </Form.Group>
                            <div className="input-group-search-div">
                                <FormControl
                                    required
                                    placeholder="Pesquisar endereço..."
                                    value={Address}
                                    onChange={e => setAddress(e.target.value)}
                                    size='sm' />
                                <Button variant='primary' style={{ padding: '3.5px', width: '60px' }} size='sm' onClick={searchAddress}><FaSearch size={16} /></Button>
                            </div>
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12">
                        <FormControl
                            required
                            rows={4}
                            as="textarea"
                            value={Informations}
                            onChange={e => setInformations(e.target.value)}
                            size='sm'
                            placeholder="Informe aqui tudo o que você julga importante!&#10;Ex:&#10;Um supermercado ao lado;&#10;Perto de um hospital..." />
                    </Form.Group>
                </Form.Row>
                <Form.Row style={{ position: 'relative' }}>
                    <Form.Group as={Col} md="12">
                        <div className="text-center">
                            <label className="custom-file-upload" style={{ marginLeft: '5px' }}>
                                <Form.File
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        setImageFiles(e.target.files);
                                    }} />
                                <FaFileUpload size={16} />
                            </label>
                            <span style={{ fontWeight: '700', padding: '0px 0px 10px 10px' }}>{imagesCounter} arquivos.</span>
                        </div>
                    </Form.Group>
                    <Button variant='primary' type="submit" style={{ position: 'absolute', right: '10px' }}>
                        <div className="flex-center">
                            <FaSave size={16} />
                            <span className="font-weight-bold m-1 hideOnMobile"> Salvar</span>
                        </div>
                    </Button>
                </Form.Row>
            </Form>
        </Modal>
    );
}