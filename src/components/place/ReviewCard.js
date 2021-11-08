/* eslint-disable no-shadow */
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, Grid, Text, Image } from '../../elements/index';
import { good, bad, profile1 } from '../../images/index';
import // deleteReviewDB,
// reviewLikeCancelDB,
// reviewLikeDB,
'../../redux/async/place';
import ReviewSwiper from './ReviewSwiper';
import { history } from '../../redux/configureStore';
import {
  deleteReview,
  reviewLike,
  reviewLikeCancel,
} from '../../shared/api/placeApi';

const ReviewCard = props => {
  const {
    loginUser,
    postId,
    createdAt,
    gender,
    likeCnt,
    likeState,
    mbti,
    nickname,
    reviewDesc,
    reviewId,
    reviewImages,
    revisitYN,
    userImage,
    weather,
    weekdayYN,
    reviewListLoad,
  } = props;
  // const dispatch = useDispatch();
  const date = createdAt.split('T')[0];
  const [reviewActive, setReviewActive] = useState({
    reviewId,
    active: likeState,
  });

  const params = { postId, reviewId };

  // 리뷰 좋아요, 좋아요 취소 수정해야함
  const handleLikes = async () => {
    try {
      const res = await reviewLike(params);
      if (res) {
        setReviewActive({ ...reviewActive, active: !reviewActive.active });
        reviewListLoad('list');
      }
    } catch (e) {
      console.log('e', e);
    }
    // dispatch(reviewLikeDB(params));
  };
  const handleLikesCancel = async () => {
    try {
      const res = await reviewLikeCancel(params);
      if (res) {
        setReviewActive({ ...reviewActive, active: !reviewActive.active });
        reviewListLoad('list');
      }
    } catch (e) {
      console.log('e', e);
    }
    // setReviewActive({ ...reviewActive, active: !reviewActive.active });
    // dispatch(reviewLikeCancelDB(params));
  };

  // 리뷰 수정페이지 이동
  const goToReviewEditPage = () => {
    history.push({ pathname: `/review/edit/${postId}`, state: reviewId });
  };

  // 리뷰 삭제
  const onDeleteReview = async () => {
    try {
      const res = await deleteReview(params);
      if (res) {
        window.alert('리뷰가 삭제되었습니다.');
        reviewListLoad('list');
      }
    } catch (e) {
      console.log(e);
    }
    // dispatch(deleteReviewDB(params));
    // reviewListLoad('list');
  };

  return (
    <ReviewCardWrap>
      {loginUser === nickname && (
        <Grid justify="flex-end">
          <Button size="14px" padding="8px" _onClick={goToReviewEditPage}>
            수정
          </Button>
          <Button
            size="14px"
            padding="8px"
            color="red"
            margin="0 0 0 10px"
            _onClick={onDeleteReview}
          >
            삭제
          </Button>
        </Grid>
      )}
      {/* 유저 프로필 */}
      <Grid justify="space-between">
        <Grid isFlex>
          <Grid>
            <UserProfile src={userImage === null ? profile1 : userImage} />
          </Grid>
          <Grid margin="0 0 0 12px">
            <Text fontSize="14px" color="#3E4042">
              {nickname}
            </Text>
            <Text fontSize="12px" color="#A3A6AA" letterSpacing="0.0008em">
              {gender} <Line /> {mbti}
            </Text>
          </Grid>
        </Grid>
        <Text fontSize="13px" color="#A3A6AA" letterSpacing="-0.0008em">
          {date}
        </Text>
      </Grid>
      <Grid justify="space-between" margin="27px 0 0 0">
        <Grid isFlex width="50%">
          <Text
            margin="0 20px 0 0"
            fontSize="14px"
            color="#3E4042"
            letterSpacing="-0.0008em"
          >
            날씨
          </Text>
          <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
            {weather}
          </Text>
        </Grid>
        <Grid isFlex width="50%">
          <Text
            margin="0 20px 0 0"
            fontSize="14px"
            color="#3E4042"
            letterSpacing="-0.0008em"
          >
            날짜
          </Text>
          <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
            {weekdayYN ? '평일' : '주말'}
          </Text>
        </Grid>
      </Grid>
      <Grid isFlex width="50%">
        <Text
          margin="0 20px 0 0"
          fontSize="14px"
          color="#3E4042"
          letterSpacing="-0.0008em"
        >
          재방문의사
        </Text>
        <Grid>
          <Image width="16px" src={revisitYN ? good : bad} />
        </Grid>
      </Grid>
      <ReviewDesc>{reviewDesc}</ReviewDesc>
      <Grid margin="0 0 24px 0">
        <ReviewSwiper list={reviewImages} />
      </Grid>
      <Grid isFlex>
        {reviewActive.active ? (
          <LikeButton className="active" onClick={handleLikesCancel}>
            도움이돼요
          </LikeButton>
        ) : (
          <LikeButton onClick={handleLikes}>도움이돼요</LikeButton>
        )}
        {likeCnt > 0 && (
          <Text fontSize="13px" color="#3E4042">
            {likeCnt}명에게 도움이 되었습니다
          </Text>
        )}
      </Grid>
    </ReviewCardWrap>
  );
};
const ReviewCardWrap = styled.div`
  padding: 24px 22px;
  border-top: 1px solid #e6e9ec;
`;
const Line = styled.span`
  &::after {
    display: inline-block;
    content: '|';
    color: #c4c4c4;
    margin: 0 5px;
  }
`;
const ReviewDesc = styled.p`
  margin: 16px 0 24px;
  font-size: 14px;
  color: #3e4042;
  letter-spacing: -0.0008em;
  white-space: pre-wrap;
`;

const LikeButton = styled.button`
  margin: 0 12px 0 0;
  padding: 6px 16px;
  font-size: 14px;
  color: #282828;
  border: 1px solid #282828;
  &.active {
    color: #fff;
    background-color: #282828;
  }
`;

const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  display: inline-block;
  /* type="circle"
              width="40px"
              height="40px"
              src={userImage === null ? profile1 : userImage} */
`;
export default React.memo(ReviewCard);
