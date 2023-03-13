import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

const copy = require('clipboard-copy'); // referência e instalação no arquivo referenciasBibliotecas.md

export default function DoneRecipes() {
  const [alerted, setAlerted] = useState(); // estado para renderizar o 'Link copied!'
  const [filteredItems, setFilteredItems] = useState('');
  // const [newIndex, setNewIndex] = useState(0);

  const getFromLocalStorage = () => {
    const getLS = localStorage.getItem('doneRecipes');
    let parseLS = JSON.parse(getLS);
    parseLS = parseLS !== null ? parseLS : [];
    return parseLS;
  };

  const copyLink = (type, id) => {
    copy(`http://localhost:3000/${type}/${id}`);
    setAlerted(true); // aparece o alerta 'Link copied!'
    const twoSeconds = 2000;
    setTimeout(() => { setAlerted(false); }, twoSeconds); // retira o alerta
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilteredItems('meals') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilteredItems('drinks') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilteredItems('') }
        >
          All
        </button>
      </div>
      {
        getFromLocalStorage().map((recipe, index) => (
          recipe.type === 'meal'
            ? (filteredItems === '' || filteredItems === 'meals') && (
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
                <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => copyLink('meals', recipe.id) }
                >
                  <img src={ shareIcon } alt="shareIcon" />
                </button>
                {
                  recipe.tags.map((tag, indexTag) => (
                    <p
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ `${indexTag}-${tag}` }
                    >
                      { tag }

                    </p>
                  ))
                }
                {
                  alerted && <p>Link copied!</p> // renderização de 'Link copied!' durante dois segundos, com base no status do estado
                }
              </div>
            ) : (filteredItems === '' || filteredItems === 'drinks') && (
              <div key={ recipe.id }>
                <Link to={ `/drinks/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                    style={ { width: '80vw' } }
                  />
                </Link>
                <Link to={ `/drinks/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.alcoholicOrNot }

                </p>
                <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
                <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => copyLink('drinks', recipe.id) }
                >
                  <img src={ shareIcon } alt="shareIcon" />
                </button>
                {
                  recipe.tags.map((tag, indexTag) => (
                    <p
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ `${indexTag}-${tag}` }
                    >
                      { tag }

                    </p>
                  ))
                }
                {
                  alerted && <p>Link copied!</p> // renderização de 'Link copied!' durante dois segundos, com base no status do estado
                }
              </div>
            )))
      }
    </div>
  );
}
