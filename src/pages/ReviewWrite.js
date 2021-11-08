/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import { Button, Container, Grid, Image, Text, Textarea } from '../elements';
import { whiteClose, xcircle } from '../images/index';
import SelectedContents from '../components/place/SelectedContents';
import {
  addReviewDB,
  getReviewEditDB,
  updateReviewDB,
} from '../redux/async/place';
import ReviewPostInfo from '../components/place/ReviewPostInfo';

const ReviewWrite = props => {
  const { id } = props.match.params;
  const reviewId = props.history.location.state;
  const review = useSelector(state => state.place.review);
  const dispatch = useDispatch();
  const fileInput = useRef();
  const reviewTypeEdit = reviewId !== undefined;

  const [state, setState] = useState(
    review !== null
      ? {
          postId: id,
          reviewDesc: review.reviewDesc,
          reviewImages: review.reviewImages,
          weather: review.weather,
          weekdayYN: review.weekdayYN,
          revisitYN: review.revisitYN,
        }
      : {
          postId: id,
          reviewDesc: '',
          reviewImages: [],
          weather: 1,
          weekdayYN: 1,
          revisitYN: 1,
        },
  );

  const [preview, setPreview] = useState(
    state !== null ? state.reviewImages : [],
  );

  // const [state, setState] = useState({
  //   postId: id,
  //   reviewDesc: review.reviewDesc !== undefined ? review.reviewDesc : '',
  //   reviewImages: review.reviewImages ? review.reviewImages : [],
  //   weather: review.weather ? review.weather : 1,
  //   weekdayYN: review.weekdayYN ? review.weekdayYN : 1,
  //   revisitYN: review.revisitYN ? review.revisitYN : 1,
  // });

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
      const addImage = [];
      addImage.push(reader.result);
      setPreview(preview.concat(addImage));
    };
    setState({ ...state, reviewImages: state.reviewImages.concat(file) });

    // file 읽기 실패되었을때 실행
    reader.onerror = error => {
      window.alert('이미지를 읽어들이는데 오류가 발생했습니다.');
      console.log('error = ', error);
    };
  };

  const deleteImage = index => {
    if (state !== null) {
      const newImage = preview.filter((_item, idx) => {
        return idx !== index;
      });
      const filterImage = state.reviewImages.filter((_item, idx) => {
        return idx !== index;
      });
      setPreview(newImage);
      setState({ ...state, reviewImages: filterImage });
    }
  };

  const onChange = e => {
    setState({ ...state, reviewDesc: e.target.value });
  };

  // 리뷰 등록 수정
  const handleReview = () => {
    if (state.reviewDesc.length <= 14) {
      window.alert('리뷰는 최소 15자 이상으로 적어주세요');
      return;
    }
    const formData = new FormData();
    formData.append('postId', state.postId);
    formData.append('reviewDesc', state.reviewDesc);
    formData.append('weather', state.weather);
    formData.append('weekdayYN', state.weekdayYN);
    formData.append('revisitYN', state.revisitYN);

    for (let i = 0; i < state.reviewImages.length; i += 1) {
      formData.append('reviewImages', state.reviewImages[i]);
    }

    const params = {
      postId: state.postId,
      reviewId,
      data: formData,
    };
    if (reviewTypeEdit) {
      dispatch(updateReviewDB(params));
    } else {
      dispatch(addReviewDB(params));
    }
  };

  const test = () => {
    console.log(' 여기 새로고침 해도 찍혀?');
    setState({
      postId: id,
      reviewDesc: review.reviewDesc,
      reviewImages: review.reviewImages,
      weather: review.weather,
      weekdayYN: review.weekdayYN,
      revisitYN: review.revisitYN,
    });
    setPreview([].concat(review.reviewImages));
    console.log('함수안에서 state = ', state);
  };

  // 리뷰 수정일때 정보 받아오기
  const getReviewEdit = () => {
    const params = { reviewId, postId: id };
    dispatch(getReviewEditDB(params));
  };
  useEffect(() => {
    if (reviewTypeEdit) {
      getReviewEdit();
    }
  }, []);

  useEffect(() => {
    if (review) {
      test();
    }
    // 리뷰 수정 등록 같이 써서
    // 뒤로가기 버튼 클릭후 다시 들어가면 이전 상태값이 남아있어서
    // 뒷정리 함수에서 정리해야함
    return () => {
      console.log('뒷정리');
    };
  }, []);

  return (
    <>
      <Header _back _content={reviewTypeEdit ? '리뷰 수정' : '리뷰 쓰기'} />
      <Container>
        <ReviewPostInfo postId={id} />
        <Grid>
          {selectData.map(item => {
            console.log('state = ', state);
            return (
              <SelectedContents
                selectType="review"
                key={`key-${item.title}`}
                {...item}
                state={state}
                setState={setState}
                selectData={selectData}
                setSelectData={setSelectData}
                actvie={selectData.type}
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
            placeholder="최소 15자 이상 써주세요"
            value={state !== null && state.reviewDesc}
            _onChange={onChange}
          >
            {state !== null && state.reviewDesc}
          </Textarea>
          <Text
            margin="12px 0 0 0"
            textAlign="right"
            fontSize="14px"
            color="#C2C6CB"
          >
            {state !== null ? state.reviewDesc.length : 0} / 최소 15자
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
            {state !== null &&
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
          <Button type="fullSizeBlack" _onClick={handleReview}>
            {reviewTypeEdit ? '리뷰 수정하기' : '리뷰 등록하기'}
          </Button>
        </Grid>
      </Container>
    </>
  );
};
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
