// boilerplate imports from create-react-app
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';

// additional imports from react-router-dom and redux
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/reducer';

// import components and containers here
import Splash from './components/Splash/Splash';
import BaseLayout from './components/BaseLayout/BaseLayout';
import GameList from './containers/GameList/GameList';
import GameForm from './containers/GameForm/GameForm';
import SingleGame from './containers/SingleGame/SingleGame';
import About from './components/About/About';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(reduxThunk)
    )
);

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route exact path="/webpage/" component={App} />
        <Route exact path='/webpage/games/:id' component={SingleGame} />
        <Route exact path='/webpage/games' component={GameList} />
        <Route exact path='/webpage/newGame' component={GameForm} />
        <Route exact path='/webpage/about' component={About} />
        <Route exact path='/' component={Splash} />
        <Route component={Splash} />
      </Switch>
    </BaseLayout>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
