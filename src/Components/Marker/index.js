import React, { Component } from 'react';
import building from '../../assets/svgIcons/building.svg';
import home from '../../assets/svgIcons/home.svg';
import shovel from '../../assets/svgIcons/shovel.svg';
import comercio from '../../assets/svgIcons/comercio.svg';
import republica from '../../assets/svgIcons/republica.svg';
import marker from '../../assets/svgIcons/marker.svg';
import'./index.css';


export default class Marker extends Component {
    render() {
        function getIcon(markerType) {
            switch (markerType) {
                case 'Casa':
                    return home;
                case 'Apartamento':
                    return building;
                case 'Terreno':
                    return shovel;
                case 'Comercial':
                    return comercio;
                case 'República':
                    return republica;
                default:
                    return marker;
            }
        }
        return (
            <img 
            width={30} 
            height={30}  
            src={getIcon(this.props.propType)} 
            style={{transform: 'translate(-50%, -100%)',cursor:'pointer'}}
            alt="" 
            onClick={this.props.onClick}
            />
        );
    }
}