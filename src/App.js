import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import Analytics from 'react-router-ga';
import ReactGA from 'react-ga';
import { history } from './redux/configureStore';
import { getTokenYn } from './shared/utils';
import { logInCheckDB } from './redux/async/user';
import { getCurrentCoordinateWEB, getWeatherDB } from './redux/async/place';

import Main from './pages/Main';
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
import NavMapPage from './pages/NavMapPage';

function App() {
  const dispatch = useDispatch();
  const location = useSelector(state => state.place.location);
  const weatherStatus = useSelector(state => state.place.weatherStatus);
  /* 구글 애널리틱스 */
  const TRACKING_ID = 'UA-213812312-1';
  ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    // 현재위치를 받아보자
    if (!location) {
      const lang = window.navigator.language;
      dispatch(getCurrentCoordinateWEB(lang));
    }
    // 새로고침 했을때 토큰이 있으면 로그인 체크
    if (getTokenYn()) {
      dispatch(logInCheckDB());
    }
    // 날씨 정보를 따로 받아와서 리덕스에 저장.
    if (!weatherStatus) {
      dispatch(getWeatherDB());
    }
  }, []);

  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Analytics id="UA-213812312-1" debug>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/select-type" exact component={SelectType} />
            <Route
              path="/select-type/result"
              exact
              component={SelectTypeResult}
            />
            <Route path="/search" exact component={SearchPage} />
            <Route path="/place-map/:type" exact component={PlaceMap} />
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
            <Route path="/location" exact component={NavMapPage} />
          </Switch>
        </Analytics>
      </ThemeProvider>
    </ConnectedRouter>
  );
}

export default App;
