import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Carrousel from './Carrousel';
import StartButton from './StartButton';
// import InProgressButton from './InProgressButton';

export default function MealDetails({ recipe, ingredientsFunction }) {
  const history = useHistory();
  // função para pegar e retornar o id da receita que estamos no momento
  const id = () => {
    const { location: { pathname } } = history;
    const idForSearch = pathname.replace(/\D/g, '');
    return `${idForSearch}`;
  };
  // // função para checarmos se o id consta ou não no localStorage na chave inProgressRecipes
  const getLSInProgress = () => {
    const obj = {
      drinks: {
        178319: ['lista-de-ingredientes-utilizados'],
      },
      meals: {
        52771: ['lista-de-ingredientes-utilizados'],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    const key = localStorage.getItem('inProgressRecipes');
    const JSONKey = JSON.parse(key) || [];
    //   console.log(JSONKey.meals);
    //   // vamos se o id de algum dos elementos do LS é igual ao id do link. se for, retornamos true, para usarmos na renderização condicional do botão de continue recipe
    const findItem = Object.keys(JSONKey?.meals).some((element) => element === id());
    //   // console.log(findItem);

    //   // início de um objeto e função mockados para fazer o requisito. Precisando testar o requisito 30 e não tendo sido feito o requisito de inProgress recipes, descomentar, entrar em uma receita de bebida para gerar o LS, e comentar o código novamente.
    return findItem;
  };
  // // função para checarmos se o id consta ou não no localStorage na chave doneRecipes
  const getLSDone = () => {
  //   // início de um objeto e função mockados para fazer o requisito. Precisando testar o requisito 29 e não tendo sido feito o requisito de done recipes, descomentar, entrar em uma receita de bebida para gerar o LS, e comentar o código novamente.
  //   // Pode ser retirado futuramente quando for implementada a função de done recipes
    const obj = [{
      id: '17222',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'A1',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      doneDate: '',
      tags: '[]',
    }, {
      id: '15998',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Not alcoholic',
      name: 'Xablau',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      doneDate: '',
      tags: '[]',
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(obj));

    // pegamos do local storage o doneRecipes. fazemos o parse dele ou retornamos [] se for vazio, para não quebrar a aplicação
    const key = localStorage.getItem('doneRecipes');
    const JSONKey = JSON.parse(key) || [];
    // vamos se o id de algum dos elementos do LS é igual ao id do link. se for, retornamos true, para usarmos na renderização condicional do botão de start recipe
    const findItem = JSONKey.some((element) => element.id === id());
    return findItem;
  };

  useEffect(() => {
    getLSDone();
    getLSInProgress();
  //   getLSInProgress();
  }, []);

  // recebemos a receita e o array de ingredientes por props
  return (
    <div key={ recipe.idMeal }>

      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
        style={ { width: '50vw' } }
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
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
        recipe.strYoutube && (
          <iframe
            width="420"
            height="345"
            title={ recipe.strMeal }
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            data-testid="video"
          />
        )
      }
      <Carrousel options="drinks" />
      <StartButton
        text="Start"
        renderContinue={ getLSInProgress() }
        renderDone={ getLSDone() }
        type="meals"
        id={ id() }
      />
      {/* {
        getLSInProgress() && <InProgressButton text="Continue" /> // se o retorno do doneRecipes for true, renderizamos o botão com o texto continue recipe
      } */}
    </div>
  );
}

MealDetails.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
  ingredientsFunction: PropTypes.func,
}.isRequired;
