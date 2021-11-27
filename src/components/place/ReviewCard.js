import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button, Grid, Text, Image } from '../../elements/index';
import { good, bad, profile1, report, more } from '../../images/index';
import { reviewLikeDB, reviewLikeCancelDB } from '../../redux/async/place';
import ReviewSwiper from './ReviewSwiper';
import { setMoreModalOn } from '../../redux/modules/commonSlice';

const ReviewCard = forwardRef((props, ref) => {
  const { info, postId, loginUser, userId, type } = props;
  const dispatch = useDispatch();
  const date = info.createdAt.split('T')[0];
  const userCheck = loginUser === info.nickname;
  const { t } = useTranslation();

  const params = {
    postId,
    reviewId: info.reviewId,
    reviewType: type === 'like',
  };

  // 리뷰 좋아요
  const handleLikes = async () => {
    dispatch(reviewLikeDB(params));
  };
  // 리뷰 좋아요 취소
  const handleLikesCancel = async () => {
    dispatch(reviewLikeCancelDB(params));
  };

  const showMoreModal = (reviewId, id, typeValue) => {
    const moreParams = {
      postId,
      reviewId,
      userId: id,
      type: typeValue,
    };
    dispatch(setMoreModalOn(moreParams));
  };

  return (
    <>
      <ReviewCardWrap ref={ref}>
        {/* 유저 프로필 */}
        <Grid justify="space-between">
          <Grid isFlex>
            <Grid>
              <UserProfile
                src={info.userImage === null ? profile1 : info.userImage}
              />
            </Grid>
            <Grid margin="0 0 0 12px">
              <Text fontSize="14px" color="#3E4042">
                {info.nickname}
              </Text>

              {info.gender === null && info.mbti === '모름' ? (
                <></>
              ) : (
                <Text fontSize="12px" color="#A3A6AA" letterSpacing="0.0008em">
                  <>
                    {info.gender !== null && (
                      <>
                        {info.gender}
                        <Line />
                      </>
                    )}
                    {info.mbti !== '모름' && info.mbti}
                  </>
                </Text>
              )}
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
              {t('ReviewCard.weather')}
            </Text>
            <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
              {info.weather}
            </Text>
          </Grid>
          <Grid isFlex width="50%">
            <Text
              margin="0 20px 0 0"
              fontSize="14px"
              color="#3E4042"
              letterSpacing="-0.0008em"
            >
              {t('ReviewCard.days')}
            </Text>
            <Text fontSize="14px" color="#7A7D81" letterSpacing="-0.0008em">
              {info.weekdayYN ? t('ReviewCard.week.0') : t('ReviewCard.week.1')}
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
            {t('ReviewCard.revisited')}
          </Text>
          <Grid>
            <Image width="16px" src={info.revisitYN ? good : bad} />
          </Grid>
        </Grid>
        <ReviewDesc>{info.reviewDesc}</ReviewDesc>
        <Grid margin="0 0 24px 0">
          <ReviewSwiper list={info.reviewImages} />
        </Grid>
        <Grid justify="space-between">
          <Grid isFlex>
            {info.likeState ? (
              <LikeButton className="active" onClick={handleLikesCancel}>
                {t('ReviewCard.help')}
              </LikeButton>
            ) : (
              <LikeButton onClick={handleLikes}>
                {t('ReviewCard.help')}
              </LikeButton>
            )}
            {info.likeCnt > 0 && (
              <Text fontSize="13px" color="#3E4042">
                {info.likeCnt}
                {t('ReviewCard.helpPeople')}
              </Text>
            )}
          </Grid>
          {loginUser &&
            (userCheck ? (
              <Button
                padding="5px 10px"
                _onClick={() => showMoreModal(info.reviewId, userId, '')}
              >
                <Image src={more} />
              </Button>
            ) : (
              <Button
                padding="5px 10px"
                _onClick={() => showMoreModal(info.reviewId, userId, 'report')}
              >
                <Image src={report} />
              </Button>
            ))}
        </Grid>
      </ReviewCardWrap>
    </>
  );
});

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
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
`;
export default React.memo(ReviewCard);
