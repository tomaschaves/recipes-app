import React, { useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContex from '../context/RecipeContext';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export default function Caroussel({ options }) {
  const {
    meals,
    drinks,
  } = useContext(RecipeContex);
  const location = useLocation();

  const maximumNumerOfRecipes = 6;
  const sliceElements = () => {
    if (options === 'meals') return meals.slice(0, maximumNumerOfRecipes);
    return drinks.slice(0, maximumNumerOfRecipes);
  };
  console.log(drinks);
  // console.log(location.pathname);
  return (
    location.pathname.includes('/drinks')
      ? (
        <Carousel>
          {
            sliceElements().map((item, index) => (
              <div key={ item } data-testid={ `${index}-recommendation-card` }>
                <img src={ item.strMealThumb } alt={ item.strMeal } />
                <p className="legend" data-testid={ `${index}-recommendation-title` }>
                  {item.strMeal}
                </p>
              </div>
            ))
          }
        </Carousel>
      )
      : (
        <Carousel>
          {
            sliceElements().map((item, index) => (
              <div key={ item } data-testid={ `${index}-recommendation-card` }>
                <img src={ item.strDrinkThumb } alt={ item.strDrink } />
                <p className="legend" data-testid={ `${index}-recommendation-title` }>
                  {item.strDrink}
                </p>
              </div>
            ))
          }
        </Carousel>
      )
  );
}

Caroussel.propTypes = {
  options: PropTypes.string,
}.isRequired;
