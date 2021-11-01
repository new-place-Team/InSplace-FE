/* eslint-disable consistent-return */
import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Input, Label } from '../elements';
import Header from '../components/common/Header';

const Signup = () => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    male_yn: 1,
    mbti_id: 2,
  });
  const [active, setActive] = React.useState({ female: true, man: false });

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onClick = gender => {
    setActive({ ...active, female: gender === 1, man: gender === 0 });
  };

  return (
    <Container>
      <Header _back _content="회원가입" />
      <Grid margin="42px 0 0 0">
        <Wrap>
          <Label type="form">이메일</Label>
          <Input
            inputType="form"
            type="text"
            value={state.id}
            name="id"
            _onChange={onChange}
            placeholder="이메일 주소를 입력해주세요"
          />
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
        </Wrap>
        <Wrap>
          <Label type="form">비밀번호 확인</Label>
          <Input
            inputType="form"
            type="password"
            value={state.passwordCheck}
            name="passwordCheck"
            _onChange={onChange}
            placeholder="비밀번호를 한번 더 입력해주세요"
          />
        </Wrap>
        <Wrap>
          <Label type="form">닉네임</Label>
          <Input
            inputType="form"
            type="text"
            value={state.nickname}
            name="nickname"
            _onChange={onChange}
            placeholder="닉네임을 입력해주세요"
          />
        </Wrap>
        <Wrap>
          <Label type="form">성별</Label>
          <Grid isFlex>
            <GenderButton active={active.female} onClick={() => onClick(1)}>
              여성
            </GenderButton>
            <GenderButton active={active.man} onClick={() => onClick(0)}>
              남성
            </GenderButton>
          </Grid>
        </Wrap>
        <Wrap>
          <Label type="form">MBTI</Label>
          <Grid>
            <Select>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Grid>
        </Wrap>
      </Grid>
      <BottomWrap>
        <Button type="fullSizeBlack">회원가입</Button>
      </BottomWrap>
    </Container>
  );
};

const BottomWrap = styled.div`
  position: absolute;
  padding: 0 20px;
  bottom: 5px;
  left: 0;
  width: 100%;
`;
const Wrap = styled.div`
  position: relative;
  margin-bottom: 32px;
`;

const GenderButton = styled.div`
  padding: 12px 20px;
  margin-right: 6px;
  font-size: 16px;
  font-weight: 700;
  color: ${props => (props.active ? '#fff' : '#C4C4C4')};
  background-color: ${props => (props.active ? '#000' : '#fff')};
  border: ${props => (props.active ? '1px solid #000' : '1px solid #C4C4C4')};
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
`;

const Option = styled(Select)`
  padding: 10px;
`;
const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  background-color: #000;
  color: #fff;
`;

export default Signup;
