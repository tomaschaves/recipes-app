import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import returnDoneRecipeLSObject from '../helpers/returnDoneRecipeLSObject';

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
    // vamos ver a rota e retornar o tamanho do array de ingredientes, caso ele seja maior que 0 e o id da receita retorne algo. se ele for falso, retornará 0, que não liberará o botão
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
  // se o tamanho do array de ingredientes utilizados(que está no LS) for igual ao de ingredientes retornados pela função que pega da API, ele retornará true, liberando o botão
  const enableButton = () => ingredientsNumber.length !== ingredientsInLS();

  const finishRecipe = async () => {
    if (/meals/.test(pathname)) {
      // pegamos as receitas em progresso do LS
      const inProgressRecipes = localStorage.getItem('inProgressRecipes');
      const parseInProgressRecipes = JSON.parse(inProgressRecipes);
      // pegamos do objeto a comida do id atual
      const newDoneObject = Object
        .entries(parseInProgressRecipes.meals).filter((element) => element[0] === id());
      // chamamos a função que retorna o objeto a setar no LS
      const newRecipe = await returnDoneRecipeLSObject('meals', newDoneObject[0][0]);
      const doneRecipes = localStorage.getItem('doneRecipes');
      const parseDoneRecipes = JSON.parse(doneRecipes) || [];
      // criamos um novo array a ser setado no LS e setamos ele
      const newDoneArray = [...parseDoneRecipes, newRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneArray));
    } else {
      const inProgressRecipes = localStorage.getItem('inProgressRecipes');
      const parseInProgressRecipes = JSON.parse(inProgressRecipes);
      const newDoneObject = Object
        .entries(parseInProgressRecipes.drinks).filter((element) => element[0] === id());
      const newRecipe = await returnDoneRecipeLSObject('drinks', newDoneObject[0][0]);
      const doneRecipes = localStorage.getItem('doneRecipes');
      const parseDoneRecipes = JSON.parse(doneRecipes) || [];
      console.log(parseDoneRecipes);
      const newDoneArray = [...parseDoneRecipes, newRecipe];
      console.log(newDoneArray);
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneArray));
    }
    history.push('/done-recipes');
  };

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
      onClick={ finishRecipe }
    >
      Finish Recipe
    </button>
  );
}

EndButton.propTypes = {
  ingredientsNumber: PropTypes.array,
}.isRequired;
