// fetch para termos as categorias de comidas para a busca com os radio button
const mealsCategories = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const maximumNumber = 5;

  const fetchURL = await fetch(endpoint);
  const response = await fetchURL.json();
  return (response.meals.slice(0, maximumNumber));
};

export default mealsCategories;
