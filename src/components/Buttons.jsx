import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const copy = require('clipboard-copy'); // referência e instalação no arquivo referenciasBibliotecas.md

export default function Buttons({ saveRecipeObject }) {
  const history = useHistory();
  const [alerted, setAlerted] = useState(); // estado para renderizar o 'Link copied!'
  const copyLink = () => {
    copy(`http://localhost:3000${history.location.pathname}`); // usando o copy para copiar o link do local atual
    setAlerted(true); // aparece o alerta 'Link copied!'
    const twoSeconds = 2000;
    setTimeout(() => { setAlerted(false); }, twoSeconds); // retira o alerta
  };

  const saveRecipe = () => {
    // pegamos o que tiver do LS no favoriteRecipes
    const key = localStorage.getItem('favoriteRecipes');
    // parse do LS ou setar um array vazio
    const existingLSArray = JSON.parse(key) || [];
    // criação de um novo array com o spread do antigo e o novo objeto
    const newLSArray = [...existingLSArray, saveRecipeObject];
    // setado no LS o novo array de objetos
    localStorage.setItem('favoriteRecipes', JSON.stringify(newLSArray));
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
      <button
        type="button"
        id="favorite"
        data-testid="favorite-btn"
        onClick={ saveRecipe }
      >
        Favoritar

      </button>
      {
        alerted && <p>Link copied!</p> // renderização de 'Link copied!' durante dois segundos, com base no status do estado
      }
    </div>
  );
}

Buttons.propTypes = {
  saveRecipeObject: PropTypes.shape({}),
}.isRequired;
