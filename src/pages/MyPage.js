import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { getTokenYn } from '../shared/utils';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { whiteRight, mypageNext, profile1 } from '../images/index';
import { Button, Container, Grid, Image } from '../elements';
import sunBg from '../images/weather/sun_full_768.jpg';
import ConfirmModal from '../components/common/ConfirmModal';
import CommonModal from '../components/common/CommonModal';
import { setCommonModalOn } from '../redux/modules/commonSlice';

const MyPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const [loginModal, setLoginModal] = useState(false);
  const modalStatus = useSelector(state => state.common.modalStatus);
  const { t } = useTranslation();

  /* 유저 이미지가 있으면 그 이미지 없으면 기본 이미지 */
  const setNomalImage = profile => {
    if (userInfo.userImage !== null) {
      return userInfo.userImage;
    }
    return profile;
  };
  const realUserInfo = { ...userInfo, userImage: setNomalImage(profile1) };
  /* 만약 이 페이지에서 토큰없을시 로그인 페이지 이동 */

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
        state: { userInfo: realUserInfo },
      });
    }
  };

  const showModal = () => {
    const params = {
      title: t('MyPage.Modal.service'),
    };
    dispatch(setCommonModalOn(params));
  };

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
      <Container padding="0" height="100%">
        <Header _onBg _content="MyPage" _settings _color="#fff" />
        <Bg src={sunBg} />
        <MyPageInfoGrid isFlex justify="center" padding="59px 40px">
          <Image
            type="circle"
            width="169px"
            height="169px"
            src={userInfo.userImage ? userInfo.userImage : profile1}
          />
          <UserInfoGrid>
            <Grid isFlex margin="0 0 17px 0">
              <Nicname>{userInfo.nickname}</Nicname>
              <Button _onClick={gotoDetailPage}>
                <Image width="24px" height="24px" src={whiteRight} />
              </Button>
            </Grid>
            <Grid isFlex>
              <Mbti>{userInfo.mbti}</Mbti>
              <Email>{userInfo.email}</Email>
            </Grid>
          </UserInfoGrid>
        </MyPageInfoGrid>
        {/* 인포 그리드 */}
        <InfoGrid>
          <Info onClick={showModal}>
            <Title>{t('MyPage.UpdateIssue')}</Title>
            <BottomBox>
              <Image src={mypageNext} />
            </BottomBox>
          </Info>
          <Info onClick={showModal}>
            <Title>{t('MyPage.Opinion')}</Title>
            <BottomBox>
              <Image src={mypageNext} />
            </BottomBox>
          </Info>
          <Info>
            <Title>{t('MyPage.Version')}</Title>
            <BottomBox>
              <TextBox>V1.0.2</TextBox>
            </BottomBox>
          </Info>
          <Info onClick={showModal}>
            <Title>{t('MyPage.Donation')}</Title>
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
const MyPageInfoGrid = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 68px 0 52px auto;
  @media (max-width: 414px) {
    margin: 32px 0 67px 24px;
  }
`;
const UserInfoGrid = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 46px;
  @media (max-width: 414px) {
    margin-left: 24px;
  }
`;

const InfoGrid = styled.div`
  width: 95.4%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 auto;
  padding-bottom: 64px;
  cursor: pointer;
`;

const Info = styled.div`
  position: relative;
  width: 50%;
  height: 436px;
  padding: 48px 50px;
  background-color: #fff;
  border: 1px solid #e6e9ec;
  @media (max-width: 415px) {
    height: 176px;
    padding: 24px;
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
  @media (max-width: 415px) {
    img {
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
  font-size: 22px;
  font-weight: bold;
  @media (max-width: 415px) {
    font-size: 16px;
  }
`;

const Nicname = styled.h3`
  margin-right: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  @media (max-width: 415px) {
    font-size: 22px;
  }
`;
const Mbti = styled.p`
  margin-right: 11px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.0024em;
  color: #fff;
  @media (max-width: 415px) {
    font-size: 13px;
  }
`;
const Email = styled.p`
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.0041em;
  color: #fff;
  @media (max-width: 415px) {
    font-size: 13px;
  }
`;
const Title = styled.h5`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.0036em;
  color: #3e4042;
  @media (max-width: 415px) {
    font-size: 16px;
  }
`;

export default MyPage;
