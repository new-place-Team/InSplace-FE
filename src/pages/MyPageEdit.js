/* eslint-disable import/named */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOn } from '../redux/modules/userSlice';

import Header from '../components/common/Header';
import { Button, Container, Grid, Image, Label, Text } from '../elements';
import { plus, insplace } from '../images/index';
import Modal from '../components/common/Modal';

const MyPageEdit = () => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const userInfo = useSelector(state => state.user.userInfo);
  console.log(userInfo);
  const [info, setInfo] = React.useState({
    nickname: userInfo.nickname,
    email: userInfo.email,
    profileImage: insplace,
  });

  const mbtiInfo = useSelector(state => state.user.userMbti);
  const modalStatus = useSelector(state => state.user.modalStatus);
  const [maleFemale, setMaleFemale] = React.useState(null);
  const selectGender = gender => {
    setMaleFemale(gender);
  };
  const [preview, setPreview] = useState('');

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    // file 읽는게 성공적으로 되었을때 실행
    reader.onload = () => {
      setPreview(reader.result);
    };
    // file 읽기 실패되었을때 실행
    reader.onerror = error => {
      console.log('error = ', error);
    };
  };
  const openModal = () => {
    dispatch(setModalOn());
  };
  const onChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
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
              src={preview || info.profileImage}
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
            <Input name="nickname" value={info.nickname} onChange={onChange} />
          </Grid>
          <Grid margin="0 0 32px 0">
            <Label fontSize="16px" color="#A3A6AA">
              이메일
            </Label>
            <Input name="email" value={info.email} onChange={onChange} />
          </Grid>
          <Grid margin="0 0 32px 0">
            <Label fontSize="16px" color="#A3A6AA">
              MBTI
            </Label>
            <MBTIDiv onClick={openModal}>
              <Text>
                {mbtiInfo.type ? mbtiInfo.type : userInfo.description}
              </Text>
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
          <Button type="fullSizeBlack">수정하기</Button>
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
const UploadWrap = styled.div`
  margin: -40px -120px 0 0;
  z-index: 100;
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
  border-bottom: 1px solid #e6e9ec;
  &:focus {
    outline: none;
    border-bottom: 1px solid #232529;
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
  align-items: center;
`;

const BottomWrap = styled.div`
  position: absolute;
  padding: 0 20px;
  bottom: 50px;
  width: 100%;
`;

export default MyPageEdit;
