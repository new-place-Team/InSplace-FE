/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';
import { Grid, Text } from '../../elements/index';
import {
  left,
  map,
  search,
  close,
  heartFilled,
  share,
} from '../../images/index';

const Header = props => {
  const { _back, _search, _content, _map, _close, _like, _share } = props;

  return (
    <HeaderBar>
      <ContentArea>
        <Content>
          <Grid isFlex width="100%">
            {_back && (
              <Grid margin="0 13px 0 0">
                <Icon src={left} onClick={() => history.go(-1)} />
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
              <Grid margin="0 12px 0 0">
                <Icon src={map} />
              </Grid>
            )}
            {_search && (
              <Grid>
                <Icon src={search} />
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
          </Grid>
        </Content>
      </ContentArea>
    </HeaderBar>
  );
};

Header.defaultProps = {
  back: false,
  search: false,
  text: null,
  map: false,
  close: false,
};

const HeaderBar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  box-shadow: 0px 2px 3px rgb(196 196 196 / 25%);
  background-color: #fff;
  z-index: 3;
`;

const ContentArea = styled.div`
  max-width: 768px;
  height: 66px;
  min-height: 66px;
  margin: 0 auto;
  padding: 0 26px 0 24px;
`;

const Content = styled.div`
  display: flex;
  max-width: 768px;
  height: 66px;
  min-height: 66px;
`;

const Icon = styled.img`
  width: 24px;
  margin: ${({ margin }) => margin || '0'};
  vertical-align: text-bottom;
`;

export default Header;
