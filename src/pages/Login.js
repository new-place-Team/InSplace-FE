/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Container, Grid, Input, Label } from '../elements';
import { history } from '../redux/configureStore';
import { logInDB } from '../redux/async/user';
import Header from '../components/common/Header';
import { close } from '../images';
import { KAKAO_AUTH_URL } from '../shared/KakaoOAuth';
import { ReactComponent as KakaoIcon } from '../images/kakaoLogin/join_kakao.svg';

const Login = () => {
  const dispatch = useDispatch();
  /* email,password 하나의 state에서 관리 */
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });
  const [buttonStatus, setButtonStatus] = React.useState({
    emailStatus: false,
    pwStatus: false,
  });
  /* Input 관리 */
  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  /* 서버에 전달할 정보 */
  const userInfo = {
    email: state.email,
    password: state.password,
  };
  /* 로그인 제출 */
  const submitUserInfo = () => {
    if (userInfo.email === '') {
      window.alert('이메일을 입력해주세요!');
      return;
    }
    if (userInfo.password === '') {
      window.alert('비밀번호를 입력해주세요!');
      return;
    }
    dispatch(logInDB(userInfo));
  };

  React.useEffect(() => {
    console.log('kakao redirect url', KAKAO_AUTH_URL);
    if (state.email !== '') {
      return setButtonStatus({ ...buttonStatus, emailStatus: true });
    }
    if (state.email === '') {
      return setButtonStatus({ ...buttonStatus, emailStatus: false });
    }
    // 3번째 확인할 것
    if (state.password !== '') {
      return setButtonStatus({ ...buttonStatus, pwStatus: true });
    }
    if (state.password === '') {
      return setButtonStatus({ ...buttonStatus, pwStatus: false });
    }
  }, [state]);

  return (
    <>
      <Header _back _content="로그인" />
      <Container padding="66px 0 0 0">
        <Grid padding="42px 20px 0 20px">
          <Wrap>
            <Label type="form">이메일</Label>
            <Input
              inputType="form"
              type="text"
              value={state.email}
              name="email"
              _onChange={onChange}
              placeholder="이메일 주소를 입력해주세요"
            />
            {buttonStatus.emailStatus && <InputCloseButton src={close} />}
          </Wrap>
          <Wrap>
            <Label type="form">비밀번호</Label>
            <Input
              inputType="form"
              type="password"
              value={state.password}
              name="password"
              _onChange={onChange}
              placeholder="비밀번호를 입력해주세요"
            />
            {buttonStatus.pwStatus && <InputCloseButton src={close} />}
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
`;

const InputCloseButton = styled.img`
  position: absolute;
  right: 11px;
  bottom: 17px;
  width: 14px;
`;
export default Login;
