import api from '../api';
const config = require('../../package.json').config;

export default {
    getMapData: async (filters) => {
        return api.get(`/property?Types=${filters.Types.join(',')}&SaleTypes=${filters.SaleTypes.join(',')}`);
    },
    searchAddressOnMaps: async (searchText)=>{
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(searchText.replace(" ", "+"))}&key=${config.googleMapsApiKey}`);
        let results = (await response.json()).results;
        return results;
    }
}