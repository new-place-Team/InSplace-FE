import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Grid, Text } from '../../elements';
import { setModalOff } from '../../redux/modules/userSlice';
import { ReactComponent as CloseBtn } from '../../images/Icon/ic_close.svg';

const LangModal = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const korean = () => {
    i18n.changeLanguage('ko-KR');
    console.log('modal kr');
    dispatch(setModalOff());
  };
  const american = () => {
    i18n.changeLanguage('en-US');
    console.log('modal us');
    dispatch(setModalOff());
  };

  const onClose = () => {
    dispatch(setModalOff());
  };

  return (
    <>
      <Overlay>
        {/* <Grid> */}
        <ModalContent>
          <Grid
            width="100%"
            isFlex
            padding="10px 20px"
            _onClick={american}
            cursor="true"
          >
            <Grid
              margin="0 10px 0 0"
              bg="black"
              width="28px"
              height="28px"
              isFlex
              justify="center"
            >
              <Text color="#fff">A</Text>
            </Grid>
            <Grid flex>English</Grid>
          </Grid>
          {/* <Grid
            width="100%"
            isFlex
            padding="10px 20px"
            _onClick={() => {
              window.alert('서비스 준비중입니다.');
            }}
            cursor
          >
            <Grid
              margin="0 10px 0 0"
              bg="black"
              width="28px"
              height="28px"
              isFlex
              justify="center"
            >
              <Text color="#fff">와</Text>
            </Grid>
            <Grid flex>일본어</Grid>
          </Grid> */}
          <Grid
            width="100%"
            isFlex
            padding="10px 20px"
            _onClick={korean}
            cursor="true"
          >
            <Grid
              margin="0 10px 0 0"
              bg="black"
              width="28px"
              height="28px"
              isFlex
              justify="center"
            >
              <Text color="#fff">가</Text>
            </Grid>
            <Grid flex>한국어</Grid>
          </Grid>
          <Icon onClick={() => onClose()}>
            <CloseBtn />
          </Icon>
        </ModalContent>
        {/* </Grid> */}
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.48);
  z-index: 10;
`;

const ModalContent = styled.div`
  position: absolute;
  border: 2px solid yellow;
  /* top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  padding: 14px;
  font-size: 20px; */
`;

const Icon = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 24px;
  height: 24px;
  svg {
    fill: #000;
  }
  cursor: pointer;
`;

export default LangModal;
