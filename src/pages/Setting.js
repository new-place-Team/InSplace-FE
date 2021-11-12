/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Header from '../components/common/Header';
import { Container, Text, Grid } from '../elements';
// import { history } from '../redux/configureStore';

import { logOut } from '../redux/modules/userSlice';
import { unRegisterDB } from '../redux/async/user';

const Setting = () => {
  const dispatch = useDispatch();
  const goLogoOut = () => {
    dispatch(logOut());
    window.location.href = '/';
  };
  const goUnRegister = () => {
    dispatch(unRegisterDB());
  };
  return (
    <>
      <Header _back _content="설정" />
      <Container padding="66px 0 0 0">
        <Grid padding="0 20px">
          <MBTIDiv onClick={goLogoOut}>
            <Text>로그아웃</Text>
          </MBTIDiv>

          <MBTIDiv onClick={goUnRegister}>
            <Text>회원탈퇴</Text>
          </MBTIDiv>
        </Grid>
      </Container>
    </>
  );
};

const MBTIDiv = styled.div`
  width: 100%;
  height: 4rem;
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  color: white;
  display: flex;
  align-items: center;
`;

export default Setting;
