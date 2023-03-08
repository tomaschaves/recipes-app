// fetch para termos as categorias de bebidas para a busca com os radio button
const drinksCategories = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const maximumNumber = 5;

  const fetchURL = await fetch(endpoint);
  const response = await fetchURL.json();
  return (response.drinks.slice(0, maximumNumber));
};

export default drinksCategories;
