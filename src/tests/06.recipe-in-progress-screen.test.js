import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProvider } from './helpers/renderWithRouterAndProvider';
import RecipeInProgress from '../Pages/RecipeInProgress';

describe('01 - MEALS: Teste o componente <Meals/>', () => {
  test.only('Favoritar: ao clicar no icone de coração, a receita é favoritada e o icone de coração preenchido é renderizado.', async () => {
    // DAAAM | DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
    const { findByTestId } = renderWithRouterAndProvider(<RecipeInProgress />, { initialEntries: ['/meals/52997'] });
    // ACESSAR
    const favoriteButton = await findByTestId('favorite-btn');
    // AGIR
    userEvent.click(favoriteButton);
    // AFERIR
    expect(favoriteButton.alt).toBe('favorito');
  });
});

describe('02 - DRINKS: Teste o componente <Drinks/>', () => {
  test('Favoritar: ao clicar no icone de coração, a receita é favoritada e o icone de coração preenchido é renderizado.', async () => {
    // DAAAM | DEFINIR | ACESSAR | AGIR | AFERIR | MOCKAR
    const { findByTestId } = renderWithRouterAndProvider(<RecipeInProgress />, { initialEntries: ['/drinks/15997'] });
    // ACESSAR
    const favoriteButton = await findByTestId('favorite-btn');
    // AGIR
    userEvent.click(favoriteButton);
    // AFERIR
    expect(favoriteButton.alt).toBe('favorito');
  });
});
