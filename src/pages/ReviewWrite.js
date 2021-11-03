/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Container, Grid, Image, Text, Textarea } from '../elements';
import { whiteClose, xcircle } from '../images/index';
import Header from '../components/common/Header';

const ReviewWrite = props => {
  // const detailData = useSelector(state => state.place.detailInfo);
  const { description, placeImage, title } = props.history.location.state;
  const fileInput = React.useRef();
  const [preview, setPreview] = useState([]);
  const [state, setState] = useState({
    reviewDesc: '',
    reviewImages: [],
    weather: 1,
    weekdayYN: 1,
    revisitYN: 1,
  });

  const selectFile = () => {
    if (preview.length >= 3) {
      window.alert('이미지는 최대 3개까지 등록 가능합니다.');
      return;
    }
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    // file 읽는게 성공적으로 되었을때 실행
    reader.onload = () => {
      console.log(reader.result, file);
      const addImage = [];
      addImage.push(reader.result);
      setPreview(preview.concat(addImage));
    };
    // file 읽기 실패되었을때 실행
    reader.onerror = error => {
      console.log('error = ', error);
    };
  };

  const deleteImage = index => {
    const newImage = preview.filter((_item, idx) => {
      return idx !== index;
    });
    setPreview(newImage);
  };

  const onChange = e => {
    setState({ ...state, reviewDesc: e.target.value });
  };

  const onClick = (name, value) => {
    // 날씨는 수정해야함
    if (name === 'weather') {
      setState({ ...state, weather: value });
    }
    if (name === 'weekdayYN') {
      setState({ ...state, weekdayYN: value });
    }
    if (name === 'revisitYN') {
      setState({ ...state, revisitYN: value });
    }
  };

  const onAddReview = () => {
    if (state.reviewDesc.length < 15) {
      window.alert('리뷰는 최소 15자 이상 등록 가능합니다.');
    }
  };

  return (
    <>
      <Header _back _content="리뷰쓰기" />
      <Container>
        <TopGrid>
          <Image width="64px" height="64px" src={placeImage} />
          <Grid flex margin="0 0 0 20px">
            <Text fontSize="13px" color="#A3A6AA">
              {description}
            </Text>
            <Text type="Title16">{title}</Text>
          </Grid>
        </TopGrid>
        <Background />
        <Grid>
          <ReviewBox>
            <Text type="Title16">날씨는 어땠나요?</Text>
            <ButtonWrap>
              <QuestionsButton>맑음</QuestionsButton>
              <QuestionsButton>비</QuestionsButton>
              <QuestionsButton>눈</QuestionsButton>
              <QuestionsButton>흐림</QuestionsButton>
              <QuestionsButton>기억안남</QuestionsButton>
            </ButtonWrap>
          </ReviewBox>
          <ReviewBox>
            <Text type="Title16">언제 가셨나요?</Text>
            <ButtonWrap>
              <QuestionsButton onClick={() => onClick('weekdayYN', 1)}>
                평일
              </QuestionsButton>
              <QuestionsButton onClick={() => onClick('weekdayYN', 0)}>
                주말
              </QuestionsButton>
            </ButtonWrap>
          </ReviewBox>
          <ReviewBox>
            <Text type="Title16">재방문 의사가 있으신가요?</Text>
            <ButtonWrap>
              <QuestionsButton onClick={() => onClick('revisitYN', 1)}>
                있음
              </QuestionsButton>
              <QuestionsButton onClick={() => onClick('revisitYN', 0)}>
                없음
              </QuestionsButton>
            </ButtonWrap>
          </ReviewBox>
        </Grid>
        <ReviewBox>
          <Text type="Title16">상세한 후기를 써주세요</Text>
          <Textarea
            margin="16px 0 0 0"
            padding="20px"
            border="1px solid #E6E9EC"
            _onChange={onChange}
          />
          <Text
            margin="12px 0 0 0"
            textAlign="right"
            fontSize="14px"
            color="#C2C6CB"
          >
            {state.reviewDesc.length} / 최소 15자
          </Text>
        </ReviewBox>
        <ReviewBox>
          <Text type="Title16">사진을 올려주세요 (선택)</Text>
          <Grid isFlex margin="16px 0 150px 0">
            <UploadLabel htmlFor="uploadImage">
              <ImageBox>
                <Image width="10px" height="10px" src={whiteClose} />
                <Text fontSize="14px" margin="8px 0 0 0" color="#fff">
                  {preview.length}/3
                </Text>
              </ImageBox>
            </UploadLabel>
            <UploadInput
              type="file"
              id="uploadImage"
              name="reviewImage"
              ref={fileInput}
              onChange={selectFile}
            />
            {preview.length > 0 &&
              preview.map((item, idx) => {
                return (
                  <PreviewGrid key={`preview-${item}`}>
                    <Image width="80px" height="80px" src={item} />
                    <CloseIcon src={xcircle} onClick={() => deleteImage(idx)} />
                  </PreviewGrid>
                );
              })}
          </Grid>
        </ReviewBox>
        <Grid padding="0 0 40px 0">
          <Button type="fullSizeBlack" _onClick={onAddReview}>
            리뷰 등록하기
          </Button>
        </Grid>
      </Container>
    </>
  );
};
const Background = styled.div`
  width: 100%;
  height: 16px;
  background-color: #efefef;
`;
const TopGrid = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const ReviewBox = styled.div`
  padding: 32px 0 0;
`;
const ButtonWrap = styled.div`
  margin-top: 16px;
  button {
    &:last-child {
      margin-right: 0;
    }
  }
`;
const QuestionsButton = styled.button`
  margin-right: 12px;
  padding: 12px 20px;
  border: 1px solid #7a7d81;
  &.active {
    color: #fff;
    background-color: #232529;
  }
`;

const UploadLabel = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin-right: 10px;
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
const PreviewGrid = styled.div`
  position: relative;
  margin-right: 10px;
  .closeButton {
    border: 1px solid red;
  }
`;
const CloseIcon = styled.img`
  position: absolute;
  top: 0;
  right: 0%;
  width: 20px;
  height: 20px;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`;
export default ReviewWrite;
