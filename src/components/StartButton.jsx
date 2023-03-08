import React from 'react';
import PropTypes from 'prop-types';

export default function StartButton({ renderContinue, renderDone }) {
  console.log(renderDone);
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
    >
      { renderContinue ? 'Continue Recipe' : 'Start Recipe' }
    </button>
  );
}

StartButton.propTypes = {
  renderContinue: PropTypes.bool,
  renderDone: PropTypes.bool,
}.isRequired;
