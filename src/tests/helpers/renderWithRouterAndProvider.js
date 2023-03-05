import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RecipeProvider from '../../context/RecipeProvider';

export function renderWithRouterAndProvider(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(
      <RecipeProvider>
        <Router history={ history }>
          { component }
        </Router>
      </RecipeProvider>,
    ),
    history,
  };
}
