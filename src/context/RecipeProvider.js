import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContex from './RecipeContext';

function RecipeProvider({ children }) {
  const INITIAL_STATE = [];
  const [recipe, setRecipe] = useState(INITIAL_STATE);

  const state = useMemo(() => ({
    recipe,
    setRecipe,
  }), [recipe]);

  return (
    <RecipeContex.Provider value={ state }>
      {children}
    </RecipeContex.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
