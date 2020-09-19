import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.css'; 
import Modal from 'react-modal';

Modal.setAppElement('#root')

ReactDOM.render(
  <Routes/>,
  document.getElementById('root')
);
