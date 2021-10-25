import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/configureStore';
import Test from './pages/TestPage';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Test} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
