import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function StartButton({
  renderContinue, renderDone, id, type, redirect }) {
  const history = useHistory();

  // para entrar na tela in-progress da receita
  const click = () => {
    redirect();
    history.push({
      pathname: `/${type}/${id}/in-progress`,
    });
  };
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
      onClick={ click }
    >
      { renderContinue ? 'Continue Recipe' : 'Start Recipe' }
    </button>
  );
}

StartButton.propTypes = {
  renderContinue: PropTypes.bool,
  renderDone: PropTypes.bool,
}.isRequired;
