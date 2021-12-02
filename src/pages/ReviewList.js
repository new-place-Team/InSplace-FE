/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import ReviewCard from '../components/place/ReviewCard';
import { getReviewLikesListDB, getReviewListDB } from '../redux/async/place';
import Spinner from '../components/common/Spinner';
import {
  deleteReviewList,
  resetReviewPagination,
} from '../redux/modules/placeSlice';
import CommonModal from '../components/common/CommonModal';
import ConfirmModal from '../components/common/ConfirmModal';
import { deleteReview } from '../shared/api/placeApi';
import { setErrorModalOn, setMoreModalOff } from '../redux/modules/commonSlice';

const ReviewList = props => {
  const { postId } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userInfo = useSelector(state => state.user.userInfo);
  const isLoading = useSelector(state => state.loaded.is_loaded);
  // 리뷰 정보
  const reviewList = useSelector(state => state.place.reviewList);
  const reviewPagination = useSelector(state => state.place.reviewPagination);
  const reviewLikeList = useSelector(state => state.place.reviewLikesList);
  const reviewLikesPagination = useSelector(
    state => state.place.reviewLikesPagination,
  );

  // 모달 정보
  const moreInfo = useSelector(state => state.common.moreInfo);
  const reportModalStatus = useSelector(
    state => state.common.reportModalStatus,
  );
  const moreModalStatus = useSelector(state => state.common.moreModalStatus);
  const errorModalStatus = useSelector(state => state.common.errorStatus);
  const loginCheckStatus = useSelector(state => state.common.loginCheckStatus);
  const [confirmModal, setConfirmModal] = useState(false);

  // 리뷰 무한 스크롤
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
      if (!reviewLikeList) {
        const qureryString = `/posts/${postId}/reviews/pages/1/orders/likes`;
        dispatch(getReviewLikesListDB(qureryString));
      }
    } else {
      setActive({ ...active, likeList: false, newList: true });
    }
  };

  useEffect(() => {
    // 맨처음 진입시
    if (!reviewList) {
      const qureryString = `/posts/${postId}/reviews/pages/${reviewPagination.page}/orders/latest`;
      dispatch(getReviewListDB(qureryString));
    }
    // 컴포넌트를 빠져나갔을때 Pagination 정보를 초기화
    return () => {
      dispatch(resetReviewPagination());
    };
  }, []);

  // 리뷰 최신순 무한 스크롤 (추후 커스텀훅으로 변경할예정)
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

  // 리뷰 추천순 무한 스크롤 (추후 커스텀훅으로 변경할 예정)
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

  // 리뷰 삭제 여부 확인하는 modal
  const showConfirmModal = () => {
    setConfirmModal(true);
  };

  // 리뷰 삭제
  const onDeleteReview = async () => {
    try {
      dispatch(deleteReviewList(moreInfo));
      const res = await deleteReview(moreInfo);
      if (res.data === 'OK') {
        setConfirmModal(false);
        dispatch(deleteReviewList(moreInfo));
        dispatch(setMoreModalOff());
      }
    } catch (err) {
      console.log(err.response);
      const modalParams = {
        title: `${err.response.data.errMsg}`,
      };
      dispatch(setErrorModalOn(modalParams));
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {/* review의 더보기 버튼 클릭했을때 나오는 Modal  */}
      {moreModalStatus && (
        <CommonModal type="more" showConfirmModal={showConfirmModal} />
      )}
      {loginCheckStatus && <CommonModal type="loginCheck" />}
      {/* 신고되었다는 확인 메세지 */}
      {reportModalStatus && <CommonModal type="report" />}
      {/* error일때 모달 */}
      {errorModalStatus && <CommonModal type="error" />}
      {/* 리뷰 삭제 버튼 클릭시 한번 더 확인하는 모달 */}
      {/* reviewList 컴포넌트에 둬야 한번만 렌더링됨 */}
      {confirmModal && (
        <ConfirmModal
          title="리뷰를 삭제하시겠어요?"
          content="한번 삭제된 리뷰는 영구적으로 삭제됩니다."
          showModal={showConfirmModal}
          setConfirmModal={setConfirmModal}
          confirmFun={onDeleteReview}
          confirmText={t('CommonModal.delete')}
        />
      )}
      <ReviewWrap>
        <ReviewTitle>
          <Grid justify="space-between">
            <Grid>
              <Text fontSize="18px" color="#282828" bold>
                {t('ReviewListPage.reviewTitle')} (
                {reviewList && reviewList.length})
              </Text>
            </Grid>
            <Grid isFlex>
              <ReviewButton
                className={active.newList && 'active'}
                name="newList"
                onClick={onClick}
              >
                {active.newList && <Dotted />}
                {t('ReviewListPage.reviewFilter.0')}
              </ReviewButton>
              <ReviewButton
                className={active.likeList && 'active'}
                name="likeList"
                onClick={onClick}
              >
                {active.likeList && <Dotted />}
                {t('ReviewListPage.reviewFilter.1')}
              </ReviewButton>
            </Grid>
          </Grid>
        </ReviewTitle>
        {reviewList && reviewList.length === 0 && (
          <NoReviews>아직 등록된 리뷰가 없습니다.</NoReviews>
        )}
        {/* 리뷰 최신순 */}
        {active.newList === true &&
          reviewList &&
          reviewList.map((item, idx) => {
            const lastItem = idx === reviewList.length - 1;
            return (
              <>
                <ReviewCard
                  key={item.reviewId}
                  loginUser={userInfo && userInfo.nickname}
                  postId={postId}
                  info={item}
                  userId={item.userId}
                  ref={lastItem ? setTarget : null}
                />
              </>
            );
          })}
        {/* 리뷰 추천순 */}
        {active.likeList === true &&
          reviewLikeList &&
          reviewLikeList.map((item, idx) => {
            const lastItem = idx === reviewLikeList.length - 1;
            return (
              <>
                <ReviewCard
                  type="like"
                  key={item.reviewId}
                  loginUser={userInfo.nickname}
                  postId={postId}
                  info={item}
                  userId={item.userId}
                  ref={lastItem ? setLikeTarget : null}
                />
              </>
            );
          })}
      </ReviewWrap>
    </>
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
const NoReviews = styled.p`
  width: 100%;
  margin: 80px auto;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.0024e;
  color: #a3a6aa;
`;
export default React.memo(ReviewList);
