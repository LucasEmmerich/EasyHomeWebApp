import React from 'react';
import NoImage from '../../../assets/imgs/NoImage.png';

export default function PropriedadeCard(props) {
    const propriedade = props.Propriedade;
    return (
        <div className="card" >
            <div className="card-header">
                <span className="h3">{propriedade.Descricao} - {propriedade.Tipo}</span>
                <div class="btn-group float-right">
                    <button className="btn btn-info" onClick={props.onEdit}>Editar</button>
                    <button className="btn btn-danger" onClick={props.onDelete}>Excluir</button>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{propriedade.Endereco}</p>
                <p className="card-text">{propriedade.Informacoes}</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    );
}