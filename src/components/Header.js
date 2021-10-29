/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { Grid, Text } from '../elements/index';
import { chevronLeft, map, search, close } from '../images/index';

const Header = props => {
  const { _type, _back, _search, _content, _map, _close } = props;
  const type = _type === 'search';

  return (
    <>
      {type ? (
        <Grid justify="space-between" padding="16px 0">
          <Grid isFlex>
            {_back && (
              <>
                <Grid>
                  <Icon src={chevronLeft} onClick={() => history.go(-1)} />
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
              <Grid>
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
          </Grid>
        </Grid>
      ) : (
        <Grid justify="space-between" padding="16px 0">
          <Grid isFlex>
            {_back && (
              <Grid>
                <Icon src={chevronLeft} />
              </Grid>
            )}
            {_content && (
              <Text fontSize="18px" bold>
                {_content}
              </Text>
            )}
            {_map && (
              <Grid>
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
          </Grid>
        </Grid>
      )}
    </>
  );
};

Header.defaultProps = {
  back: false,
  search: false,
  text: null,
  map: false,
  close: false,
};

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
