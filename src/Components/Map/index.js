import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker';
import MapService from '../../Service/MapService';
import PropertyInfoWindowModal from './PropertyInfoWindowModal';
const config = require('../../../package.json').config;

export default function Map() {

  const [propMarkers, setPropMarkers] = useState([]);

  const [modal, setModal] = useState(null);

  const onClickMarker = (obj) => setModal(<PropertyInfoWindowModal isModalOpen={true} onClose={closeModal} Property={obj} />);

  const closeModal = () => setModal(null);


  useEffect(() => {
    MapService.getMapData().then(r => {
      let propertyMarkers = [];
      for (const p of r.data) {
        let location = JSON.parse(JSON.parse(p.AreaJsonConfig)).cordinates;
        propertyMarkers.push(<Marker lat={location.lat} lng={location.lng} propType={p.Type} onClick={() => onClickMarker(p)} key={p.Id}/>)
      }
      setPropMarkers(propertyMarkers);
    });
  });

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: config.googleMapsApiKey, language: "pt-BR" }}
      defaultCenter={{ lat: -20.2209657795223, lng: -44.6923828125 }}
      defaultZoom={5}
      options={{ streetViewControl: true }} >
      {propMarkers}
      {modal}
    </GoogleMapReact>
  );
}
