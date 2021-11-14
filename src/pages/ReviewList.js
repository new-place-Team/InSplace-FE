/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import ReviewCard from '../components/place/ReviewCard';
import { getReviewLikesListDB, getReviewListDB } from '../redux/async/place';
import Spinner from '../components/common/Spinner';

const ReviewList = props => {
  const { postId } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const reviewList = useSelector(state => state.place.reviewList);
  const reviewPagination = useSelector(state => state.place.reviewPagination);
  const reviewLikeList = useSelector(state => state.place.reviewLikesList);
  const reviewLikesPagination = useSelector(
    state => state.place.reviewLikesPagination,
  );

  const [target, setTarget] = useState(null);
  const [likeTarget, setLikeTarget] = useState(null);

  const [active, setActive] = useState({
    likeList: false,
    newList: true,
  });
  // 최신순 추천순 버튼
  const onClick = e => {
    if (e.target.name === 'likeList') {
      setActive({ ...active, likeList: true, newList: false });
      const qureryString = `/posts/${postId}/reviews/pages/1/orders/likes`;

      dispatch(getReviewLikesListDB(qureryString));
    } else {
      setActive({ ...active, likeList: false, newList: true });
    }
  };

  useEffect(() => {
    // 최초한번
    if (!reviewList) {
      const qureryString = `/posts/${postId}/reviews/pages/${reviewPagination.page}/orders/latest`;
      dispatch(getReviewListDB(qureryString));
    }
  }, []);

  // 리뷰 최신순
  useEffect(() => {
    const options = { threshold: 0.5 };
    const moreFun = ([entires], observer) => {
      if (!entires.isIntersecting) {
        return;
      }
      const qureryString = `/posts/${postId}/reviews/pages/${
        reviewPagination.page + 1
      }/orders/latest`;

      dispatch(getReviewListDB(qureryString));
      observer.unobserve(entires.target);
    };
    const observer = new IntersectionObserver(moreFun, options);
    if (target) observer.observe(target);
    if (!reviewPagination.isNext) {
      observer.disconnect();
    }
    // 컴포넌트가 종료될때 observer를 해지
    return () => observer && observer.disconnect();
  }, [target]);

  // 리뷰 추천순
  useEffect(() => {
    const options = { threshold: 0.5 };
    const moreFun = ([entires], observer) => {
      if (!entires.isIntersecting) {
        return;
      }
      const qureryString = `/posts/${postId}/reviews/pages/${
        reviewLikesPagination.page + 1
      }/orders/likes`;

      dispatch(getReviewLikesListDB(qureryString));
      observer.unobserve(entires.target);
    };

    const observer = new IntersectionObserver(moreFun, options);
    if (likeTarget) observer.observe(likeTarget);
    if (!reviewLikesPagination.isNext) {
      observer.disconnect();
    }

    return () => observer && observer.disconnect();
  }, [likeTarget]);

  return (
    <ReviewWrap>
      <Spinner />
      <ReviewTitle>
        <Grid justify="space-between">
          <Grid>
            <Text fontSize="18px" color="#282828" bold>
              리뷰 (
              {active.newList && reviewList
                ? reviewList.length
                : active.likeList && reviewLikeList && reviewLikeList.length}
              )
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
      {active.newList === true &&
        reviewList &&
        reviewList.map((item, idx) => {
          const lastItem = idx === reviewList.length - 1;
          return (
            <>
              <ReviewCard
                key={item.userID}
                loginUser={userInfo.nickname}
                postId={postId}
                info={item}
                ref={lastItem ? setTarget : null}
              />
            </>
          );
        })}
      {reviewLikeList &&
        reviewLikeList.map((item, idx) => {
          const lastItem = idx === reviewLikeList.length - 1;
          return (
            <>
              <ReviewCard
                type="like"
                key={item.userID}
                loginUser={userInfo.nickname}
                postId={postId}
                info={item}
                ref={lastItem ? setLikeTarget : null}
              />
            </>
          );
        })}
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
