/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-alert */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOn } from '../redux/modules/userSlice';
import { getPeopleMbti } from '../shared/transferText';
import { editProfileDB } from '../redux/async/user';
import { history } from '../redux/configureStore';
import { getTokenYn } from '../shared/utils';
import { nicknameCheck } from '../shared/api/userApi';

import Modal from '../components/common/Modal';
import Header from '../components/common/Header';
import { Button, Container, Grid, Image, Label, Text } from '../elements';
import { plus, polygonimg } from '../images/index';

const MyPageEdit = props => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(state => state.user.modalStatus);
  const mbtiInfo = useSelector(state => state.user.userMbti);
  /* 만약 이 페이지에서 토큰없을시 로그인 페이지 이동 */
  useEffect(() => {
    if (getTokenYn() === false) {
      window.alert('로그인을 해주세요!');
      history.push('/login');
      console.log('useEffect 실행');
    }
  }, []);

  const [maleFemale, setMaleFemale] = React.useState(null);
  const [preview, setPreview] = React.useState('');
  /* 닉네임이 존재하는지 안하는지 유무 존재하면 true, 존재하지 않으면 false */
  const [nicknameDuplicate, setNicknameDuplicate] = React.useState(null);
  /* 버튼 활성화/비활성화 state */
  const [buttonStatus, setButtonStatus] = React.useState(false);
  const [statement, setStatement] = React.useState(false);
  /* 이전 페이지에서 가지고 있던 유저 정보를 params로 넘겨줌 */
  const newParams = props.history.location.state.userInfo;
  const [info, setInfo] = React.useState({
    nickname: newParams.nickname,
    email: newParams.email,
    userImage: newParams.userImage,
    mbti: newParams.mbti,
    userId: newParams.userId,
  });
  const { nickname, email, userImage, mbti, userId } = info;
  const fileInput = React.useRef();

  /* 사진 */
  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    // file 읽는게 성공적으로 되었을때 실행
    reader.onload = () => {
      setPreview(reader.result);
    };
    setInfo({ ...info, userImage: file });
    // file 읽기 실패되었을때 실행
    reader.onerror = error => {
      console.log('error = ', error);
    };
  };
  /* 모달 열기 */
  const openModal = () => {
    dispatch(setModalOn());
  };
  /* 이메일, 닉네임 변경 */
  const onChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    // 닉네임만 변경했을때?를 어떻게 써야할지?
    setButtonStatus(true);
  };
  /* 성별 선택 */
  const selectGender = gender => {
    setMaleFemale(gender);
  };

  /* 닉네임 중복 확인 */
  const userCheck = async () => {
    const nickCheck = { nickname: info.nickname };
    /* 닉네임값이 빈값 일때 */
    if (info.nickname === '') {
      return window.alert('닉네임을 입력해주세요!');
    }
    if (info.nickname.length < 2) {
      return window.alert('닉네임은 두글자 이상으로 입력해주세요!');
    }
    if (info.nickname.length > 12) {
      return window.alert('닉네임은 12자리 이하로 입력해주세요!');
    }
    if (newParams.nickname === nickname) {
      window.alert('사용가능한 닉네임 입니다.');
      return setNicknameDuplicate(false);
    }
    try {
      const response = await nicknameCheck(nickCheck);
      if (response) {
        const result = response.data.Msg;
        if (result === true) {
          setNicknameDuplicate(result);
          window.alert('이미 존재하는 닉네임입니다.');
          // setStatement('이미 존재하는 닉네임입니다.');
        } else {
          window.alert('시용가능한 닉네임입니다!');
          setNicknameDuplicate(result);
          // setStatement('시용가능한 닉네임입니다!');
        }
      }
    } catch (err) {
      console.log('error ::::::', err);
    }
    setButtonStatus(false);
  };

  /* 유저정보 수정 요청 */
  const onSubmitHandler = () => {
    if (nickname === '') {
      return window.alert('닉네임을 입력해주세요!');
    }
    if (nicknameDuplicate) {
      return window.alert('닉네임 중복 체크를 먼저 해주세요!');
    }
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('email', email);
    formData.append('userImage', userImage);
    formData.append('maleYN', maleFemale);
    if (!mbtiInfo.mbtiId) {
      formData.append('mbtiId', getPeopleMbti(mbti));
    } else {
      formData.append('mbtiId', mbtiInfo.mbtiId);
    }
    const params = {
      id: userId,
      data: formData,
    };
    dispatch(editProfileDB(params));
  };

  return (
    <>
      <Header _back _content="프로필 수정" />
      <Container padding="20px 0 0 0">
        <Grid padding="42px 20px 0 20px">
          <ProfileWrap>
            <Image
              type="circle"
              width="169px"
              height="169px"
              src={preview || info.userImage}
            />
            <UploadWrap>
              <UploadLabel htmlFor="uploadProfile">
                <ImageBox>
                  <Image width="17px" height="17px" src={plus} />
                </ImageBox>
              </UploadLabel>
              <UploadInput
                type="file"
                id="uploadProfile"
                name="ProfileImage"
                ref={fileInput}
                onChange={selectFile}
              />
            </UploadWrap>
          </ProfileWrap>
          <Grid margin="0 0 32px 0">
            <Label fontSize="16px" color="#A3A6AA">
              닉네임
            </Label>
            <Input name="nickname" value={nickname} onChange={onChange} />
            <Div>
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
            </Div>
          </Grid>
          <Grid margin="0 0 32px 0">
            <Label fontSize="16px" color="#A3A6AA">
              이메일
            </Label>
            <Input
              name="email"
              value={email}
              onChange={onChange}
              color="#C2C6CB"
              readOnly
            />
          </Grid>
          <Grid margin="0 0 32px 0">
            <Label fontSize="16px" color="#A3A6AA">
              MBTI
            </Label>
            <MBTIDiv onClick={openModal}>
              <Text>{mbtiInfo.mbtiId ? mbtiInfo.type : mbti}</Text>
              <Icon src={polygonimg} />
            </MBTIDiv>
          </Grid>
          <Grid margin="0 0 32px 0">
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
          </Grid>
        </Grid>
        <BottomWrap>
          <Button type="fullSizeBlack" _onClick={onSubmitHandler}>
            수정하기
          </Button>
        </BottomWrap>
        {modalStatus === true ? <Modal /> : null}
      </Container>
    </>
  );
};

const ProfileWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 0 50px;
`;
const Div = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;
const UploadWrap = styled.div`
  margin: -40px -120px 0 0;
  z-index: 50;
`;
const UploadLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #a4a9b1;
  &:hover {
    cursor: pointer;
  }
`;
const UploadInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 18px;
  padding: 10px 0;
  border: none;
  ${props => (props.color ? `color:${props.color}` : '')};
  border-bottom: 1px solid #e6e9ec;
  &:focus {
    outline: none;
  }
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
`;
const MBTIDiv = styled.div`
  width: 100%;
  height: 3rem;
  font-size: 16px;
  border-bottom: 1px solid #e6e9ec;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomWrap = styled.div`
  padding: 40px 20px;
  width: 100%;
`;

const Icon = styled.img`
  margin: ${({ margin }) => margin || '0'};
  vertical-align: text-bottom;
`;

export default MyPageEdit;
