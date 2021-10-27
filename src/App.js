/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/configureStore';
import Test from './pages/TestPage';

function App() {
  console.log('첫 스타트! 1');
  useEffect(() => {
    console.log('2');
  }, []);
  console.log('컴포넌트 렌더링3');
  console.log('컴포넌트 렌더링4');
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Test} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
