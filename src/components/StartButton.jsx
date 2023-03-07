import React from 'react';

export default function StartButton() {
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      style={ { position: 'fixed', bottom: 0, width: '100vw' } }
    >
      Start Recipe
    </button>
  );
}
