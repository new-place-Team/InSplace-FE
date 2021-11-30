import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { getTokenYn } from '../shared/utils';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { whiteRight, mypageNext } from '../images/index';
import { Button, Grid, Image } from '../elements';
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
      <MypageContainer>
        <BackgroundWrap src={weatherbg}>
          <Header _onBg _content="MyPage" _settings _color="#fff" />
          <ContentWrap>
            <Section>
              <ProfileWrap>
                <ProfileImageWrap>
                  <ProfileImage type="circle" src={userInfo.userImage} />
                </ProfileImageWrap>
                <ProfileInfo>
                  <Grid>
                    <Grid isFlex>
                      <Nicname>{userInfo.nickname}</Nicname>
                      <Button _onClick={gotoDetailPage}>
                        <Image width="24px" height="24px" src={whiteRight} />
                      </Button>
                    </Grid>
                    <Grid isFlex margin="15px 0 0 0">
                      {userInfo.mbti === '모름' ? null : (
                        <Mbti>{userInfo.mbti}</Mbti>
                      )}
                      <Email>{userInfo.email}</Email>
                    </Grid>
                  </Grid>
                </ProfileInfo>
              </ProfileWrap>
              <MypageContent>
                <Content onClick={showModal}>
                  <Title>{t('MyPage.UpdateIssue')}</Title>
                  <BottomBox>
                    <TextBox>
                      <MyPageIcon src={mypageNext} />
                    </TextBox>
                  </BottomBox>
                </Content>
                <Content onClick={feedbackModal}>
                  <Title>{t('MyPage.Opinion')}</Title>
                  <BottomBox>
                    <TextBox>
                      <MyPageIcon src={mypageNext} />
                    </TextBox>
                  </BottomBox>
                </Content>
                <Content onClick={showModal}>
                  <Title>{t('MyPage.Version')}</Title>
                  <BottomBox>
                    <TextBox>V1.0.0</TextBox>
                  </BottomBox>
                </Content>
                <Content>
                  <Title>{t('MyPage.Donation')}</Title>
                  <BottomBox>
                    <TextBox>
                      <Bank>{t('MyPage.KakaoBank')}</Bank>
                      <BankNumber>7979-39-23429</BankNumber>
                    </TextBox>
                  </BottomBox>
                </Content>
              </MypageContent>
            </Section>
          </ContentWrap>
        </BackgroundWrap>
      </MypageContainer>
      <Navbar />
    </>
  );
};
const MypageContainer = styled.div`
  position: relative;
  width: 768px;
  height: 100vh;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const BackgroundWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  z-index: 1;
`;
const ContentWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 64px 0 0 40px;
  z-index: -1;
  @media (max-width: 500px) {
    padding: 24px 0 0 20px;
  }
`;
const Section = styled.div`
  width: 100%;
  height: 100%;
`;
const ProfileWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 40px 0;
  box-sizing: border-box;
  @media (max-width: 500px) {
    padding: 0;
  }
`;
const ProfileImageWrap = styled.div`
  width: 172px;
  height: 172px;
  @media (max-width: 500px) {
    width: 110px;
    height: 110px;
  }
`;
const ProfileImage = styled.img`
  position: relative;
  width: 172px;
  height: 172px;
  border-radius: 50%;
  @media (max-width: 500px) {
    width: 110px;
    height: 110px;
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 172px;
  margin-left: 46px;
`;

const Nicname = styled.h3`
  margin-right: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  @media (max-width: 500px) {
    font-size: 22px;
  }
`;
const Mbti = styled.p`
  margin-right: 11px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.0024em;
  color: #fff;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
const Email = styled.p`
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.0041em;
  color: #fff;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
const MypageContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  height: calc(100% - 316px);
  @media (max-width: 500px) {
    height: calc(100% - 235px);
  }
`;
const Content = styled.div`
  width: 50%;
  height: 50%;
  padding: 24px 20px;
  background-color: #fff;
  border: 1px solid #e6e9ec;
  border-right: 0;
  border-bottom: 0;
  cursor: pointer;
  &:nth-child(even) {
    border-right: 1px solid #e6e9ec;
  }
  @media (max-width: 500px) {
    padding: 24px 20px;
  }
`;

const Title = styled.h5`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.0036em;
  color: #3e4042;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;
const BottomBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  height: 100%;
  padding: 20px 0;
  img {
    @media (max-width: 500px) {
      width: 32px;
    }
  }
`;
const TextBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  font-size: 22px;
  font-weight: 600;
  @media (max-width: 500px) {
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
