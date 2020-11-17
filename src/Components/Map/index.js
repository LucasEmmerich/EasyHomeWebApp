import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker';
import MapService from '../../Service/MapService';
import PropertyInfoWindowModal from './PropertyInfoWindowModal';
import FilterMenu from '../../Components/Map/FilterMenu';
import { FaSearch } from 'react-icons/fa';
import './index.css';
const config = require('../../../package.json').config;

export default function Map() {

  const [searchAddressText, setSearchAddressText] = useState('');
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState({ lat: -20.2209657795223, lng: -44.6923828125 });

  const loadClientGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setZoom(12);
      setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
    });
  };

  const [propMarkers, setPropMarkers] = useState([]);

  const [modal, setModal] = useState(null);

  const onClickMarker = (obj) => setModal(<div style={{ zIndex: 4 }}><PropertyInfoWindowModal isModalOpen={true} onClose={closeModal} Property={obj} /></div>);

  const closeModal = () => setModal(null);

  const loadPropertyes = (filters = { Types: ['Casa','Apartamento','Terreno','Comercial','República'], SaleTypes: ['Venda','Aluguel'] }) => {
    MapService.getMapData(filters).then(r => {
      let propertyMarkers = [];
      for (const p of r.data) {
        let location = JSON.parse(JSON.parse(p.AreaJsonConfig)).cordinates;
        propertyMarkers.push(<Marker lat={location.lat} lng={location.lng} propType={p.Type} onClick={() => onClickMarker(p)} key={p.Id} />)
      }
      setPropMarkers(propertyMarkers);
    });
  };

  useEffect(() => {
    loadClientGeolocation();
    loadPropertyes();
    // eslint-disable-next-line
  }, []);

  const searchAddressOnMaps = async (e) => {
    e.preventDefault();
    if(searchAddressText){
      let results = await MapService.searchAddressOnMaps(searchAddressText);
      let result = results[0]; //best match
      setZoom(13);
      setCenter(result.geometry.location);
    };
  };

  return (
    <section style={{ height: '86vh', position: 'relative' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.googleMapsApiKey, language: "pt-BR" }}
        center={center}
        zoom={zoom}
        options={{ streetViewControl: true }}>
        {propMarkers}
        {modal}
      </GoogleMapReact >
      <form className="search-address-div">
        <input placeholder="Pesquisar..."
          value={searchAddressText}
          onChange={(e) => setSearchAddressText(e.target.value)} />
        <button placeholder="Pesquisar..." onClick={searchAddressOnMaps}> <FaSearch /></button>
      </form>
      <div className="filter-menu">
        <FilterMenu onSelectFilters={(filters) => loadPropertyes(filters)} />
      </div>
    </section>
  );
}
