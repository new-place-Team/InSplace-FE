/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import heic2any from 'heic2any';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOn } from '../redux/modules/userSlice';
import { getPeopleMbti } from '../shared/transferText';
import { editProfileDB } from '../redux/async/user';
import { getTokenYn } from '../shared/utils';
import { nicknameCheck } from '../shared/api/userApi';
import MbtiModal from '../components/common/MbtiModal';
import Header from '../components/common/Header';
import { Button, Container, Grid, Image, Text } from '../elements';
import { plus, polygonimg } from '../images/index';
import CommonModal from '../components/common/CommonModal';
import { setCommonModalOn } from '../redux/modules/commonSlice';

const MyPageEdit = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modalStatus = useSelector(state => state.user.modalStatus);
  const mbtiInfo = useSelector(state => state.user.userMbti);
  /* 공통모달 */
  const commomModal = useSelector(state => state.common.modalStatus);
  /* 만약 이 페이지에서 토큰없을시 로그인 페이지 이동 */
  useEffect(() => {
    if (getTokenYn() === false) {
      const params = {
        title: t('MyPageEdit.Modal.goLogin'),
        goPage: '/login',
      };
      dispatch(setCommonModalOn(params));
    }
  }, []);
  /* 이전 페이지에서 가지고 있던 유저 정보를 params로 넘겨줌 */
  const { history } = props;
  const newParams = history.location.state.userInfo;
  const [maleFemale, setMaleFemale] = React.useState(newParams.maleYN);
  const [preview, setPreview] = React.useState('');
  const [errorMessage, setErrorMessage] = useState('');
  /* 닉네임이 존재하는지 안하는지 유무 존재하면 true, 존재하지 않으면 false */
  const [nicknameDuplicate, setNicknameDuplicate] = React.useState(null);
  /* 버튼 활성화/비활성화 state */
  const [buttonStatus, setButtonStatus] = React.useState(false);
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
    let file = fileInput.current.files[0];
    if (
      file.name.split('.')[1] === 'HEIC' ||
      file.name.split('.')[1] === 'heic'
    ) {
      const blob = fileInput.current.files[0];
      heic2any({ blob, toType: 'image/jpeg' }).then(resultBlob => {
        file = new File([resultBlob], `${file.name.split('.')[0]}.jpg`, {
          type: 'image/jpeg',
          lastModified: new Date().getTime(),
        });
        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreview(reader.result);
        };
        setInfo({ ...info, userImage: file });
      });
    } else {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
      setInfo({ ...info, userImage: file });
    }
  };

  /* 모달 열기 */
  const openModal = () => {
    dispatch(setModalOn());
  };
  /* 이메일, 닉네임 변경 */
  const onChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
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
      return setErrorMessage(t('MyPageEdit.nicNameError.0'));
    }
    if (info.nickname.length < 2) {
      return setErrorMessage(t('MyPageEdit.nicNameError.1'));
    }
    if (info.nickname.length > 12) {
      return setErrorMessage(t('MyPageEdit.nicNameError.2'));
    }
    if (newParams.nickname === nickname) {
      setErrorMessage(t('MyPageEdit.nicNameError.5'));
      return setNicknameDuplicate(false);
    }
    try {
      const response = await nicknameCheck(nickCheck);
      if (response) {
        const result = response.data.Msg;
        if (result === true) {
          setNicknameDuplicate(result);
          return setErrorMessage(t('MyPageEdit.nicNameError.4'));
        }
        setErrorMessage(t('MyPageEdit.nicNameError.5'));
        setNicknameDuplicate(result);
      }
    } catch (err) {
      // 닉네임 중복은 모달창이 아닌 문구로 나와야함.
      console.log('error ::::::', err);
    }
    setButtonStatus(false);
  };

  /* 유저정보 수정 요청 */
  const onSubmitHandler = () => {
    if (nickname === '') {
      // alert창이 아니라 문구로 나와야함
      return window.alert(t('MyPageEdit.nicNameError.0'));
    }
    if (nicknameDuplicate === true) {
      // alert창이 아니라 문구로 나와야함
      return window.alert(t('MyPageEdit.nicNameError.3'));
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
      msg: t('MyPageEdit.Modal.complete'),
    };
    dispatch(editProfileDB(params));
  };

  return (
    <>
      {commomModal && <CommonModal />}
      <Header _back _content={t('MyPageEdit.headerSubTitle')} />
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
            <MypageLabel>{t('MyPageEdit.nickname')}</MypageLabel>
            <Input name="nickname" value={nickname} onChange={onChange} />
            {errorMessage === t('MyPageEdit.nicNameError.5') ? (
              <Text fontSize="12px" color="green">
                {errorMessage}
              </Text>
            ) : (
              <Text fontSize="12px" color="#ff4949">
                {errorMessage}
              </Text>
            )}

            <Div>
              {buttonStatus === false ? (
                <Button
                  type="tag"
                  bg="#fff"
                  color="#C4C4C4"
                  border="1px solid #C4C4C4"
                  _onClick={userCheck}
                >
                  {t('MyPageEdit.duplicate')}
                </Button>
              ) : (
                <Button
                  type="tag"
                  bg="black"
                  color="#fff"
                  border="1px solid #C4C4C4"
                  _onClick={userCheck}
                >
                  {t('MyPageEdit.duplicate')}
                </Button>
              )}
            </Div>
          </Grid>
          <Grid margin="0 0 32px 0">
            <MypageLabel>{t('MyPageEdit.email')}</MypageLabel>
            <Input
              name="email"
              value={email}
              onChange={onChange}
              color="#C2C6CB"
              readOnly
            />
          </Grid>
          <Grid margin="0 0 32px 0">
            <MypageLabel>MBTI</MypageLabel>
            <MBTIDiv onClick={openModal}>
              <Text>{mbtiInfo.mbtiId ? mbtiInfo.type : mbti}</Text>
              <Icon src={polygonimg} />
            </MBTIDiv>
          </Grid>
          <Grid margin="0 0 32px 0">
            {/* 선택안함 : 2, 여성 : 0, 남성 : 1 */}
            <MypageLabel>{t('MyPageEdit.myPagegender')}</MypageLabel>
            <Grid isFlex margin="15px 0 0 0">
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
                {t('MyPageEdit.genderType.0')}
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
                {t('MyPageEdit.genderType.1')}
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
                {t('MyPageEdit.genderType.2')}
              </GenderButton>
            </Grid>
          </Grid>
        </Grid>
        <BottomWrap>
          <Button type="fullSizeBlack" _onClick={onSubmitHandler}>
            {t('MyPageEdit.mypageEdit')}
          </Button>
        </BottomWrap>
        {modalStatus === true ? <MbtiModal /> : null}
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
  z-index: 8;
  @media (max-width: 415px) {
    margin: -40px -100px 0 0;
  }
`;
const MypageLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.0041em;
  color: #a3a6aa;
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
  cursor: pointer;
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
