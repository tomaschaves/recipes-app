import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy'); // referência e instalação no arquivo referenciasBibliotecas.md

export default function DoneMeal({ recipe, index, setRefresh, refresh }) {
  const [alerted, setAlerted] = useState(); // estado para renderizar o 'Link copied!'
  const [renderHeart, setRenderHeart] = useState(false);
  const location = useLocation();

  const copyLink = (type, id) => {
    copy(`http://localhost:3000/${type}/${id}`);
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
    // console.log(saveRecipeObject);
    const checkRecipe = existingLSArray
      .some((element) => element.id === recipe.id);

    setRenderHeart(checkRecipe);
  };

  const saveRecipe = () => {
    // pegamos o que tiver do LS no favoriteRecipes
    const key = localStorage.getItem('favoriteRecipes');
    // parse do LS ou setar um array vazio
    const existingLSArray = JSON.parse(key) || [];
    // criação de um novo array com o spread do antigo e o novo objeto
    const checkRecipe = existingLSArray
      .some((element) => element.id === recipe.id);
    // se no array existir o objeto, ele filtra os que são diferentes e seta no LS
    if (checkRecipe) {
      const filterLSArray = existingLSArray
        .filter((element) => element.id !== recipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterLSArray));
    } else if (!checkRecipe) {
      // se no array não existir o objeto, ele cria um novo array com os objetos do LS e o objeto atual
      const newLSArray = [...existingLSArray, saveRecipeObject];
      // setado no LS o novo array de objetos
      localStorage.setItem('favoriteRecipes', JSON.stringify(newLSArray));
    }
    if (refresh !== undefined) {
      setRefresh(!refresh);
    }
    isRecipeFavorited();
  };

  useEffect(() => {
    isRecipeFavorited();
  });

  return (
    <div key={ recipe.id }>
      <Link to={ `/meals/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          style={ { width: '80vw' } }
        />
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${recipe.nationality} - ${recipe.category}` }

      </p>
      <Link to={ `/meals/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { recipe.doneDate }
      </p>

      {
        location.pathname === '/done-recipes' && recipe.tags.map((tag, indexTag) => (
          <p
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ `${indexTag}-${tag}` }
          >
            { tag }

          </p>
        ))
      }

      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ () => copyLink('meals', recipe.id) }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {
        renderHeart
          ? (
            <button onClick={ saveRecipe }>
              <img
                src={ blackHeart }
                alt="favorito"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          )
          : (
            <button onClick={ saveRecipe }>
              <img
                src={ whiteHeart }
                alt="não-favorito"
                data-testid={ `${index}-horizontal-favorite-btn` }
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

DoneMeal.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;
