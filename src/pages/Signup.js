/* eslint-disable consistent-return */
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { setModalOn } from '../redux/modules/userSlice';
import { Container, Grid, Input, Label, Button } from '../elements';
import { emailCheck } from '../shared/emailCheck';
import { addUserDB } from '../redux/async/user';

import Header from '../components/common/Header';
import Modal from '../components/common/Modal';

const Signup = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });

  const mbtiInfo = useSelector(state => state.user.userMbti);
  const modalStatus = useSelector(state => state.user.modalStatus);
  const [maleFemale, setMaleFemale] = React.useState();
  // const [active, setActive] = React.useState({ female: true, male: false });
  // setActive({ ...active, female: gender === 1, male: gender === 0 });
  const selectGender = gender => {
    setMaleFemale(gender);
  };

  const onChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    dispatch(setModalOn());
  };
  // 서버에 전달할 유저 정보
  const userInfoDB = {
    email: userInfo.email,
    nickname: userInfo.nickname,
    password: userInfo.password,
    maleYn: maleFemale,
    mbtiId: mbtiInfo.mbtiId,
  };

  // 유효성 검토
  const submitUserInfo = () => {
    if (userInfo.email === '') {
      window.alert('이메일을 입력해주세요!');
      return;
    }
    if (!emailCheck(userInfoDB.email)) {
      window.alert('이메일 형식이 맞지않습니다.');
      return;
    }
    if (userInfo.password === '') {
      window.alert('비밀번호를 입력해주세요!');
      return;
    }
    if (userInfo.password.length < 8) {
      window.alert('비밀번호는 8자리 이상으로 입력해주세요');
      return;
    }
    if (userInfo.passwordCheck === '') {
      window.alert('비밀번호 확인을 입력해주세요!');
      return;
    }
    if (userInfo.password !== userInfo.passwordCheck) {
      window.alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (userInfo.nickname === '') {
      window.alert('닉네임을 입력해주세요!');
      return;
    }
    if (userInfoDB.maleYn === undefined) {
      window.alert('성별을 선택해 주세요!');
      return;
    }
    if (!userInfoDB.mbtiId) {
      window.alert('mbti도 선택해 볼까요?!');
    }

    dispatch(addUserDB(userInfoDB));
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
            value={userInfo.email}
            name="email"
            _onChange={onChange}
            placeholder="이메일 주소를 입력해주세요"
          />
        </Wrap>
        <Wrap>
          <Label type="form">비밀번호</Label>
          <Input
            inputType="form"
            type="password"
            value={userInfo.password}
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
            value={userInfo.passwordCheck}
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
            value={userInfo.nickname}
            name="nickname"
            _onChange={onChange}
            placeholder="닉네임을 입력해주세요"
          />
        </Wrap>

        <Wrap>
          <Label type="form">성별</Label>
          <Grid isFlex>
            <GenderButton
              onClick={() => {
                selectGender(1);
              }}
              color={maleFemale === 1 ? '#fff' : '#C4C4C4'}
              bg={maleFemale === 1 ? 'black' : '#fff'}
            >
              여성
            </GenderButton>
            <GenderButton
              onClick={() => {
                selectGender(0);
              }}
              color={maleFemale === 0 ? '#fff' : '#C4C4C4'}
              bg={maleFemale === 0 ? 'black' : '#fff'}
            >
              남성
            </GenderButton>
          </Grid>
        </Wrap>
        <Wrap>
          <Label type="form">MBTI</Label>
          <Button
            type="tag"
            bg={mbtiInfo.type ? '#0066ff' : 'black'}
            color="#fff"
            _onClick={openModal}
          >
            {mbtiInfo.type ? mbtiInfo.type : 'MBTI 선택'}
          </Button>
        </Wrap>
      </Grid>
      {modalStatus === true ? <Modal /> : null}
      <BottomWrap>
        <Button type="fullSizeBlack" _onClick={submitUserInfo}>
          회원가입
        </Button>
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
  color: ${props => props.color};
  background-color: ${props => props.bg};
  border: ${props => (props.clicked ? '1px solid #000' : '1px solid #C4C4C4')};
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
`;

const Option = styled(Select)`
  padding: 10px;
`;

export default Signup;
