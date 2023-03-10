import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy'); // referência e instalação no arquivo referenciasBibliotecas.md

export default function Buttons({ saveRecipeObject }) {
  const [renderHeart, setRenderHeart] = useState(false);

  const history = useHistory();
  const [alerted, setAlerted] = useState(); // estado para renderizar o 'Link copied!'
  const copyLink = () => {
    copy(`http://localhost:3000${history.location.pathname}`); // usando o copy para copiar o link do local atual
    setAlerted(true); // aparece o alerta 'Link copied!'
    const twoSeconds = 2000;
    setTimeout(() => { setAlerted(false); }, twoSeconds); // retira o alerta
  };

  const isRecipeFavorited = () => {
    // pegamos o que tiver do LS no favoriteRecipes
    const key = localStorage.getItem('favoriteRecipes');
    // parse do LS ou setar um array vazio
    const existingLSArray = JSON.parse(key) || [];
    // console.log(existingLSArray);
    const checkRecipe = existingLSArray
      .some((element) => element.id === saveRecipeObject.id);

    setRenderHeart(checkRecipe);
  };

  const saveRecipe = () => {
    // pegamos o que tiver do LS no favoriteRecipes
    const key = localStorage.getItem('favoriteRecipes');
    // parse do LS ou setar um array vazio
    const existingLSArray = JSON.parse(key) || [];
    // criação de um novo array com o spread do antigo e o novo objeto
    const checkRecipe = existingLSArray
      .some((element) => element.id === saveRecipeObject.id);
    // se no array existir o objeto, ele filtra os que são diferentes e seta no LS
    if (checkRecipe) {
      const filterLSArray = existingLSArray
        .filter((element) => element.id !== saveRecipeObject.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterLSArray));
    } else if (!checkRecipe) {
      // se no array não existir o objeto, ele cria um novo array com os objetos do LS e o objeto atual
      const newLSArray = [...existingLSArray, saveRecipeObject];
      // setado no LS o novo array de objetos
      localStorage.setItem('favoriteRecipes', JSON.stringify(newLSArray));
    }
    isRecipeFavorited();
  };

  useEffect(() => {
    isRecipeFavorited();
  });

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
      {
        renderHeart
          ? (
            <button onClick={ saveRecipe }>
              <img
                data-testid="favorite-btn"
                src={ blackHeart }
                alt="favorito"
              />
            </button>
          )
          : (
            <button onClick={ saveRecipe }>
              <img
                data-testid="favorite-btn"
                src={ whiteHeart }
                alt="não-favorito"
              />
            </button>
          )
      }
      {
        alerted && <p>Link copied!</p> // renderização de 'Link copied!' durante dois segundos, com base no status do estado
      }
    </div>
  );
}

Buttons.propTypes = {
  saveRecipeObject: PropTypes.shape({}),
}.isRequired;
