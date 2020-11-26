import axios from 'axios';
import { config } from '../package.json';

export default class Api{
    static get baseURL(){
        return process.env.NODE_ENV == 'production' ? config.prdApiAddress : config.dsvApiAddress;
    }
    static get instance(){
        return (this._api ? this._api : this._api = axios.create({ baseURL : this.baseURL }))
    }
}

