// Função para retorno do objeto a ser setado no LS na chave done recipes. Varia de bebida para comida.
const returnDoneRecipeLSObject = async (type, id) => {
  if (type === 'meals') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchType = await fetch(endpoint);
    const response = await fetchType.json();
    let { strTags } = response.meals[0];
    strTags = strTags !== null ? strTags.split(',') : [];

    return {
      id: response.meals[0].idMeal,
      type: 'meal',
      nationality: response.meals[0].strArea,
      category: response.meals[0].strCategory,
      alcoholicOrNot: '',
      name: response.meals[0].strMeal,
      image: response.meals[0].strMealThumb,
      doneDate: new Date(),
      tags: strTags,
    };
  }
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const fetchType = await fetch(endpoint);
  const response = await fetchType.json();
  return {
    id: response.drinks[0].idDrink,
    type: 'drink',
    nationality: '',
    category: response.drinks[0].strCategory,
    alcoholicOrNot: response.drinks[0].strAlcoholic,
    name: response.drinks[0].strDrink,
    image: response.drinks[0].strDrinkThumb,
    doneDate: new Date(),
    tags: [],
  };
};
// id: id-da-receita,
// type: meal-ou-drink,
// nationality: nacionalidade-da-receita-ou-texto-vazio,
// category: categoria-da-receita-ou-texto-vazio,
// alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
// name: nome-da-receita,
// image: imagem-da-receita,
// doneDate: quando-a-receita-foi-concluida,
// tags: array-de-tags-da-receita-ou-array-vazio
export default returnDoneRecipeLSObject;
