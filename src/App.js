/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import { history } from './redux/configureStore';
import { getTokenYn } from './shared/utils';
import { logInCheckDB } from './redux/async/user';
// import { getCurrentCoordinate } from './redux/modules/placeSlice';
// eslint-disable-next-line import/named
import { getCurrentCoordinateWEB } from './redux/async/place';

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
import ReviewWrite from './pages/ReviewWrite';
import MyPage from './pages/MyPage';
import MyPageEdit from './pages/MyPageEdit';
import Kakao from './components/common/Kakao';
import Pick from './pages/Pick';
import Notification from './pages/Notification';
import SearchPage from './pages/SearchPage';
import Setting from './pages/Setting';
// import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch();
  const location = useSelector(state => state.place.location);

  useEffect(() => {
    // 새로고침 했을때 토큰이 있으면 로그인 체크
    if (!location) {
      dispatch(getCurrentCoordinateWEB());
    }
    // 현재위치를 받아보자!
    if (getTokenYn()) {
      dispatch(logInCheckDB());
    }
  }, []);

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
          <Route path="/search" exact component={SearchPage} />
          <Route path="/place/map" exact component={PlaceMap} />
          <Route path="/place/list/:params" exact component={PlaceList} />
          <Route path="/place/detail/:id" exact component={PlaceDetail} />
          <Route path="/review/write/:id" exact component={ReviewWrite} />
          <Route path="/review/edit/:id" exact component={ReviewWrite} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/mypage/:id" exact component={MyPageEdit} />
          <Route path="/users/kakao/auth" exact component={Kakao} />
          <Route path="/picklist" exact component={Pick} />
          <Route path="/setting" exact component={Setting} />
          <Route path="/notification" exact component={Notification} />
        </Switch>
        {/* <Navbar /> */}
      </ThemeProvider>
    </ConnectedRouter>
  );
}

export default App;
