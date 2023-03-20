import { useLocation } from 'react-router-dom';
import Drinks from './Drinks';
import Meals from './Meals';

function Recipes() {
  const { pathname } = useLocation();
  const renderMeals = (pathname === '/meals');
  const renderDrinks = (pathname === '/drinks');
  return (
    <div>
      {renderMeals && <Meals />}

      {renderDrinks && <Drinks />}

    </div>
  );
}

export default Recipes;
