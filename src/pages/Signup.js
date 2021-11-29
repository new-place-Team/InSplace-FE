/* eslint-disable no-alert */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOn } from '../redux/modules/userSlice';
import { Container, Grid, Input, Label, Button, Text } from '../elements';
import polygonimg from '../images/Polygon.png';
import xcircle from '../images/ic-xcircle.svg';
import { emailCheck } from '../shared/emailCheck';
import { addUserDB } from '../redux/async/user';
import { nicknameCheck } from '../shared/api/userApi';
import Header from '../components/common/Header';
import MbtiModal from '../components/common/MbtiModal';
import CommonModal from '../components/common/CommonModal';

const Signup = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const commomModal = useSelector(state => state.common.modalStatus);
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

  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [passconfirmError, setPassconfrimError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

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
      return setNicknameError(t('signUpPage.nicNameError.0'));
    }
    if (userInfo.nickname.length < 2) {
      setButtonStatus(false);
      return setNicknameError(t('signUpPage.nicNameError.1'));
    }
    if (userInfo.nickname.length > 12) {
      setButtonStatus(false);
      return setNicknameError(t('signUpPage.nicNameError.2'));
    }
    try {
      const response = await nicknameCheck(nickCheck);
      if (response) {
        const result = response.data.Msg;
        if (result === true) {
          setNicknameDuplicate(result);
          setNicknameError(t('signUpPage.nicNameError.4'));
        } else {
          setNicknameError(t('signUpPage.nicNameError.5'));
          setNicknameDuplicate(result);
        }
      }
    } catch (err) {
      // 중복된 닉네임일 경우 모달창이 아닌 text가 보여줘야함
      console.log('error ::::::', err.response);
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
    if (userInfo.email.length !== 0) {
      setEmailError('');
    }
    if (userInfo.email === '') {
      setEmailError(t('signUpPage.idErrorMessage.0'));
      return;
    }
    if (!emailCheck(userInfoDB.email)) {
      setEmailError(t('signUpPage.idErrorMessage.1'));
      return;
    }
    if (userInfo.password.length !== 0) {
      setPassError('');
    }
    if (userInfo.password === '') {
      setPassError(t('signUpPage.passErrorMessage.0'));
      return;
    }
    if (userInfo.password.length < 8 || userInfo.password.length > 16) {
      setPassError(t('signUpPage.passErrorMessage.1'));
      return;
    }
    if (userInfo.passwordCheck.length !== 0) {
      setPassError('');
    }
    if (userInfo.passwordCheck === '') {
      setPassconfrimError(t('signUpPage.passconfirmMessage.0'));
      return;
    }
    if (userInfo.password === userInfo.passwordCheck) {
      setPassconfrimError('');
    }
    if (userInfo.password !== userInfo.passwordCheck) {
      setPassconfrimError(t('signUpPage.passconfirmMessage.1'));
      return;
    }
    if (userInfo.nickname === '') {
      setNicknameError(t('signUpPage.nicNameError.0'));
      return;
    }
    if (userInfo.nickname.length > 12) {
      setNicknameError(t('signUpPage.nicNameError.1'));
      return;
    }
    if (nicknameDuplicate) {
      // setNicknameError(t('signUpPage.nicNameError.3'));
      window.alert('닉네임 중복체크를 해주세요!');
      return;
    }

    if (userInfoDB.mbtiId === undefined) {
      userInfoDB.mbtiId = 17;
    }
    // if (userInfoDB.maleYN === undefined) {
    //   window.alert('성별을 선택해 주세요!');
    //   return;
    // }
    // if (!userInfoDB.mbtiId) {
    //   window.alert('mbti도 선택해 볼까요?!');
    // }
    // 회원정보 미들웨어로 dispatch
    // console.log(userInfoDB);
    dispatch(addUserDB(userInfoDB));
  };

  return (
    <>
      {commomModal && <CommonModal />}
      <Header _back _content={t('signUpPage.headerSubTitle')} />
      <Container padding="66px 0 0 0">
        <Grid padding="42px 20px 0 20px">
          <Wrap>
            <Label type="form" required>
              {t('signUpPage.signUpEmail')}
            </Label>
            <Div>
              <Input
                inputType="form"
                type="text"
                value={userInfo.email}
                Label
                name="email"
                _onChange={onChange}
                _onSubmit={submitUserInfo}
                placeholder={t('signUpPage.placeholder.0')}
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
            <Text fontSize="12px" color="#ff4949">
              {emailError}
            </Text>
          </Wrap>

          <Wrap>
            <Label type="form" required>
              {t('signUpPage.signUpPassword')}
            </Label>
            <Input
              inputType="form"
              type="password"
              value={userInfo.password}
              name="password"
              _onChange={onChange}
              _onSubmit={submitUserInfo}
              placeholder={t('signUpPage.placeholder.1')}
            />
            {userInfo.password !== '' && (
              <CloseButton
                src={xcircle}
                onClick={() => {
                  setUserInfo({ ...userInfo, password: '' });
                }}
              />
            )}
            <Text fontSize="12px" color="#ff4949">
              {passError}
            </Text>
          </Wrap>
          <Wrap>
            <Label type="form" required>
              {t('signUpPage.passwordConfirm')}
            </Label>
            <Input
              inputType="form"
              type="password"
              value={userInfo.passwordCheck}
              name="passwordCheck"
              _onChange={onChange}
              _onSubmit={submitUserInfo}
              placeholder={t('signUpPage.placeholder.2')}
            />
            {userInfo.passwordCheck !== '' && (
              <CloseButton
                src={xcircle}
                onClick={() => {
                  setUserInfo({ ...userInfo, passwordCheck: '' });
                }}
              />
            )}
            <Text fontSize="12px" color="#ff4949">
              {passconfirmError}
            </Text>
          </Wrap>
          <Wrap>
            <Label type="form" required>
              {t('signUpPage.nickName')}
            </Label>
            <Input
              inputType="form"
              type="text"
              value={userInfo.nickname}
              name="nickname"
              _onChange={onChange}
              _onSubmit={submitUserInfo}
              placeholder={t('signUpPage.placeholder.3')}
            />
            {/* {userInfo.nickname !== '' && (
              <CloseButton
                src={xcircle}
                onClick={() => {
                  setUserInfo({ ...userInfo, nickname: '' });
                }}
              />
            )} */}
            <AbsolDiv>
              {buttonStatus === false ? (
                <Button
                  type="tag"
                  bg="#fff"
                  color="#C4C4C4"
                  border="1px solid #C4C4C4"
                  _onClick={userCheck}
                >
                  {t('signUpPage.duplicateBtn')}
                </Button>
              ) : (
                <Button
                  type="tag"
                  bg="black"
                  color="#fff"
                  border="1px solid #C4C4C4"
                  _onClick={userCheck}
                >
                  {t('signUpPage.duplicateBtn')}
                </Button>
              )}
            </AbsolDiv>
            {nicknameError === t('signUpPage.nicNameError.5') ? (
              <Text color="green" fontSize="12px">
                {nicknameError}
              </Text>
            ) : (
              <Text color="#ff4949" fontSize="12px">
                {nicknameError}
              </Text>
            )}
          </Wrap>
          <Wrap>
            {/* 선택안함 : 2, 여성 : 0, 남성 : 1 */}
            <Label type="form">{t('signUpPage.gender')}</Label>
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
                {t('signUpPage.genderType.0')}
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
                {t('signUpPage.genderType.1')}
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
                {t('signUpPage.genderType.2')}
              </GenderButton>
            </Grid>
          </Wrap>
          <Wrap>
            <Label type="form">{t('signUpPage.mbti')}</Label>
            <MBTIDiv onClick={openModal}>
              <Text>
                {mbtiInfo.type ? mbtiInfo.type : t('signUpPage.noMbtiSelect')}
              </Text>
              <Icon src={polygonimg} />
            </MBTIDiv>
          </Wrap>
        </Grid>

        <BottomWrap>
          <Button type="fullSizeBlack" _onClick={submitUserInfo}>
            {t('signUpPage.register')}
          </Button>
        </BottomWrap>
        {modalStatus === true && <MbtiModal />}
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
  cursor: pointer;
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
