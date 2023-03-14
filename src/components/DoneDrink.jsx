import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneDrink({ recipe, index }) {
  const [alerted, setAlerted] = useState(); // estado para renderizar o 'Link copied!'
  const copyLink = (type, id) => {
    copy(`http://localhost:3000/${type}/${id}`);
    setAlerted(true); // aparece o alerta 'Link copied!'
    const twoSeconds = 2000;
    setTimeout(() => { setAlerted(false); }, twoSeconds); // retira o alerta
  };

  return (
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
      <p data-testid={ `${index}-horizontal-top-text` }>
        { recipe.category }
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { recipe.doneDate }
      </p>
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
  );
}

DoneDrink.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;
