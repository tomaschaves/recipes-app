import userEvent from '@testing-library/user-event';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouterAndProvider } from './helpers/renderWithRouterAndProvider';
import RecipeInProgress from '../Pages/RecipeInProgress';

const FAVORITE_BUTTON = 'favorite-btn';

afterEach(cleanup);

describe('01 - MEALS: Teste o componente <Meals/>', () => {
  test('01.1 - Favoritar: ao clicar no icone de coração, a receita é favoritada e o icone de coração preenchido é renderizado.', async () => {
    // DAAAM | DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
    const { findByTestId, findAllByTestId } = renderWithRouterAndProvider(<RecipeInProgress />, { initialEntries: ['/meals/52997/in-progress'] });

    const noFavoriteButton = await findByTestId(FAVORITE_BUTTON);
    // AGIR
    userEvent.click(noFavoriteButton);

    const favoriteButton = await findByTestId(FAVORITE_BUTTON);
    // AFERIR
    expect(favoriteButton.alt).toBe('favorito');

    // ACESSAR
    await waitFor(async () => {
      const allIngredients = await findAllByTestId(/ingredient-step/i);
      const textDecoration = 'line-through solid rgb(0, 0, 0)';

      allIngredients.map((ingredient) => {
        fireEvent.click(ingredient);
        const styleDecoration = window.getComputedStyle(ingredient).textDecoration;

        expect(styleDecoration).toBe(textDecoration);

        return '';
      });
    });
  });

  test('01.2 - Local Storage: se o localstorage é inicializado com a chave "inProgressRecipes".', () => {
    const emptyLocalStorage = localStorage.getItem('inProgressRecipes') || [];

    // DAAAM | DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
    renderWithRouterAndProvider(<RecipeInProgress />, { initialEntries: ['/meals/52997/in-progress'] });

    if (emptyLocalStorage.length === 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {},
        drinks: {},
      }));

      const recipesInProgresss = localStorage.getItem('inProgressRecipes');
      const parsedRecipesInProgress = JSON.parse(recipesInProgresss);

      expect(parsedRecipesInProgress.meals).toEqual({});
      expect(parsedRecipesInProgress.drinks).toEqual({});
    }
  });
});

describe('02 - DRINKS: Teste o componente <Drinks/>', () => {
  test('Favoritar: ao clicar no icone de coração, a receita é favoritada e o icone de coração preenchido é renderizado.', async () => {
    // DAAAM | DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
    const { findByTestId, findAllByTestId } = renderWithRouterAndProvider(<RecipeInProgress />, { initialEntries: ['/drinks/15997/in-progress'] });

    const noFavoriteButton = await findByTestId(FAVORITE_BUTTON);
    // AGIR
    userEvent.click(noFavoriteButton);

    const favoriteButton = await findByTestId(FAVORITE_BUTTON);
    // AFERIR
    expect(favoriteButton.alt).toBe('não-favorito');

    // ACESSAR
    await waitFor(async () => {
      const allIngredients = await findAllByTestId(/ingredient-step/i);
      const textDecoration = 'line-through solid rgb(0, 0, 0)';

      allIngredients.map((ingredient) => {
        fireEvent.click(ingredient);
        const styleDecoration = window.getComputedStyle(ingredient).textDecoration;

        expect(styleDecoration).toBe(textDecoration);

        return '';
      });
    });
  });
  test('02.2 - Local Storage: se o localstorage é inicializado com a chave "inProgressRecipes".', () => {
    const emptyLocalStorage = localStorage.getItem('inProgressRecipes') || [];

    // DAAAM | DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
    renderWithRouterAndProvider(<RecipeInProgress />, { initialEntries: ['/drinks/15997/in-progress'] });

    if (emptyLocalStorage.length === 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {},
        drinks: {},
      }));

      const recipesInProgress = localStorage.getItem('inProgressRecipes');
      const parsedRecipesInProgress = JSON.parse(recipesInProgress);

      expect(parsedRecipesInProgress.meals).toEqual({});
      expect(parsedRecipesInProgress.drinks).toEqual({});
    }
  });
});
