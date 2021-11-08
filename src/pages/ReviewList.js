/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getReviewList, getReviewLikesList } from '../shared/api/placeApi';
import { Grid, Text } from '../elements';
import ReviewCard from '../components/place/ReviewCard';

const ReviewList = props => {
  const { postId } = props;
  const userInfo = useSelector(state => state.user.userInfo);
  const [active, setActive] = useState({ likeList: false, newList: true });
  const [reviews, setReviews] = useState({
    postId,
    pageNumbr: 1,
    reviewList: [],
  });
  console.log('reviews', reviews.reviewList);
  // 무한 스크롤 추가해야함
  const getReviewsListLoad = async type => {
    try {
      const res =
        type === 'list'
          ? await getReviewList(reviews)
          : await getReviewLikesList(reviews);

      if (res.data) {
        setReviews({ ...reviews, reviewList: res.data.reviews });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 최신순 추천순 버튼
  const onClick = e => {
    if (e.target.name === 'likeList') {
      setActive({ ...active, likeList: true, newList: false });
      getReviewsListLoad();
    } else {
      setActive({ ...active, likeList: false, newList: true });
      getReviewsListLoad('list');
    }
  };

  useEffect(() => {
    getReviewsListLoad('list');
  }, []);
  return (
    <ReviewWrap>
      <ReviewTitle>
        <Grid justify="space-between">
          <Grid>
            <Text fontSize="18px" color="#282828" bold>
              리뷰 ({reviews.reviewList && reviews.reviewList.length})
            </Text>
          </Grid>
          <Grid isFlex>
            <ReviewButton
              className={active.newList && 'active'}
              name="newList"
              onClick={onClick}
            >
              {active.newList && <Dotted />}
              최신순
            </ReviewButton>
            <ReviewButton
              className={active.likeList && 'active'}
              name="likeList"
              onClick={onClick}
            >
              {active.likeList && <Dotted />}
              추천순
            </ReviewButton>
          </Grid>
        </Grid>
      </ReviewTitle>
      {reviews.reviewList &&
        reviews.reviewList.map(item => {
          return (
            <ReviewCard
              key={item.userID}
              loginUser={userInfo.nickname}
              postId={reviews.postId}
              list={reviews.reviewList}
              {...item}
            />
          );
        })}
    </ReviewWrap>
  );
};
const ReviewTitle = styled.div`
  padding: 32px 22px 16px;
`;
const Dotted = styled.span`
  &:before {
    display: inline-block;
    content: '';
    width: 4px;
    height: 4px;
    margin: 0px 4px 3px 0px;
    border-radius: 50%;
    background-color: #000;
  }
`;
const ReviewWrap = styled.section`
  padding-bottom: 50px;
  background-color: #fff;
`;

const ReviewButton = styled.button`
  font-size: 13px;
  font-weight: 300;
  color: #c2c6cb;
  &.active {
    color: #3e4042;
    font-weight: 600;
  }
`;

export default React.memo(ReviewList);
