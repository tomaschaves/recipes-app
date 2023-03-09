import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import RecipeProvider from './context/RecipeProvider';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
// import MealInProgress from './Pages/MealInProgress';
import DrinksInProgress from './Pages/DrinksInProgress';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (

    <RecipeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        {/* <Route path="/meals/:id/in-progress" component={ MealInProgress } /> */}
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id/in-progress" component={ DrinksInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
