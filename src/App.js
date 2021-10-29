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
import DetailMap from './pages/DetailMap';
import SearchTypeList from './pages/SearchTypeList';
import SearchList from './pages/SearchList';
import SelectedType from './pages/SelectedType';
import Detail from './pages/Detail';
import Navbar from './components/Navbar';

function App() {
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/ui" exact component={UI} />
          <Route path="/map" exact component={DetailMap} />
          <Route path="/searchtypelist" exact component={SearchTypeList} />
          <Route path="/searchlist" exact component={SearchList} />
          <Route path="/selectedtype" exact component={SelectedType} />
          <Route path="/detail" exact component={Detail} />
        </Switch>
        <Navbar />
      </ThemeProvider>
    </ConnectedRouter>
  );
}

export default App;
