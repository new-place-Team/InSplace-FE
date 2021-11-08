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
  console.log('userInfo = ', userInfo);
  return (
    <>
      <Container padding="0">
        <Header _onBg _content="MyPage" _settings _color="#fff" />
        <Bg src={sunBg} />
        <Grid isFlex justify="center" padding="59px 40px">
          <Image type="circle" width="169px" height="169px" src={profile1} />
          <Grid flex margin="0 0 0 36px">
            <Grid isFlex>
              <Text fontSize="28px" bold color="#282828" margin="0 20px 0 0">
                {userInfo.nickname}
              </Text>
              <Button
                _onClick={() => history.push(`/mypage/${userInfo.userId}`)}
              >
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
            <BottomBox>
              <TextBox>V1.0.2</TextBox>
            </BottomBox>
          </Info>

          <Info>
            <Text>후원</Text>
            <BottomBox />
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
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 auto;
  padding-bottom: 66px;
`;

const Info = styled.div`
  position: relative;
  width: 50%;
  height: 265px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #e6e9ec;

  @media (max-width: 500px) {
    min-height: 180px;
    height: auto;
  }
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  padding-bottom: 16px;
  img {
    width: 66px;
  }
  @media (max-width: 500px) {
    img {
      width: 32px;
    }
  }
  /* position: absolute;
  bottom: 7%;
  right: 7%; */
`;
const TextBox = styled.p`
  width: 100%;
  height: 66px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 22px;
  font-weight: bold;
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
