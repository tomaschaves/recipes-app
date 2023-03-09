import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const copy = require('clipboard-copy'); // referência e instalação no arquivo referenciasBibliotecas.md

export default function Buttons() {
  const history = useHistory();
  const [alerted, setAlerted] = useState(); // estado para renderizar o 'Link copied!'

  const copyLink = () => {
    copy(`http://localhost:3000${history.location.pathname}`); // usando o copy para copiar o link do local atual
    setAlerted(true); // aparece o alerta 'Link copied!'
    const twoSeconds = 2000;
    setTimeout(() => { setAlerted(false); }, twoSeconds); // retira o alerta
  };

  return (
    <div>
      <button
        type="button"
        id="share"
        data-testid="share-btn"
        onClick={ copyLink }

      >
        Compartilhar

      </button>
      <button type="button" id="favorite" data-testid="favorite-btn">Favoritar</button>
      {
        alerted && <p>Link copied!</p> // renderização de 'Link copied!' durante dois segundos, com base no status do estado
      }
    </div>
  );
}
