import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function EndButton({ ingredientsNumber }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  const id = () => {
    const idForSearch = pathname.replace(/\D/g, '');
    return `${idForSearch}`;
  };

  const ingredientsInLS = () => {
    // objeto vazio para ser setado caso alguém entre direto na tela in-progress
    const obj = {
      drinks: {
      },
      meals: {
      },
    };

    const options = localStorage.getItem('inProgressRecipes');

    if (!options || options.length === 0 || options === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      return false;
    }

    const JSONOptions = JSON.parse(options) || [];
    // vamos ver a rota, retornar o tamanho do array de ingredientes, caso ele seja maior que 0 e o id da receita retorne algo. se ele for falso, retornará 0, que não liberará o botão
    const searchMealID = JSONOptions.meals[id()];
    if (searchMealID && searchMealID.length > 0) {
      return searchMealID.length > 0 ? searchMealID.length : 0;
    }

    const searchDrinkID = JSONOptions.drinks[id()];
    if (searchDrinkID && searchDrinkID.length > 0) {
      return searchDrinkID.length;
    }
    return 0;
  };

  const enableButton = () => ingredientsNumber.length !== ingredientsInLS();

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      style={ {
        position: 'fixed',
        bottom: 0,
        width: '100vw',
      } }
      disabled={ enableButton() }
    >
      Finalizar receita
    </button>
  );
}

EndButton.propTypes = {
  ingredientsNumber: PropTypes.array,
}.isRequired;
