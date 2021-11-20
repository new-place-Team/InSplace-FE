import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Grid, Text, Image, Button } from '../../elements';
import { setModalOff } from '../../redux/modules/userSlice';

const LangModal = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const modaloff = () => {
    dispatch(setModalOff());
  };
  const korean = () => {
    i18n.changeLanguage('ko-KR');
    dispatch(setModalOff());
  };
  const american = () => {
    i18n.changeLanguage('en-US');
    dispatch(setModalOff());
  };

  return (
    <>
      <Overlay>
        {/* <Grid> */}
        <ModalContent>
          <Grid width="100%" isFlex padding="10px 20px" _onClick={american}>
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
          <Grid
            width="100%"
            isFlex
            padding="10px 20px"
            _onClick={() => {
              window.alert('서비스 준비중입니다.');
            }}
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
          </Grid>
          <Grid width="100%" isFlex padding="10px 20px" _onClick={korean}>
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
        </ModalContent>
        {/* </Grid> */}
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.55);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  padding: 14px;
  font-size: 20px;
`;

export default LangModal;
