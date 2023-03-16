// função para retornar o objeto com os dados necessários para serem salves no LS com base no typo (meal ou drink) e no objeto retornado pela API
const returnObjectToSave = (type, recipe) => {
  if (/meals/.test(type)) {
    return {
      id: recipe.idMeal,
      type: 'meal',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      image: recipe.strMealThumb,
      name: recipe.strMeal,
    };
  }
  return {
    id: recipe.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    image: recipe.strDrinkThumb,
    name: recipe.strDrink,
  };
};

export default returnObjectToSave;
