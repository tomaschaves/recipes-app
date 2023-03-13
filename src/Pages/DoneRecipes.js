import React, { useEffect } from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  const getFromLocalStorage = () => {
    const getLS = localStorage.getItem('doneRecipes');
    let parseLS = JSON.parse(getLS);
    parseLS = parseLS !== null ? parseLS : [];
    return parseLS;
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-meal-btn">Meal</button>
        <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      </div>
      {
        getFromLocalStorage().map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
            <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Compartilhar

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
          </div>
        ))
      }
    </div>
  );
}
