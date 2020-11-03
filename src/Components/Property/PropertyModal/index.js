import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaSearch, FaFileUpload, FaSave } from 'react-icons/fa';
import Marker from '../../Marker';
import PropertyService from '../../../Service/PropertyService';
import { toast } from 'react-toastify';
import { Modal, Form, FormControl, Button } from 'react-bootstrap';
import MapService from '../../../Service/MapService';
import './index.css';
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
        let results = await MapService.searchAddressOnMaps(Address);
        let result = results[0]; //best match
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
            list.push(
                <div>
                    <img alt={file.name} style={{ width: '50px', height: '50px' }} src={URL.createObjectURL(file)} />
                    <span>{file.name}</span>
                    <br />
                </div>
            );
        }
        setSelectedFileList(list);
    };

    return (
        <Modal
            show={props.modalOpen}
            onHide={props.closeFunction}
            dialogClassName="fullscreen-modal">
            <Modal.Header closeButton>
                <Modal.Title>Propriedade</Modal.Title>
            </Modal.Header>
            <Form>
                <div className="map">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: config.googleMapsApiKey, language: "pt-BR" }}
                        zoom={currentZoom}
                        center={currentCenter}
                        options={{ streetViewControl: true }}>
                        {currentMarker}
                    </GoogleMapReact>
                    <FormControl
                        placeholder="Descreva a propriedade."
                        value={Description}
                        onChange={e => setDescription(e.target.value)}
                        className="prop-name-div"
                        size='sm' />
                    <FormControl as="select"
                        value={Type}
                        onChange={e => setType(e.target.value)}
                        className="select-prop-type-div"
                        size='sm'>
                        <option value="">Selecione um Tipo</option>
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Terreno">Terreno</option>
                        <option value="Comercial">Comercial</option>
                        <option value="República">República</option>
                    </FormControl>
                    <div className="input-group-search-div">
                        <FormControl
                            placeholder="Pesquisar endereço..."
                            value={Address}
                            onChange={e => setAddress(e.target.value)}
                            size='sm'
                        />
                        <Button variant='primary' style={{ padding: '3.5px', width: '60px' }} size='sm' onClick={searchAddress}><FaSearch size={16} /></Button>
                    </div>
                </div>
                <FormControl rows={4}
                    style={{ margin: '0 auto', marginTop: '5px', width: '80%' }}
                    as="textarea"
                    value={Informations}
                    onChange={e => setInformations(e.target.value)}
                    size='sm'
                    placeholder="Informe aqui tudo o que você julga importante!" />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
                    <label className="custom-file-upload">
                        <Form.File multiple accept="image/*" onChange={(e) => {
                            setImageFiles(e.target.files);
                            showSelectedFileList(e.target.files);
                        }} />
                        <FaFileUpload size={14} />
                    </label>
                    <span style={{ fontWeight: '700', padding: '0px 0px 10px 10px' }}>{selectedFileList.length} arquivos.</span>
                </div>
                <div style={{ right: '5px', bottom: '5px', position: 'absolute' }}>
                    <Button variant='primary' onClick={handlePropriedadeData} style={{ display: 'flex', alignItems: 'center' }}>
                        <FaSave size={16} />
                        <span style={{ fontWeight: '700', marginLeft: '2px' }}> Salvar</span>
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}