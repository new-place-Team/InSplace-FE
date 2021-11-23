/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { getTokenYn } from '../shared/utils';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { whiteRight, mypageNext } from '../images/index';
import { Button, Container, Grid, Image } from '../elements';
import sunbg from '../images/weather/sun_main_1x.jpg';
import cloudbg from '../images/weather/cloud_main_1x.jpg';
import snowbg from '../images/weather/snow_main_1x.png';
import rainbg from '../images/weather/rain_main_1x.png';
import ConfirmModal from '../components/common/ConfirmModal';
import CommonModal from '../components/common/CommonModal';
import {
  setCommonModalOn,
  setFeedbackModalOn,
} from '../redux/modules/commonSlice';

const MyPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const [loginModal, setLoginModal] = useState(false);
  const modalStatus = useSelector(state => state.common.modalStatus);
  const feedbackStatus = useSelector(state => state.common.feedbackStatus);
  const weatherInfo = useSelector(state => state.place.weatherStatus);
  const { t } = useTranslation();

  const pageMove = () => {
    history.push('/login');
  };
  useEffect(() => {
    if (getTokenYn() === false) {
      setLoginModal(true);
    }
  }, []);
  /* 프로필 수정 페이지로 이동, 이동시 state 같이 전달 */
  const gotoDetailPage = () => {
    if (getTokenYn() === false) {
      setLoginModal(true);
    } else {
      history.push({
        pathname: `/mypage/${userInfo.userId}`,
        state: { userInfo },
      });
    }
  };

  const showModal = () => {
    const params = {
      title: t('MyPage.Modal.service'),
    };
    dispatch(setCommonModalOn(params));
  };

  const feedbackModal = () => {
    dispatch(setFeedbackModalOn());
  };
  let weatherbg;
  if (weatherInfo) {
    if (weatherInfo.frontWeather === 2) {
      weatherbg = rainbg;
    } else if (weatherInfo.frontWeather === 3) {
      weatherbg = snowbg;
    } else if (weatherInfo.frontWeather === 4) {
      weatherbg = cloudbg;
    } else {
      weatherbg = sunbg;
    }
  } else {
    weatherbg = sunbg;
  }

  return (
    <>
      {loginModal && (
        <ConfirmModal
          title={t('MyPage.Modal.goLogin')}
          setModal={setLoginModal}
          isOk
          pageMove={pageMove}
        />
      )}
      {modalStatus && <CommonModal />}
      {feedbackStatus && <CommonModal type="feedback" />}
      <Container padding="0" height="100%">
        <Header _onBg _content="MyPage" _settings _color="#fff" />
        <Bg src={weatherbg}>
          <MyPageInfoGrid>
            <MyPageFrofile>
              <Image
                type="circle"
                width="100%"
                height="100%"
                src={userInfo.userImage}
              />
            </MyPageFrofile>
            <UserInfoGrid>
              <Grid isFlex margin="0 0 17px 0" border="2px solid ornage">
                <Nicname>{userInfo.nickname}</Nicname>
                <Button _onClick={gotoDetailPage}>
                  <Image width="24px" height="24px" src={whiteRight} />
                </Button>
              </Grid>
              <Grid isFlex>
                {userInfo.mbti === '모름' ? null : <Mbti>{userInfo.mbti}</Mbti>}
                <Email>{userInfo.email}</Email>
              </Grid>
            </UserInfoGrid>
          </MyPageInfoGrid>
          <InfoGrid>
            <Info onClick={showModal}>
              <Title>{t('MyPage.UpdateIssue')}</Title>
              <BottomBox>
                <TextBox>
                  <MyPageIcon src={mypageNext} />
                </TextBox>
              </BottomBox>
            </Info>
            <Info onClick={feedbackModal}>
              <Title>{t('MyPage.Opinion')}</Title>
              <BottomBox>
                <TextBox>
                  <MyPageIcon src={mypageNext} />
                </TextBox>
              </BottomBox>
            </Info>
            <Info>
              <Title>{t('MyPage.Version')}</Title>
              <BottomBox>
                <TextBox>V1.0.0</TextBox>
              </BottomBox>
            </Info>
            <Info>
              <Title>{t('MyPage.Donation')}</Title>
              <BottomBox>
                <TextBox>
                  <Bank>카카오뱅크</Bank>
                  <BankNumber>7979-39-23429</BankNumber>
                </TextBox>
              </BottomBox>
            </Info>
            <InfoNav />
          </InfoGrid>
        </Bg>
      </Container>
      <Navbar />
    </>
  );
};
const Bg = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  z-index: -1;
  overflow-x: hidden;
`;
const MyPageInfoGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  width: 95.4%;
  height: auto;
  margin: 80px 0 52px auto;

  @media (max-width: 415px) {
    margin: 50px 0 30px auto;
  }
`;
const UserInfoGrid = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0px 10px 0px 46px;
  @media (max-width: 415px) {
    padding: 0px 10px 0px 24px;
  }
`;
const MyPageFrofile = styled.div`
  display: flex;
  align-items: center;
  width: 172px;
  height: 172px;
`;
const InfoGrid = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 95.4%;
  height: calc(100% / 30%) * 100;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 auto;
  cursor: pointer;
  overflow-y: hidden;
`;
const InfoNav = styled.div`
  width: 100%;
  height: 65px;
`;
const Info = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  padding: 48px 40px 20px;
  background-color: #fff;
  border: 1px solid #e6e9ec;
  @media (max-width: 415px) {
    padding: 24px 24px 10px;
  }
  @media (max-width: 375px) {
    padding: 54px 24px 10px;
  }
`;

const Nicname = styled.h3`
  margin-right: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #fff;
`;
const Mbti = styled.p`
  margin-right: 11px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.0024em;
  color: #fff;
`;
const Email = styled.p`
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.0041em;
  color: #fff;
`;
const Title = styled.h5`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.0036em;
  color: #3e4042;
  @media (max-width: 415px) {
    font-size: 1.3rem;
  }
`;
const BottomBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  height: 100%;
  padding: 30px 0 10px 0;
  @media (max-width: 415px) {
    padding: 50px 0 10px 0;
  }
  img {
    @media (max-width: 415px) {
      width: 32px;
    }
  }
`;
const TextBox = styled.p`
  width: 100%;
  height: 66px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  font-size: 22px;
  font-weight: bold;
  @media (max-width: 415px) {
    font-size: 16px;
  }
`;
const MyPageIcon = styled.img`
  object-fit: cover;
`;
const Bank = styled.p`
  margin-bottom: 5px;
  color: #a3a6aa;
`;
const BankNumber = styled.p``;
export default MyPage;
