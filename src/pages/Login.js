/* eslint-disable consistent-return */
import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Button, Input, Label } from '../elements';
import Header from '../components/Header';
import { inputClose } from '../images';

const Login = () => {
  const [state, setState] = React.useState({
    id: '',
    password: '',
  });
  const [buttonStatus, setButtonStatus] = React.useState({
    idStatus: false,
    pwStatus: false,
  });

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (state.id !== '') {
      return setButtonStatus({ ...buttonStatus, idStatus: true });
    }
    if (state.id === '') {
      return setButtonStatus({ ...buttonStatus, idStatus: false });
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
          <Label type="form">아이디</Label>
          <Input
            inputType="form"
            type="text"
            value={state.id}
            name="id"
            _onChange={onChange}
          />
          {buttonStatus.idStatus && <InputCloseButton src={inputClose} />}
        </Wrap>
        <Wrap>
          <Label type="form">비밀번호</Label>
          <Input
            inputType="form"
            type="password"
            value={state.password}
            name="password"
            _onChange={onChange}
          />
          {buttonStatus.pwStatus && <InputCloseButton src={inputClose} />}
        </Wrap>
      </Grid>
      <BottomWrap>
        <Button type="fullSizeBlack">로그인</Button>
      </BottomWrap>
    </Container>
  );
};

const BottomWrap = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 90%;
  margin: 0px 20px;
`;
const Wrap = styled.div`
  position: relative;
  margin-bottom: 32px;
`;

const InputCloseButton = styled.img`
  position: absolute;
  right: 11px;
  bottom: 17px;
  width: 14px;
`;
export default Login;
