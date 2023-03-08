import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Carousel from './Carrousel';
import StartButton from './StartButton';

export default function DrinkDetails({ recipe, ingredientsFunction }) {
  const history = useHistory();
  // função para pegar e retornar o id da receita que estamos no momento
  const id = () => {
    const { location: { pathname } } = history;
    const idForSearch = pathname.replace(/\D/g, '');
    return `${idForSearch}`;
  };
  // função para cecharmos se o id consta ou não no losalStorage
  const getLS = () => {
    // início de um objeto e função mockados para fazer o requisito. Precisando testar o requisito 29 e não tendo sido feito o requisito de done recipes, descomentar, entrar em uma receita para gerar o LS, e comentar o código novamente.
    // Pode ser retirado futuramente quando for implementada a função de done recipes
    // const obj = [{
    //   id: '17222',
    //   type: 'drink',
    //   nationality: '',
    //   category: 'Cocktail',
    //   alcoholicOrNot: 'Alcoholic',
    //   name: 'A1',
    //   image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    //   doneDate: '',
    //   tags: '[]',
    // }, {
    //   id: '15998',
    //   type: 'drink',
    //   nationality: '',
    //   category: 'Cocktail',
    //   alcoholicOrNot: 'Not alcoholic',
    //   name: 'Xablau',
    //   image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    //   doneDate: '',
    //   tags: '[]',
    // }];
    // localStorage.setItem('doneRecipes', JSON.stringify(obj));

    // pegamos do local storage o doneRecipes. fazemos o parse dele ou retornamos [] se for vazio, para não quebrar a aplicação
    const key = localStorage.getItem('doneRecipes');
    const JSONKey = JSON.parse(key) || [];
    // vamos se o id de algum dos elementos do LS é igual ao id do link. se for, retornamos true, para usarmos na renderização condicional do botão de start recipe
    const findItem = JSONKey.some((element) => element.id === id());
    return findItem;
  };

  useEffect(() => {
    getLS();
  }, []);
  // recebemos a receita e o array de ingredientes por props
  return (
    <div key={ recipe.idDrink }>

      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
      <h2 data-testid="recipe-category">{recipe.strAlcoholic}</h2>
      {
        // fazemos o map dos ingredientes que foram passados por props
        ingredientsFunction().map((ingredient, index) => (
          <p
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {
              ingredient
            }
          </p>
        ))
      }
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      {
        !getLS() && <StartButton /> // se o retorno do doneRecipes for true, renderizamos o botão de start recipe
      }
      <Carousel options="meals" />
    </div>
  );
}

DrinkDetails.propTypes = {
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
  ingredientsFunction: PropTypes.func,
}.isRequired;
