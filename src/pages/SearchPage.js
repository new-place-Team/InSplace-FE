import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { ReactComponent as LeftIcon } from '../images/ic-left.svg';
import { history } from '../redux/configureStore';

const SearchPage = () => {
  const [state, setState] = useState('');
  const onChange = e => {
    setState(e.target.value);
  };
  const GotoSearchPage = () => {
    const params = `total?result=${state}`;
    history.push(`/place/list/${params}`);
    setState('');
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <HeaderBar>
      <Content>
        <Grid isFlex width="100%">
          <Grid margin="0 13px 0 0" _onClick={goBack}>
            <IconArea>
              <LeftIcon />
            </IconArea>
          </Grid>
          <Grid flex>
            <Input
              value={state}
              placeholder="어떤 장소가 궁금하세요?"
              onChange={onChange}
              onKeyPress={e => e.key === 'Enter' && GotoSearchPage(e)}
            />
          </Grid>
        </Grid>
      </Content>
    </HeaderBar>
  );
};
const HeaderBar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  box-shadow: 0px 2px 3px rgb(196 196 196 / 25%);
  background-color: #fff;
  z-index: 3;
`;
const Content = styled.div`
  display: flex;
  max-width: 768px;
  height: 66px;
  min-height: 66px;
  margin: 0 auto;
`;

const IconArea = styled.div`
  width: 24px;
  cursor: pointer;
  svg {
    fill: ${({ color }) => color || '#212529'};
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 18px;
  font-weight: 600;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c2c6cb;
  }
`;
export default SearchPage;
