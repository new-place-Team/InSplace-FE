/* eslint-disable no-undef */
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import { Button, Container, Grid, Image, Label } from '../elements';
import { plus, insplace } from '../images';

const MyPageEdit = () => {
  const fileInput = React.useRef();
  const [state, setState] = React.useState({
    nickname: '루이',
    mbtiId: 'ESFP',
    email: 'mida@gmail.com',
    profileImage: insplace,
  });
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

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header _back _content="프로필 수정" />
      <Container>
        <ProfileWrap>
          <Image
            type="circle"
            width="169px"
            height="169px"
            src={preview || state.profileImage}
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
          <Input name="nickname" value={state.nickname} onChange={onChange} />
        </Grid>
        <Grid margin="0 0 32px 0">
          <Label fontSize="16px" color="#A3A6AA">
            MBTI
          </Label>
          <Input name="mbtiId" value={state.mbtiId} onChange={onChange} />
        </Grid>
        <Grid margin="0 0 32px 0">
          <Label fontSize="16px" color="#A3A6AA">
            이메일
          </Label>
          <Input name="email" value={state.email} onChange={onChange} />
        </Grid>
        <Grid padding="60px 0 0 0">
          <Button type="fullSizeBlack">수정하기</Button>
        </Grid>
      </Container>
    </>
  );
};

const ProfileWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 102px 0 132px;
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

export default MyPageEdit;
