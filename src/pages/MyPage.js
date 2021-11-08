import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import { Button, Container, Grid, Image, Text } from '../elements';
import sunBg from '../images/weather/sun1.jpg';
import Navbar from '../components/common/Navbar';

import { right, mypageNext, profile1 } from '../images/index';
import { history } from '../redux/configureStore';

const MyPage = () => {
  const userInfo = useSelector(state => state.user.userInfo);

  return (
    <>
      <Container padding="0" height="100vh">
        <Header _onBg _content="MyPage" _settings _color="#fff" />
        <Bg src={sunBg} />
        <Grid isFlex justify="center" padding="59px 40px">
          <Image type="circle" width="169px" height="169px" src={profile1} />
          <Grid flex margin="0 0 0 36px">
            <Grid isFlex>
              <Text fontSize="28px" bold color="#282828" margin="0 20px 0 0">
                홍길동
              </Text>
              <Button _onClick={() => history.push(`/mypage/1`)}>
                <Image width="24px" height="24px" src={right} />
              </Button>
            </Grid>
            <Grid isFlex>
              <Text fontSize="13px" color="#3E4042" margin="0 11px 0 0" bold>
                ESFP
              </Text>
              <Text fontSize="13px" color="#3E4042">
                mida@gmail.com
              </Text>
            </Grid>
          </Grid>
        </Grid>
        {/* 인포 그리드 */}
        <InfoGrid>
          <Info>
            <Text>공지사항</Text>
            <BottomBox>
              <Image src={mypageNext} />
            </BottomBox>
          </Info>
          <Info>
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
          <Info>
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

// const InfoGrid = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   position: relative;
//   background-color: #fff;
//   @media (max-width: 1024px) {
//     width: 95%;
//     height: 873px;
//   }
//   @media (max-width: 767px) {
//     width: 95%;
//     height: 420px;
//   }
// `;

// const Info = styled.div`
//   width: 350px;
//   height: 438px;
//   border: 1px solid #e6e9ec;
//   border-bottom: none;
//   @media (max-width: 767px) {
//     width: 178px;
//     height: 210px;
//   }
// `;
