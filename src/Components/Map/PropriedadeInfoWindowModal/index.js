import React from 'react';

export default function PropriedadeInfoWindowModal(props) {
  return (
    <div><div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-lg-7">
          <div class="card-body">
            <h5 class="card-title">{props.Propriedade.Descricao} - {props.Propriedade.Tipo}</h5>
            <p class="card-text">{props.Propriedade.Endereco}</p>
            <p class="card-text">{props.Propriedade.Informacoes}</p>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card-body">
            <h5>Lucas:</h5>
            <span className="h6">Gostaria de marcar um encontro para eu poder ver a casa...</span>
            <h5>Rafael:</h5>
            <span className="h6">Quando seria bom pra você?</span>
            <h5>Lucas:</h5>
            <span className="h6">Segunda as 14h, você pode?</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
