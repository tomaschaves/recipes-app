import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContex from './RecipeContext';

function RecipeProvider({ children }) {
  const INITIAL_STATE = { nome: 'Xablau', idade: 100 };
  const [something, setSomething] = useState(INITIAL_STATE);

  const state = useMemo(() => ({
    something,
    setSomething,
  }), [something]);

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
