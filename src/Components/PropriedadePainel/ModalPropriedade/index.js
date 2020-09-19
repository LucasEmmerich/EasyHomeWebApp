import React, { useState } from 'react';
import './index.css';
import GoogleMapReact from 'google-map-react';
import { FaSearch } from 'react-icons/fa';
import Marker from '../../Marker';
import propriedadeService from '../../../Service/PropriedadeService';
import { toast } from 'react-toastify';
const config = require('../../../../package.json').config;

export default function ModalPropriedade(props) {

    const constructMarker = (obj) => {
        if(obj){
            const objCoordinates = JSON.parse(JSON.parse(obj));
            let cordinates = objCoordinates.cordinates;
            return <Marker lat={cordinates.lat} lng={cordinates.lng} propType={Tipo} />
        }
        else return null;
    }
    
    const [Id, setId] = useState(props.Propriedade?.Id ?? 0);
    const [Descricao, setDescricao] = useState(props.Propriedade?.Descricao ?? '');
    const [Tipo, setTipo] = useState(props.Propriedade?.Tipo ?? '');
    const [Endereco, setEndereco] = useState(props.Propriedade?.Endereco ?? '');
    const [Informacoes, setInformacoes] = useState(props.Propriedade?.Informacoes ?? '');
    const [currentMarker, setCurrentMarker] = useState(constructMarker(props.Propriedade?.AreaJsonConfig));
    const [imageFiles,setImageFiles] = useState([]);

    
    const handlePropriedadeData = async (event) => {
        event.preventDefault();
        
        let areaJsonConfig = {
            type: 'point',
            cordinates: { lat: currentMarker.props.lat, lng: currentMarker.props.lng }
        };

        if (Id) {
            await propriedadeService.update({
                Id,
                Tipo,
                Descricao,
                Endereco,
                Informacoes,
                AreaJsonConfig: JSON.stringify(areaJsonConfig)
            },imageFiles);
        }
        else {
            await propriedadeService.create({
                Tipo,
                Descricao,
                Endereco,
                Informacoes,
                AreaJsonConfig: JSON.stringify(areaJsonConfig)
            },imageFiles);
        }

        toast.success('Sucesso!')
        props.closeFunction();
    }

    const [currentCenter, setCurrentCenter] = useState({ lat: -15.826691, lng: -47.92182039999999 });
    const [currentZoom, setCurrentZoom] = useState(3);
    
    const searchAddress = async () => {
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(Endereco.replace(" ", "+"))}&key=${config.googleMapsApiKey}`);
        let result = (await response.json()).results[0];
        if (result) {
            setCurrentCenter(result.geometry.location);
            setCurrentZoom(18);
            setCurrentMarker(<Marker lat={result.geometry.location.lat} lng={result.geometry.location.lng} propType={Tipo} />)
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

    return (
        <div style={{ width: '90vw' }}>
            <form className="col-md-12">
                <div className="row">
                    <div className="form-group col-md-9">
                        <input className="form-control"
                            placeholder="Descreva a propriedade."
                            value={Descricao}
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <select className="form-control form-control-md" value={Tipo} onChange={e => setTipo(e.target.value)}>
                            <option value="">Selecione um Tipo</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Terreno">Terreno</option>
                            <option value="Comercial">Comercial</option>
                            <option value="República">República</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-11">
                        <input
                            className="form-control"
                            placeholder="Forneça-nos o endereço. Coloque o nome da rua, do bairro e da cidade ajudar na pesquisa! 😀"
                            value={Endereco}
                            onChange={e => setEndereco(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-1">
                        <a className="btn btn-primary" onClick={searchAddress}><FaSearch size={16} /></a>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <textarea className="form-control mt-3" rows="8" 
                            value={Informacoes}
                            onChange={e => setInformacoes(e.target.value)}
                            placeholder="Informe aqui tudo o que você julga importante!&#10;Ex: 2 padarias e 1 pizzaria a 100 metros.&#10;Bairro contêm 1 hospital. &#10;Venda seu peixe! 🤣" />
                        <input className="col-md-12 m-2" type="file" multiple accept="image/*" onChange={e =>setImageFiles( e.target.files)}/>
                    </div>
                    <div className="col-md-6">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: config.googleMapsApiKey, language: "pt-BR" }}
                            zoom={currentZoom}
                            center={currentCenter}
                            options={{ streetViewControl: true }}>
                            {currentMarker}
                        </GoogleMapReact>
                    </div>
                </div>
                <hr className="my-4 col-md-12"/>
                <p className="text-right mt-2 mb-0">
                    <button type="submit" className="btn btn-danger" onClick={props.closeFunction}>Fechar</button>
                    <button type="submit" className="btn btn-primary" onClick={handlePropriedadeData}>Salvar</button>
                </p>
            </form>
        </div>
    );
}