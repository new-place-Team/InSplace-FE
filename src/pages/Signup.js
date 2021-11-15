/* eslint-disable no-alert */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOn } from '../redux/modules/userSlice';
import { Container, Grid, Input, Label, Button, Text } from '../elements';
// import { polygonimg, xcircle } from '../images/index';
import polygonimg from '../images/Polygon.png';
import xcircle from '../images/ic-xcircle.svg';
import { emailCheck } from '../shared/emailCheck';
import { addUserDB } from '../redux/async/user';
import { nicknameCheck } from '../shared/api/userApi';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';

const Signup = () => {
  const dispatch = useDispatch();
  // input값을 하나의 state에서 관리한다.
  const [userInfo, setUserInfo] = useState({
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
  const [maleFemale, setMaleFemale] = useState(null);

  /* 닉네임이 존재하는지 안하는지 유무 존재하면 true, 존재하지 않으면 false */
  const [nicknameDuplicate, setNicknameDuplicate] = useState(null);

  /* 버튼 활성화/비활성화 state */
  const [buttonStatus, setButtonStatus] = useState(false);

  // 클릭했을때 여자는 1이 남자는 0이 state에 저장
  const selectGender = gender => {
    setMaleFemale(gender);
  };

  // 모든 input을 하나의 state로 관리
  const onChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    if (userInfo.nickname) {
      setButtonStatus(true);
    }
  };
  // 모달 on
  const openModal = () => {
    dispatch(setModalOn());
  };

  /* 닉네임 중복 확인 */
  const userCheck = async () => {
    const nickCheck = { nickname: userInfo.nickname };
    /* 닉네임값이 빈값 일때 */
    if (userInfo.nickname === '') {
      setButtonStatus(false);
      return window.alert('닉네임을 입력해주세요!');
    }
    if (userInfo.nickname.length < 2) {
      setButtonStatus(false);
      return window.alert('닉네임은 두글자 이상으로 입력해주세요!');
    }
    if (userInfo.nickname.length > 12) {
      setButtonStatus(false);
      return window.alert('닉네임은 12자리 이하로 입력해주세요!');
    }
    try {
      const response = await nicknameCheck(nickCheck);
      if (response) {
        const result = response.data.Msg;
        if (result === true) {
          setNicknameDuplicate(result);
          window.alert('이미 존재하는 닉네임입니다.');
        } else {
          window.alert('시용가능한 닉네임입니다!');
          setNicknameDuplicate(result);
        }
      }
    } catch (err) {
      console.log('error ::::::', err);
    }
    return setButtonStatus(false);
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
    if (nicknameDuplicate) {
      window.alert('닉네임 중복 체크를 먼저 해주세요!');
      return;
    }
    if (userInfoDB.maleYN === undefined) {
      window.alert('성별을 선택해 주세요!');
      return;
    }
    if (!userInfoDB.mbtiId) {
      window.alert('mbti도 선택해 볼까요?!');
    }
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
            <Div>
              <Input
                inputType="form"
                type="text"
                value={userInfo.email}
                name="email"
                _onChange={onChange}
                placeholder="이메일 주소를 입력해주세요"
              />
              {userInfo.email !== '' && (
                <CloseButton
                  src={xcircle}
                  onClick={() => {
                    setUserInfo({ ...userInfo, email: '' });
                  }}
                />
              )}
            </Div>
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
            {userInfo.password !== '' && (
              <CloseButton
                src={xcircle}
                onClick={() => {
                  setUserInfo({ ...userInfo, password: '' });
                }}
              />
            )}
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
            {userInfo.passwordCheck !== '' && (
              <CloseButton
                src={xcircle}
                onClick={() => {
                  setUserInfo({ ...userInfo, passwordCheck: '' });
                }}
              />
            )}
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
            {userInfo.nickname !== '' && (
              <CloseButton
                src={xcircle}
                onClick={() => {
                  setUserInfo({ ...userInfo, nickname: '' });
                }}
              />
            )}
            <AbsolDiv>
              {buttonStatus === false ? (
                <Button
                  type="tag"
                  bg="#fff"
                  color="#C4C4C4"
                  border="1px solid #C4C4C4"
                  _onClick={userCheck}
                >
                  중복확인
                </Button>
              ) : (
                <Button
                  type="tag"
                  bg="black"
                  color="#fff"
                  border="1px solid #C4C4C4"
                  _onClick={userCheck}
                >
                  중복확인
                </Button>
              )}
            </AbsolDiv>
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
              <Icon src={polygonimg} />
            </MBTIDiv>
          </Wrap>
        </Grid>

        <BottomWrap>
          <Button type="fullSizeBlack" _onClick={submitUserInfo}>
            회원가입
          </Button>
        </BottomWrap>

        {modalStatus === true && <Modal />}
      </Container>
    </>
  );
};

const BottomWrap = styled.div`
  padding: 40px 20px;
  width: 100%;
`;

const Wrap = styled.div`
  position: relative;
  margin-bottom: 32px;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
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
  height: 3rem;
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Icon = styled.img`
  width: 16px;
  margin: ${({ margin }) => margin || '0'};
  vertical-align: text-bottom;
`;

const AbsolDiv = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;
const CloseButton = styled.img`
  position: absolute;
  right: 11px;
  bottom: 17px;
  width: 20px;
  cursor: pointer;
`;
export default Signup;
