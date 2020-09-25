import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.css'; //retirar e npm uninstall bootstrap
import Modal from 'react-modal';
import './globalStyle.css';

Modal.setAppElement('#root')

ReactDOM.render(
  <Routes/>,
  document.getElementById('root')
);
