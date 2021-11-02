/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import { history } from './redux/configureStore';

import Main from './pages/Main';
import UI from './pages/UI';
import theme from './styles/theme';
import PlaceMap from './pages/PlaceMap';
import SelectTypeResult from './pages/SelectTypeResult';
import PlaceList from './pages/PlaceList';
import SelectType from './pages/SelectType';
import PlaceDetail from './pages/PlaceDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Navbar from './components/Navbar';

function App() {
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/ui" exact component={UI} />
          <Route path="/select-type" exact component={SelectType} />
          <Route
            path="/select-type/result"
            exact
            component={SelectTypeResult}
          />
          <Route path="/place/map" exact component={PlaceMap} />
          <Route path="/place/list" exact component={PlaceList} />
          <Route path="/place/detail/:id" exact component={PlaceDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
        {/* <Navbar /> */}
      </ThemeProvider>
    </ConnectedRouter>
  );
}

export default App;
