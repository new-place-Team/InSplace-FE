/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import { history } from './redux/configureStore';
import Main from './pages/Main';
import UI from './pages/UI';
import theme from './styles/theme';
import MapCard from './components/MapCard';
import SearchTypeList from './pages/SearchTypeList';
import SearchList from './pages/SearchList';

function App() {
  // console.log('첫 스타트! 1');
  // useEffect(() => {
  //   console.log('2');
  // }, []);
  // console.log('컴포넌트 렌더링3');
  // console.log('컴포넌트 렌더링4');
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/ui" exact component={UI} />
          <Route path="/map" exact component={MapCard} />
          <Route path="/searchtypelist" exact component={SearchTypeList} />
          <Route path="/searchlist" exact component={SearchList} />
        </Switch>
      </ThemeProvider>
    </ConnectedRouter>
  );
}

export default App;
