/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import { history } from '../redux/configureStore';
import { getToken } from '../shared/utils';
import Navbar from '../components/common/Navbar';
import { Button, Container, Grid, Image, Text } from '../elements';
import sunBg from '../images/weather/sun1.jpg';
import { right, mypageNext, profile1 } from '../images/index';

const MyPage = () => {
  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  if (!getToken()) {
    window.alert('로그인을 해주세요!');
    history.push('/login');
  }
  const gotoDetailPage = () => {
    if (!getToken()) {
      window.alert('로그인을 해주세요!');
      history.push('/login');
    } else {
      history.push(`/mypage/1`);
    }
  };

  return (
    <>
      <Container padding="0" height="100vh">
        <Header _onBg _content="MyPage" _settings />
        <Bg src={sunBg} />
        <Grid isFlex justify="center" padding="59px 40px">
          <Image type="circle" width="169px" height="169px" src={profile1} />
          <Grid flex margin="0 0 0 36px">
            <Grid isFlex>
              <Text fontSize="28px" bold color="#282828" margin="0 20px 0 0">
                {userInfo.nickname}
              </Text>
              <Button _onClick={gotoDetailPage}>
                <Image width="24px" height="24px" src={right} />
              </Button>
            </Grid>
            <Grid isFlex>
              <Text fontSize="13px" color="#3E4042" margin="0 11px 0 0" bold>
                {userInfo.mbti}
              </Text>
              <Text fontSize="13px" color="#3E4042">
                {userInfo.email}
              </Text>
            </Grid>
          </Grid>
        </Grid>
        {/* 인포 그리드 */}
        <InfoGrid>
          <Info
            onClick={() => {
              window.alert('서비스 준비중입니다.');
            }}
          >
            <Text>공지사항</Text>
            <BottomBox>
              <Image src={mypageNext} />
            </BottomBox>
          </Info>
          <Info
            onClick={() => {
              window.alert('서비스 준비중입니다.');
            }}
          >
            <Text>의견보내기</Text>
            <BottomBox>
              <Image src={mypageNext} />
            </BottomBox>
          </Info>
          <Info>
            <Text>버전정보</Text>
            <BottomText>
              <Text>V1.0.2</Text>
            </BottomText>
          </Info>
          <Info
            onClick={() => {
              window.alert('서비스 준비중입니다.');
            }}
          >
            <Text>후원</Text>
          </Info>
        </InfoGrid>
      </Container>
      <Navbar />
    </>
  );
};
const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-image: url('${props => props.src}');
  background-size: cover;
  z-index: -1;
`;

const InfoGrid = styled.div`
  width: 95%;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 auto;
  position: absolute;
  right: 0;
  bottom: 65px;
`;

const Info = styled.div`
  width: 50%;
  height: 225px;
  padding: 24px;
  background-color: #fff;
  position: relative;
  border: 1px solid #e6e9ec;
  @media (min-width: 768px) {
    height: 320px;
  }
`;

const BottomBox = styled.div`
  width: 34px;
  position: absolute;
  bottom: 7%;
  right: 7%;
`;

const BottomText = styled.div`
  position: absolute;
  bottom: 7%;
  right: 7%;
`;

export default MyPage;
