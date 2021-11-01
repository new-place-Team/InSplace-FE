/* eslint-disable consistent-return */
import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Input, Label } from '../elements';
import Header from '../components/common/Header';
import { close } from '../images';

const Login = () => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });
  const [buttonStatus, setButtonStatus] = React.useState({
    emailStatus: false,
    pwStatus: false,
  });

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
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
    <Container>
      <Header _back _content="로그인" />
      <Grid margin="42px 0 0 0">
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
        <Button type="fullSizeBlack">로그인</Button>
      </BottomWrap>
    </Container>
  );
};
const Wrap = styled.div`
  margin-bottom: 32px;
`;
const BottomWrap = styled.div`
  position: absolute;
  padding: 0 20px;
  bottom: 5px;
  left: 0;
  width: 100%;
`;
const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  background-color: #000;
  color: #fff;
`;

const InputCloseButton = styled.img`
  position: absolute;
  right: 11px;
  bottom: 17px;
  width: 14px;
`;
export default Login;
