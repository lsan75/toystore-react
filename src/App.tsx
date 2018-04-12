import * as React from 'react';
import ToyListContainer from './features/toy-list/toy-list.container';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Router, Redirect } from 'react-router-dom';
import { store } from './store/create.store';
import * as history from 'history';
const myHistory = history.createBrowserHistory();

import HeaderContainer from './features/header/header.container';
import BasketContainer from './features/basket/basket.container';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>

        <Router history={myHistory}>
          <div>
            <HeaderContainer history={myHistory} />
            <Switch>
              <Route exact={true} path="/" component={ToyListContainer} />
              <Route path="/basket" component={BasketContainer} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>

      </Provider>
    );
  }
}

export default App;
