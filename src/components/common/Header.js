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
      <Content>
        <Grid justify="space-between" padding="16px 0">
          <Grid isFlex>
            {_back && (
              <>
                <Grid margin="0 13px 0 0">
                  <Icon src={left} onClick={() => history.go(-1)} />
                </Grid>
              </>
            )}
            {_content && (
              <Text fontSize="18px" bold>
                {_content}
              </Text>
            )}
          </Grid>
          <Grid isFlex>
            {_map && (
              <Grid margin="0 20px 0 0">
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
        </Grid>
      </Content>
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
`;

const Content = styled.div`
  display: flex;
`;

// const Icon = styled.div`
//   cursor: pointer;
//   color: #000;
//   font-size: 24px;
//   position: absolute;
//   top: 16px;
//   ${props => props.left && `left:${props.left}`};
//   ${props => props.right && `right:${props.right}`};
// `;

// const ContentArea = styled.div`
//   position: absolute;
//   top: 16px;
//   ${props => (props.back ? `left:52px` : 'left: 24px')};
// `;
const Icon = styled.img`
  width: 24px;
  ${props => props.margin && `margin:${props.margin}`};
  vertical-align: text-bottom;
`;

export default Header;
