/* eslint-disable consistent-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Header from '../components/common/Header';
import { Container, Grid, Input, Label, Text } from '../elements';
import { history } from '../redux/configureStore';
import { logInDB } from '../redux/async/user';
import { xcircle } from '../images/index';
import { KAKAO_AUTH_URL } from '../shared/KakaoOAuth';
import { ReactComponent as KakaoIcon } from '../images/kakaoLogin/join_kakao.svg';
import CommonModal from '../components/common/CommonModal';

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const commomModal = useSelector(state => state.common.modalStatus);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const onChange = e => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  /* 서버에 전달할 정보 */
  const userInfo = {
    email: loginInfo.email,
    password: loginInfo.password,
  };
  /* 로그인 제출 */
  const submitUserInfo = () => {
    if (userInfo.email.length !== 0) {
      setEmailError('');
    }
    if (userInfo.email === '') {
      return setEmailError(t('loginPage.loginerrMessage.0'));
    }
    if (userInfo.password.length !== 0) {
      setPassError('');
    }
    if (userInfo.password === '') {
      return setPassError(t('loginPage.loginerrMessage.1'));
    }
    dispatch(logInDB(userInfo));
  };

  return (
    <>
      {commomModal && <CommonModal />}
      <Header _back _content={t('loginPage.headerSubTitle')} />
      <Container padding="66px 0 0 0">
        <Grid padding="42px 20px 0 20px">
          <Wrap>
            <Label type="form">{t('loginPage.loginEmail')}</Label>
            <Input
              inputType="form"
              type="text"
              value={loginInfo.email}
              name="email"
              _onChange={onChange}
              _onSubmit={submitUserInfo}
              placeholder={t('loginPage.loginPlaceholder.0')}
            />
            {loginInfo.email !== '' && (
              <CloseButton
                src={xcircle}
                onClick={() => {
                  setLoginInfo({ ...loginInfo, email: '' });
                }}
              />
            )}
            <Text fontSize="12px" color="#ff4949">
              {emailError}
            </Text>
          </Wrap>
          <Wrap>
            <Label type="form">{t('loginPage.loginPassword')}</Label>
            <Input
              inputType="form"
              type="password"
              value={loginInfo.password}
              name="password"
              _onChange={onChange}
              _onSubmit={submitUserInfo}
              placeholder={t('loginPage.loginPlaceholder.1')}
            />

            {loginInfo.password !== '' && (
              <CloseButton
                src={xcircle}
                onClick={() => {
                  setLoginInfo({ ...loginInfo, password: '' });
                }}
              />
            )}
            <Text fontSize="12px" color="#ff4949">
              {passError}
            </Text>
          </Wrap>
        </Grid>
        <BottomWrap>
          {/* 카카오 로그인 버튼 */}
          <KakaoButton
            bg="#fce55a"
            margin="0 auto"
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
          >
            <IconArea>
              <KakaoIcon />
            </IconArea>
            {t('loginPage.kakaoLogin')}
          </KakaoButton>
          <Button onClick={submitUserInfo}>{t('loginPage.login')}</Button>
          <Button onClick={() => history.push('/signUp')}>
            {t('loginPage.register')}
          </Button>
        </BottomWrap>
      </Container>
    </>
  );
};
const Wrap = styled.div`
  margin-bottom: 32px;
  position: relative;
`;
const BottomWrap = styled.div`
  padding: 40px 20px;
  width: 100%;
`;
const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  background-color: #232529;
  color: #fff;
  margin-top: 20px;
`;
const KakaoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  background-color: #fce55a;
  color: #181604;
  margin-top: 20px;
  position: relative;
  cursor: pointer;
`;
const IconArea = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 24px;
  height: 24px;

  svg {
    width: 35px;
    height: 35px;
  }
  cursor: pointer;
`;
const CloseButton = styled.img`
  position: absolute;
  right: 11px;
  bottom: 17px;
  width: 20px;
  cursor: pointer;
`;
export default Login;
