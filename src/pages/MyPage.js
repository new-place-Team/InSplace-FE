import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import { Button, Container, Grid, Image, Text } from '../elements';
import snowBg from '../images/weather/snow1.jpg';
import { right, mypageNext } from '../images/index';
import { history } from '../redux/configureStore';

const MyPage = () => {
  return (
    <Container padding="0" height="100%">
      <Header _back _onBg _content="MyPage" _search _color="#fff" />
      <Bg src={snowBg} />
      <Grid justify="space-between" padding="59px 41px">
        <Image type="circle" width="169px" height="169px" />
        <Grid flex margin="0 0 0 54px">
          <Grid isFlex>
            <Text fontSize="28px" bold color="#282828" margin="0 20px 0 0">
              홍길동
            </Text>
            <Button _onClick={() => history.push(`/mypage/1`)}>
              <Image width="24px" height="24px" src={right} />
            </Button>
          </Grid>
          <Grid isFlex>
            <Text fontSize="18px" color="#3E4042" margin="0 11px 0 0" bold>
              ESFP
            </Text>
            <Text fontSize="18px" color="#3E4042">
              mida@gmail.com
            </Text>
          </Grid>
        </Grid>
      </Grid>
      <InfoGrid>
        <Info>
          <Text fontSize="26px" bold color="#3E4042">
            공지사항
          </Text>
          <BottomBox>
            <Image width="66px" height="62px" src={mypageNext} />
          </BottomBox>
        </Info>
        <Info>
          <Text fontSize="26px" bold color="#3E4042">
            의견보내기
          </Text>
          <BottomBox>
            <Image width="66px" height="62px" src={mypageNext} />
          </BottomBox>
        </Info>
        <Info>
          <Text fontSize="26px" bold color="#3E4042">
            버전정보
          </Text>
          <BottomBox>
            <Text fontSize="22px" bold color="#3E4042">
              V1.0.0
            </Text>
          </BottomBox>
        </Info>
        <Info>
          <Text fontSize="26px" bold color="#3E4042">
            후원
          </Text>
        </Info>
      </InfoGrid>
    </Container>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  top: 0px;
  left: 41px;
  z-index: 10;
  width: calc(100% - 41px);
  background-color: #fff;
`;

const Info = styled.div`
  width: 50%;
  height: 436px;
  padding: 48px 40px 48px 50px;
  border: 1px solid #e6e9ec;
  border-bottom: none;
`;

const BottomBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  padding-bottom: 33px;
  &:hover {
    cursor: pointer;
  }
`;

export default MyPage;
