import * as React from 'react';
import ToyListContainer from './features/toy-list/toy-list.container';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/create.store';
import HeaderContainer from './features/header/header.container';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>

        <Router>
          <div>
            <HeaderContainer />
            <Switch>
              <Route exact={true} path="/" component={ToyListContainer} />
              <Route component={ToyListContainer} />
            </Switch>
          </div>
        </Router>

      </Provider>
    );
  }

}

export default App;
