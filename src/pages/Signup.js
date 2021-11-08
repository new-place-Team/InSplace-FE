/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { setModalOn } from '../redux/modules/userSlice';
import { Container, Grid, Input, Label, Button, Text } from '../elements';
import { emailCheck } from '../shared/emailCheck';
import { addUserDB } from '../redux/async/user';

import Header from '../components/common/Header';
import Modal from '../components/common/Modal';

const Signup = () => {
  const dispatch = useDispatch();
  // input값을 하나의 state에서 관리한다.
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });

  // 유저 MBTI를 redux에서 가져옴
  const mbtiInfo = useSelector(state => state.user.userMbti);

  // 모달on/off 상태를 redux에서 관리
  const modalStatus = useSelector(state => state.user.modalStatus);

  // 여자,남자 상태를 useState를 통해 관리
  const [maleFemale, setMaleFemale] = React.useState(null);

  // const [match, setMatch] = useState(false);
  // const [rematch, setRematch] = useState(false);
  // const [passMatch, setPassMatch] = useState(false);
  // const [passLengthMatch, setPassLengthMatch] = useState(false);
  // const [checkPass, setCheckPass] = useState(false);
  // const [wrond, setWrong] = useState(false);

  // 클릭했을때 여자는 1이 남자는 0이 state에 저장
  const selectGender = gender => {
    setMaleFemale(gender);
  };

  // 모달on/off 상태를 redux에서 관리
  const onChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  // 모달 on
  const openModal = () => {
    dispatch(setModalOn());
  };

  // 서버에 전달할 유저 정보
  const userInfoDB = {
    email: userInfo.email,
    nickname: userInfo.nickname,
    password: userInfo.password,
    maleYN: maleFemale,
    mbtiId: mbtiInfo.mbtiId,
  };

  // 회원정보 제출 및 유효성 검토
  const submitUserInfo = () => {
    if (userInfo.email === '') {
      window.alert('이메일을 입력해주세요!');
      return;
    }
    if (!emailCheck(userInfoDB.email)) {
      window.alert('이메일 형식이 맞지않습니다.');
      // setMatch(false);
      // setRematch(true);
      return;
    }
    if (userInfo.password === '') {
      window.alert('비밀번호를 입력해주세요!');
      // setPassMatch(true);
      // setMatch(false);
      // setRematch(false);
      return;
    }
    if (userInfo.password.length < 8) {
      window.alert('비밀번호는 8자리 이상으로 입력해주세요');
      // setPassMatch(false);
      // setPassLengthMatch(true);
      return;
    }
    if (userInfo.passwordCheck === '') {
      window.alert('비밀번호 확인을 입력해주세요!');
      // setCheckPass(true);
      return;
    }
    if (userInfo.password !== userInfo.passwordCheck) {
      window.alert('비밀번호가 일치하지 않습니다.');
      // setCheckPass(true);
      return;
    }
    if (userInfo.nickname === '') {
      window.alert('닉네임을 입력해주세요!');
      return;
    }
    if (userInfoDB.maleYN === undefined) {
      window.alert('성별을 선택해 주세요!');
      return;
    }
    if (!userInfoDB.mbtiId) {
      window.alert('mbti도 선택해 볼까요?!');
    }
    console.log('회원가입폼', userInfoDB);
    // 회원정보 미들웨어로 dispatch
    dispatch(addUserDB(userInfoDB));
  };
  return (
    <>
      <Header _back _content="회원가입" />
      <Container padding="66px 0 0 0">
        <Grid padding="42px 20px 0 20px">
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
            {/* 선택안함 : 2, 여성 : 0, 남성 : 1 */}
            <Label type="form">성별</Label>
            <Grid isFlex>
              <GenderButton
                onClick={() => {
                  selectGender(null);
                }}
                color={maleFemale === null ? '#fff' : '#C4C4C4'}
                bg={maleFemale === null ? 'black' : '#fff'}
                border={
                  maleFemale === null ? '1px solid #000' : '1px solid #C4C4C4'
                }
              >
                선택안함
              </GenderButton>
              <GenderButton
                onClick={() => {
                  selectGender(0);
                }}
                color={maleFemale === 0 ? '#fff' : '#C4C4C4'}
                bg={maleFemale === 0 ? 'black' : '#fff'}
                border={
                  maleFemale === 0 ? '1px solid #000' : '1px solid #C4C4C4'
                }
              >
                여성
              </GenderButton>
              <GenderButton
                onClick={() => {
                  selectGender(1);
                }}
                color={maleFemale === 1 ? '#fff' : '#C4C4C4'}
                bg={maleFemale === 1 ? 'black' : '#fff'}
                border={
                  maleFemale === 1 ? '1px solid #000' : '1px solid #C4C4C4'
                }
              >
                남성
              </GenderButton>
            </Grid>
          </Wrap>
          <Wrap>
            <Label type="form">MBTI </Label>
            <MBTIDiv onClick={openModal}>
              <Text>{mbtiInfo.type ? mbtiInfo.type : 'MBTI 선택안함'}</Text>
            </MBTIDiv>
          </Wrap>
        </Grid>

        <BottomWrap>
          <Button type="fullSizeBlack" _onClick={submitUserInfo}>
            회원가입
          </Button>
        </BottomWrap>
        {modalStatus === true ? <Modal /> : null}
      </Container>
    </>
  );
};

const BottomWrap = styled.div`
  position: absolute;
  padding: 0 20px;
  bottom: 50px;
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
  border: ${props => props.border};
  cursor: pointer;
  /* border: ${props =>
    props.clicked ? '1px solid #000' : '1px solid #C4C4C4'}; */
  &:hover {
  }
`;

const MBTIDiv = styled.div`
  width: 100%;
  height: 4rem;
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  color: white;
  display: flex;
  align-items: center;
`;

export default Signup;

// width
// padding="10%"
// bg={mbtiInfo.type ? '#0066ff' : 'black'}
// color="#fff"
// _onClick={openModal}
