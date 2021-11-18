/* eslint-disable consistent-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
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
      return setEmailError('이메일을 입력해주세요!');
    }
    if (userInfo.password.length !== 0) {
      setPassError('');
    }
    if (userInfo.password === '') {
      return setPassError('비밀번호를 입력해주세요!');
    }
    dispatch(logInDB(userInfo));
  };

  return (
    <>
      {commomModal && <CommonModal />}
      <Header _back _content="로그인" />
      <Container padding="66px 0 0 0">
        <Grid padding="42px 20px 0 20px">
          <Wrap>
            <Label type="form">이메일</Label>
            <Input
              inputType="form"
              type="text"
              value={loginInfo.email}
              name="email"
              _onChange={onChange}
              placeholder="이메일 주소를 입력해주세요"
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
            <Label type="form">비밀번호</Label>
            <Input
              inputType="form"
              type="password"
              value={loginInfo.password}
              name="password"
              _onChange={onChange}
              placeholder="비밀번호를 입력해주세요"
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
            카카오 로그인
          </KakaoButton>
          <Button onClick={submitUserInfo}>로그인</Button>
          <Button onClick={() => history.push('/signUp')}>회원가입</Button>
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
