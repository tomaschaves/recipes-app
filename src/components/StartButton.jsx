import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function StartButton({ renderContinue, renderDone, id, type }) {
  const history = useHistory();

  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      style={ {
        position: 'fixed',
        bottom: 0,
        width: '100vw',
        display: renderDone ? 'none' : 'inline-block',
      } }
      onClick={ () => history.push(`/${type}/${id}/in-progress`) }
    >
      { renderContinue ? 'Continue Recipe' : 'Start Recipe' }
    </button>
  );
}

StartButton.propTypes = {
  renderContinue: PropTypes.bool,
  renderDone: PropTypes.bool,
}.isRequired;
