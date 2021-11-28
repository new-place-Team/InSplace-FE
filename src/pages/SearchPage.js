import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Grid, Image, Text } from '../elements';
import { ReactComponent as LeftIcon } from '../images/ic-left.svg';
import { history } from '../redux/configureStore';
import { placeSearch } from '../images';
import { setPlaceListInit } from '../redux/modules/placeSlice';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState('');
  const onChange = e => {
    setState(e.target.value);
  };
  const inputRef = useRef(null);

  const GotoSearchPage = () => {
    const params = `total?result=${state}`;
    dispatch(setPlaceListInit());

    history.push(`/place/list/${params}`);
    setState('');
  };

  const goBack = () => {
    history.replace('/');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
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
                placeholder={t('SearchPlace.placeholder')}
                onChange={onChange}
                ref={inputRef}
                onKeyPress={e => e.key === 'Enter' && GotoSearchPage(e)}
              />
            </Grid>
          </Grid>
        </Content>
      </HeaderBar>
      <Container>
        <ImageContainer>
          <Image src={placeSearch} />
          <Text color="#3E4042">{t('SearchPlace.text')}</Text>
        </ImageContainer>
      </Container>
    </>
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
  padding: 0 26px 0 8px;
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

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  img {
    width: 461px;
    display: block;
  }
  @media (max-width: 500px) {
    img {
      width: 100%;
    }
  }
`;

export default SearchPage;
