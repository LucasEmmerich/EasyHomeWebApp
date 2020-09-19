import React, { useEffect, useState } from 'react';
import './index.css';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker';
import MapService from '../../Service/MapService';
import Modal from 'react-modal';
import PropriedadeInfoWindowModal from './PropriedadeInfoWindowModal';
const config = require('../../../package.json').config;

export default function Map() {

  const customStyles = { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' } };


  const [propMarkers, setPropMarkers] = useState([]);

  const [isModalOpen,setIsModalOpen] = useState(false);

  const [currentPropMarker, setCurrentPropMarker] = useState(null);
  const onClickMarker = (obj) => {
    setCurrentPropMarker(obj);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    MapService.getMapData().then(r => {
      let propriedadeMarkers = [];
      for (let p of r.data) {
        let location = JSON.parse(JSON.parse(p.AreaJsonConfig)).cordinates;
        propriedadeMarkers.push(<Marker lat={location.lat} lng={location.lng} propType={p.Tipo} onClick={() => onClickMarker(p)} />)
      }
      setPropMarkers(propriedadeMarkers);
    });
  }, []);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: config.googleMapsApiKey, language: "pt-BR" }}
      defaultCenter={{ lat: -20.2209657795223, lng: -44.6923828125 }}
      defaultZoom={5}
      options={{ streetViewControl: true }}>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} shouldCloseOnEsc={true} style={customStyles}>
          <PropriedadeInfoWindowModal Propriedade={currentPropMarker}/>
        </Modal>
      {propMarkers}
    </GoogleMapReact>
  );
}
