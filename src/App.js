import './App.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MyRecipes from './components/MyRecipes';
import AddEdit from './components/AddEdit';
import Register from './components/Register';
import Login from './components/Login';
import RestrictedRoutes from './components/auth_routes/RestrictedRoutes';
import PrivateRoute from './components/auth_routes/PrivateRoute';
import Main from './components/Main';
import FilterRecipe from './components/FilterRecipe';
import SingleRecipe from './components/SingleRecipe';

function App() {
    return (
      <div className="App">
        <Router>          
            <Switch>
              <Route exact path='/' component={Main}></Route>
              <Route exact path='/filter' component={FilterRecipe}></Route>
              <Route exact path='/recipe' component={SingleRecipe}></Route>
              <PrivateRoute exact path='/my_recipes' component={MyRecipes}></PrivateRoute>
              <PrivateRoute exact path='/add_edit' component={AddEdit}></PrivateRoute>
              <RestrictedRoutes exact path='/login' component={Login}></RestrictedRoutes>
              <RestrictedRoutes exact path='/register' component={Register}></RestrictedRoutes>
            </Switch>
        </Router>
      </div>
    );
}
export default App;
