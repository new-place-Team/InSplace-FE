/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import heic2any from 'heic2any';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import { Button, Container, Grid, Image, Text, Textarea } from '../elements';
import { whiteClose, xcircle } from '../images/index';
import SelectedContents from '../components/place/SelectedContents';
import { addReviewDB, updateReviewDB } from '../redux/async/place';
import ReviewPostInfo from '../components/place/ReviewPostInfo';
import { getReviewEdit } from '../shared/api/placeApi';
import CommonModal from '../components/common/CommonModal';
import {
  setCommonModalOn,
  setErrorModalOn,
} from '../redux/modules/commonSlice';
import Spinner from '../components/common/Spinner';
import { getLoaded } from '../redux/modules/loadedSlice';

const ReviewWrite = props => {
  const { history, match } = props;
  const { id } = match.params;
  const reviewId = history.location.state;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const commonModal = useSelector(state => state.common.modalStatus);
  const errorModal = useSelector(state => state.common.errorStatus);
  const isLoading = useSelector(state => state.loaded.is_loaded);
  const fileInput = useRef();
  const reviewTypeEdit = reviewId !== undefined;
  const [preview, setPreview] = useState([]);

  const [state, setState] = useState({
    postId: id,
    reviewDesc: '',
    reviewImages: [],
    weather: 1,
    weekdayYN: 1,
    revisitYN: 1,
    reviewId: 0,
  });

  const [selectData, setSelectData] = useState([
    {
      title: t('ReviewWrite.selectWeather.selectTitle'),
      list: [
        {
          selecteText: t('ReviewWrite.selectWeather.weatherType.0'),
          value: 1,
        },
        {
          selecteText: t('ReviewWrite.selectWeather.weatherType.1'),
          value: 2,
        },
        {
          selecteText: t('ReviewWrite.selectWeather.weatherType.2'),
          value: 3,
        },
        {
          selecteText: t('ReviewWrite.selectWeather.weatherType.3'),
          value: 4,
        },
        {
          selecteText: t('ReviewWrite.selectWeather.weatherType.4'),
          value: 5,
        },
      ],
      type: 'weather',
    },
    {
      title: t('ReviewWrite.selectWeek.selectTitle'),
      list: [
        { selecteText: t('ReviewWrite.selectWeek.weekType.0'), value: 1 },
        { selecteText: t('ReviewWrite.selectWeek.weekType.1'), value: 0 },
      ],
      type: 'weekdayYN',
    },
    {
      title: t('ReviewWrite.selectreVisited.selectTitle'),
      list: [
        { selecteText: t('ReviewWrite.selectreVisited.yesOrNo.0'), value: 1 },
        { selecteText: t('ReviewWrite.selectreVisited.yesOrNo.1'), value: 0 },
      ],
      type: 'revisitYN',
    },
  ]);

  const selectFile = () => {
    if (preview.length >= 3) {
      const params = {
        title: t('ReviewWrite.Modal.minPhoto'),
      };
      dispatch(setCommonModalOn(params));
      return;
    }
    dispatch(getLoaded(true));
    const reader = new FileReader();
    let file = fileInput.current.files[0];
    // 아이폰 11부터 HEIC 파일이여서 jpeg로 변환해줌
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
        reader.onloadend = () => {
          dispatch(getLoaded(false));
          const addImage = [];
          addImage.push(reader.result);
          setPreview(preview.concat(addImage));
          setState({ ...state, reviewImages: state.reviewImages.concat(file) });
        };
      });
    } else {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        dispatch(getLoaded(false));
        const addImage = [];
        addImage.push(reader.result);
        setPreview(preview.concat(addImage));
      };

      setState({ ...state, reviewImages: state.reviewImages.concat(file) });
    }

    // // file 읽는게 성공적으로 되었을때 실행
    // reader.onload = () => {
    //   const addImage = [];
    //   addImage.push(reader.result);
    //   setPreview(preview.concat(addImage));
    // };
    // setState({ ...state, reviewImages: state.reviewImages.concat(file) });

    // // file 읽기 실패되었을때 실행
    // reader.onerror = error => {
    //   const params = {
    //     title: t('ReviewWrite.Modal.errorPhoto'),
    //   };
    //   dispatch(setCommonModalOn(params));
    //   console.log('error = ', error);
    // };
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
    if (commonModal) return;
    if (state.reviewDesc.length <= 4) {
      const params = { title: t('ReviewWrite.Modal.minReview') };
      dispatch(setCommonModalOn(params));
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
      msg: t('ReviewWrite.Modal.msg'),
    };

    if (reviewTypeEdit) {
      dispatch(updateReviewDB(params));
    } else {
      dispatch(addReviewDB(params));
    }
  };

  // 리뷰 수정일때 정보 받아오기
  const getReviewEditLoad = async () => {
    try {
      const params = { reviewId, postId: id };
      const response = await getReviewEdit(params);
      const data = response.data.review;
      if (response) {
        setState({
          postId: id,
          reviewDesc: data.reviewDesc,
          reviewImages: data.reviewImages,
          weather: data.weather,
          weekdayYN: data.weekdayYN,
          revisitYN: data.revisitYN,
          reviewId: data.reviewId,
        });
        setPreview(data.reviewImages);
      }
    } catch (err) {
      console.log('err == ', err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      dispatch(setErrorModalOn(modalParams));
    }
  };

  useEffect(() => {
    if (reviewId !== undefined) {
      getReviewEditLoad();
    }
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {commonModal && <CommonModal />}
      {errorModal && <CommonModal type="error" />}
      <Header
        _back
        _content={
          reviewTypeEdit
            ? t('ReviewWrite.headerSubTitle.0')
            : t('ReviewWrite.headerSubTitle.1')
        }
      />
      <Container>
        <ReviewPostInfo postId={id} />

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
              actvie={selectData.type}
            />
          );
        })}

        <ReviewBox>
          <Text type="Title16">{t('ReviewWrite.reviewTitle')}</Text>
          <Textarea
            margin="16px 0 0 0"
            padding="20px"
            border="1px solid #E6E9EC"
            placeholder={t('ReviewWrite.reviewPlaceholder')}
            value={state.reviewDesc}
            _onChange={onChange}
          >
            {state.reviewDesc}
          </Textarea>
          <Text
            margin="12px 0 0 0"
            textAlign="right"
            fontSize="14px"
            color="#C2C6CB"
          >
            {state.reviewDesc.length} / {t('ReviewWrite.minText')}
          </Text>
        </ReviewBox>
        <ReviewBox>
          <Text type="Title16">{t('ReviewWrite.uploadPhoto')}</Text>
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
            {reviewTypeEdit
              ? t('ReviewWrite.EditOrRegister.0')
              : t('ReviewWrite.EditOrRegister.1')}
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
  margin-top: 3px;
  margin-right: 10px;

  .closeButton {
    border: 1px solid red;
  }
  &:last-child {
    margin-right: 0px;
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
