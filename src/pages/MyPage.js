import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { getTokenYn } from '../shared/utils';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { right, mypageNext, profile1 } from '../images/index';
import { Button, Container, Grid, Image, Text } from '../elements';
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
        <Header _onBg _content="MyPage" _settings _language _color="#fff" />
        <Bg src={sunBg} />
        <Grid isFlex justify="center" padding="59px 40px">
          <Image
            type="circle"
            width="169px"
            height="169px"
            src={userInfo.userImage ? userInfo.userImage : profile1}
          />
          <Grid flex margin="0 0 0 36px">
            <Grid isFlex>
              <Text fontSize="22px" bold color="#282828" margin="0 20px 0 0">
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
          <Info onClick={showModal}>
            <Text>{t('MyPage.UpdateIssue')}</Text>
            <BottomBox>
              <Image src={mypageNext} />
            </BottomBox>
          </Info>
          <Info onClick={showModal}>
            <Text>{t('MyPage.Opinion')}</Text>
            <BottomBox>
              <Image src={mypageNext} />
            </BottomBox>
          </Info>
          <Info>
            <Text>{t('MyPage.Version')}</Text>
            <BottomBox>
              <TextBox>V1.0.2</TextBox>
            </BottomBox>
          </Info>
          <Info onClick={showModal}>
            <Text>{t('MyPage.Donation')}</Text>
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
  cursor: pointer;
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
