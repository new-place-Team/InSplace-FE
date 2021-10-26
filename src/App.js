import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/configureStore';
import Test from './pages/TestPage';
import Main from './pages/Main';
import UI from './pages/UI';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/main" exact component={Main} />
        <Route path="/ui" exact component={UI} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
