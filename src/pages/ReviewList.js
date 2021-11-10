import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import ReviewCard from '../components/place/ReviewCard';
import { getReviewLikesList, getReviewList } from '../shared/api/placeApi';
// import { getReviewLikesListDB, getReviewListDB } from '../redux/async/place';

const ReviewList = props => {
  const { postId } = props;
  // const dispatch = useDispatch();
  // const reviewList = useSelector(state => state.place.reviewList);
  // const reviewLikeList = useSelector(state => state.place.reivewLikesList);

  const userInfo = useSelector(state => state.user.userInfo);

  const [active, setActive] = useState({ likeList: false, newList: true });
  const [reviews, setReviews] = useState({
    postId,
    pageNumbr: 1,
    reviewList: [],
  });

  const reviewListLoad = async value => {
    const type = value === 'list';
    try {
      const res = type
        ? await getReviewList(reviews)
        : await getReviewLikesList(reviews);
      const { data } = res;

      if (res.data) {
        setReviews({ ...reviews, reviewList: data.reviews });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 최신순, 추천순 클릭시 list 새로 담는 부분 수정해야함
  // const getReviewsListLoad = type => {
  //   // 최신순
  //   if (type === 'list') {
  //     dispatch(getReviewListDB(reviews));
  //     setReviews({ ...reviews, reviewList: [].concat(reviewList) });
  //   } else {
  //     // 추천순
  //     dispatch(getReviewLikesListDB(reviews));
  //     setReviews({ ...reviews, reviewList: [].concat(reviewLikeList) });
  //   }
  // };

  // 최신순 추천순 버튼
  const onClick = e => {
    if (e.target.name === 'likeList') {
      setActive({ ...active, likeList: true, newList: false });
      reviewListLoad();
    } else {
      setActive({ ...active, likeList: false, newList: true });
      reviewListLoad('list');
    }
  };

  // 원래는 리뷰 컴포넌트 분리해서,
  // 컴포넌트 안에 들어왔을때 미들웨어 호출해서 보여주려고 했었음.
  useEffect(() => {
    reviewListLoad('list');
  }, []);

  return (
    <ReviewWrap>
      <ReviewTitle>
        <Grid justify="space-between">
          <Grid>
            <Text fontSize="18px" color="#282828" bold>
              리뷰 ({reviews.reviewList.length})
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
              reviewListLoad={reviewListLoad}
              {...item}
            />
          );
        })}
      {/* {reviewsList &&
        reviewsList.map(item => {
          return (
            <ReviewCard
              key={item.userID}
              loginUser={userInfo.nickname}
              postId={reviews.postId}
              list={reviews.reviewList}
              {...item}
            />
          );
        })} */}
    </ReviewWrap>
  );
};

const ReviewWrap = styled.section`
  padding-bottom: 50px;
  background-color: #fff;
`;
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
