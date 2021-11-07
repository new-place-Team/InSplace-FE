/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Header from '../components/common/Header';
import { Button, Container, Grid, Image, Text, Textarea } from '../elements';
import { whiteClose, xcircle } from '../images/index';
import SelectedContents from '../components/place/SelectedContents';
import { getReview } from '../shared/api/placeApi';
import { addReviewDB } from '../redux/async/place';

const ReviewWrite = props => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const fileInput = useRef();
  const [preview, setPreview] = useState([]);
  const [postInfo, setPostInfo] = useState({
    postId: id,
    category: '',
    postImage: '',
    title: '',
  });
  const [state, setState] = useState({
    postId: id,
    reviewDesc: '',
    reviewImages: [],
    weather: 1,
    weekdayYN: 1,
    revisitYN: 1,
  });
  const [selectData, setSelectData] = useState([
    {
      title: '날씨는 어땠나요?',
      list: [
        { selecteText: '맑음', value: 1 },
        { selecteText: '비', value: 2 },
        { selecteText: '눈', value: 3 },
        { selecteText: '흐림', value: 4 },
        { selecteText: '기억안남', value: 5 },
      ],
      type: 'weather',
    },
    {
      title: '언제 가셨나요?',
      list: [
        { selecteText: '평일', value: 1 },
        { selecteText: '주말', value: 0 },
      ],
      type: 'weekdayYN',
    },
    {
      title: '재방문 의사가 있으신가요?',
      list: [
        { selecteText: '있음', value: 1 },
        { selecteText: '없음', value: 0 },
      ],
      type: 'revisitYN',
    },
  ]);

  // 포스트 정보는 리덕스에 저장할 필요가 없어서 호출만함
  const onLoad = async () => {
    try {
      const res = await getReview(id);
      setPostInfo(res.data.post);
    } catch (e) {
      console.log(e);
    }
  };

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
      // console.log(reader.result, file);
      const addImage = [];
      addImage.push(reader.result);
      setPreview(preview.concat(addImage));
      // setState({ ...state, reviewImages: state.reviewImages.concat(addImage) });
    };
    setState({ ...state, reviewImages: state.reviewImages.concat(file) });
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

  const onAddReview = () => {
    const formData = new FormData();
    formData.append('postId', state.postId);
    formData.append('reviewDesc', state.reviewDesc);
    formData.append('weather', state.weather.value);
    formData.append('weekdayYN', state.weekdayYN.value);
    formData.append('revisitYN', state.revisitYN.value);
    for (let i = 0; i < state.reviewImages.length; i += 1) {
      formData.append('reviewImages', state.reviewImages[i]);
    }
    const params = {
      postId: state.postId,
      data: formData,
    };
    dispatch(addReviewDB(params));
  };
  useEffect(() => {
    if (id !== undefined) {
      onLoad();
    }
  }, []);
  return (
    <>
      <Header _back _content="리뷰쓰기" />
      <Container>
        <TopGrid>
          <Image width="64px" height="64px" src={postInfo.postImage} />
          <Grid flex margin="0 0 0 20px">
            <Text fontSize="13px" color="#A3A6AA">
              {postInfo.category}
            </Text>
            <Text type="Title16">{postInfo.title}</Text>
          </Grid>
        </TopGrid>
        <Background />
        <Grid>
          {selectData.map(item => {
            return (
              <SelectedContents
                selectType="review"
                key={`key-${item.title}`}
                {...item}
                state={state}
                setState={setState}
                selectData={selectData}
                setSelectData={setSelectData}
              />
            );
          })}
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
