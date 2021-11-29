/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';
import LangModal from './LangModal';
import { setModalOn } from '../../redux/modules/userSlice';
import { Grid, Text } from '../../elements/index';
import { map, close, heartFilled, share, settings } from '../../images/index';
import { ReactComponent as LeftIcon } from '../../images/ic-left.svg';
import { ReactComponent as Search } from '../../images/Icon/ic_header_search.svg';
import { ReactComponent as Language } from '../../images/nav/ic_nav_language.svg';

const Header = props => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(state => state.user.modalStatus);
  const {
    _onBg,
    _back,
    _replace,
    _search,
    _content,
    _map,
    _close,
    _like,
    _share,
    _color,
    _settings,
    _language,
    _onTop,
    _main,
  } = props;

  const gotoMapPage = () => {
    const { search, pathname } = history.location;
    const pathArr = pathname.split('/');
    const type = pathArr[pathArr.length - 1];
    history.push(`/place-map/${type}${search}`);
  };
  const gotoSearchPage = () => {
    history.push('/search');
  };
  const gotoSettingPage = () => {
    history.push('/setting');
  };
  const openLangModal = () => {
    dispatch(setModalOn());
  };
  const goBack = () => {
    history.goBack();
  };
  const goReplace = () => {
    history.replace('/');
  };

  if (_main) {
    return (
      <ContentBgArea OnTop={_onTop}>
        <Content>
          <Grid isFlex width="100%">
            {_content && (
              <Text fontSize="18px" bold color={_onTop ? _color : '#000'}>
                {_content}
              </Text>
            )}
          </Grid>
          <Grid isFlex width="100%" justifyContent="flex-end">
            {_search && (
              <Grid margin="0 13px 0 0" _onClick={gotoSearchPage}>
                <IconArea color={_onTop ? _color : '#000'}>
                  <Search />
                </IconArea>
              </Grid>
            )}
            {_language && (
              <Grid _onClick={openLangModal}>
                <IconArea color={_onTop ? _color : '#000'}>
                  <Language />
                </IconArea>
              </Grid>
            )}
          </Grid>
          {modalStatus === true && <LangModal />}
        </Content>
      </ContentBgArea>
    );
  }

  if (_onBg) {
    return (
      <ContentArea>
        <Content>
          <Grid isFlex width="100%">
            {_replace && (
              <Grid margin="0 13px 0 0">
                <IconArea onClick={goReplace} color={_color}>
                  <LeftIcon />
                </IconArea>
              </Grid>
            )}
            {_back && (
              <Grid margin="0 13px 0 0">
                <IconArea onClick={goBack} color={_color}>
                  <LeftIcon />
                </IconArea>
              </Grid>
            )}
            {_content && (
              <Text fontSize="18px" bold color={_color}>
                {_content}
              </Text>
            )}
          </Grid>
          <Grid isFlex width="100%" justifyContent="flex-end">
            {_map && (
              <Grid margin="0 12px 0 0">
                <Icon src={map} />
              </Grid>
            )}
            {_search && (
              <Grid margin="0 13px 0 0" _onClick={gotoSearchPage}>
                <IconArea color={_color}>
                  <Search />
                </IconArea>
              </Grid>
            )}
            {_close && (
              <Grid>
                <Icon src={close} />
              </Grid>
            )}
            {_like && (
              <Grid>
                <Icon src={heartFilled} />
              </Grid>
            )}
            {_share && (
              <Grid>
                <Icon src={share} />
              </Grid>
            )}
            {_settings && (
              <Grid>
                <IconArea>
                  <Icon src={settings} onClick={gotoSettingPage} />
                </IconArea>
              </Grid>
            )}
            {_language && (
              <Grid _onClick={openLangModal}>
                <IconArea color={_color}>
                  <Language />
                </IconArea>
              </Grid>
            )}
          </Grid>
          {modalStatus === true && <LangModal />}
        </Content>
      </ContentArea>
    );
  }
  return (
    <HeaderBar>
      <ContentArea>
        <Content>
          <Grid isFlex width="100%">
            {_replace && (
              <Grid margin="0 13px 0 0">
                <IconArea onClick={goReplace} color={_color}>
                  <LeftIcon />
                </IconArea>
              </Grid>
            )}
            {_back && (
              <Grid margin="0 13px 0 0">
                <IconArea onClick={goBack} color={_color}>
                  <LeftIcon />
                </IconArea>
              </Grid>
            )}
            {_content && (
              <Text fontSize="18px" bold>
                {_content}
              </Text>
            )}
          </Grid>
          <Grid isFlex width="100%" justifyContent="flex-end">
            {_map && (
              <Grid margin="0 12px 0 0" _onClick={gotoMapPage}>
                <Icon src={map} />
              </Grid>
            )}
            {_search && (
              <Grid margin="0 13px 0 0" _onClick={gotoSearchPage}>
                <IconArea>
                  <Search />
                </IconArea>
              </Grid>
            )}
            {_close && (
              <Grid>
                <Icon src={close} />
              </Grid>
            )}
            {_like && (
              <Grid>
                <Icon src={heartFilled} />
              </Grid>
            )}
            {_share && (
              <Grid>
                <Icon src={share} />
              </Grid>
            )}
            {_settings && (
              <Grid>
                <IconArea>
                  <Icon src={settings} onClick={gotoSettingPage} />
                </IconArea>
              </Grid>
            )}
            {_language && (
              <Grid _onClick={openLangModal}>
                <IconArea color={_color}>
                  <Language />
                </IconArea>
              </Grid>
            )}
          </Grid>
          {modalStatus === true && <LangModal />}
        </Content>
      </ContentArea>
    </HeaderBar>
  );
};

Header.defaultProps = {
  _back: false,
  _search: false,
  _text: null,
  _map: false,
  _close: false,
  _color: '#212529',
  padding: false,
};

const HeaderBar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  box-shadow: 0px 2px 3px rgb(196 196 196 / 25%);
  background-color: #fff;
  z-index: 4;
`;

const ContentArea = styled.div`
  max-width: 768px;
  height: 66px;
  min-height: 66px;
  margin: 0 auto;
  padding: 0 26px 0 24px;
  z-index: 4;
`;

const ContentBgArea = styled.div`
  max-width: 768px;
  height: 66px;
  min-height: 66px;
  margin: 0 auto;
  padding: 0 26px 0 24px;
  z-index: 9;
  position: sticky;
  top: 0;
  background-color: ${props => (props.OnTop ? '' : '#fff')};
`;

const Content = styled.div`
  display: flex;
  max-width: 768px;
  height: 66px;
  min-height: 66px;
  z-index: 4;
`;

const Icon = styled.img`
  width: 24px;
  margin: ${({ margin }) => margin || '0'};
  vertical-align: text-bottom;
  cursor: pointer;
`;

const IconArea = styled.div`
  display: flex;
  align-items: center;
  width: 24px;
  cursor: pointer;
  svg {
    fill: ${({ color }) => color || '#212529'};
  }
`;

export default Header;
