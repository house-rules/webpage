// boilerplate imports from create-react-app
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

// additional imports from react-router-dom, redux, and other npm packages
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/reducer';
import Cookies from 'js-cookie';

// importing components and containers here. These are my page views.
import Splash from './components/Splash/Splash';
import BaseLayout from './containers/BaseLayout/BaseLayout';
import GameList from './containers/GameList/GameList';
import GameForm from './containers/GameForm/GameForm';
import SingleGame from './containers/SingleGame/SingleGame';
import About from './components/About/About';

// creating the redux store with middleware
const store = createStore(
    reducers,
    compose(
        applyMiddleware(reduxThunk)
    )
);

// checking to see if there are cookies for authentication
const loggedIn = () => {
  let cookie = Cookies.get('token');
    return !!cookie;
}

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route exact path="/webpage/login" render={() => (
          loggedIn() ? <GameList/> : <Splash/>
        )} />
        <Route exact path='/webpage/games/:id' component={SingleGame} />
        <Route exact path='/webpage/games' component={GameList} />
        <Route exact path='/webpage/newGame' render={() => (
          loggedIn() ? <GameForm/> : <Redirect to="/webpage/login"/>
        )} />
        <Route exact path='/webpage/about' component={About} />
        <Route exact path='/' component={Splash} />
        <Route component={Splash} />
      </Switch>
    </BaseLayout>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
