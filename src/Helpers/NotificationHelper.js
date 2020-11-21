import { toast } from "react-toastify";
import React from 'react';

const options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    closeButton: true
}

const NotificationHelper = {
    alertSuccess: (message = 'Sucesso!') => {
        toast.success(
            <div className="notification">
                <h4>Sucesso! <span role="img" aria-label="👌">👌</span></h4>
                <h6>{message}</h6>
            </div>,
            options
        )
    },
    alertError: (message = 'Ocorreu um erro inesperado! 😢') => {
        toast.error(
            <div className="notification">
                <h4>Opa! <span role="img" aria-label="🤣">🤣</span></h4>
                <h6>{message}</h6>
            </div>,
            options
        )
    },
    alertWarning: (message = 'Cuidado... 🤫') => {
        toast.warning(
            <div className="notification">
                <h4>Atenção! <span role="img" aria-label="✋">✋</span></h4>
                <h6>{message}</h6>
            </div>,
            options
        )
    },
    alertInformation: (message = '') => {
        toast.info(
            <div className="notification">
                <h4>Pega a dica <span role="img" aria-label="😎">😎</span></h4>
                <h6>{message}</h6>
            </div>,
            options
        )
    }
}

export default NotificationHelper