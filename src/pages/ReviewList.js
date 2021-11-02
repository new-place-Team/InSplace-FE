/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import ReviewCard from '../components/place/ReviewCard';

const ReviewList = () => {
  const [active, setActive] = useState({ likeList: true, newList: false });

  const onClick = e => {
    if (e.target.name === 'likeList') {
      setActive({ ...active, likeList: true, newList: false });
    } else {
      setActive({ ...active, likeList: false, newList: true });
    }
  };

  return (
    <ReviewWrap>
      <ReviewTitle>
        <Grid justify="space-between">
          <Grid>
            <Text fontSize="18px" color="#282828" bold>
              리뷰 (100)
            </Text>
          </Grid>
          <Grid isFlex>
            <Button
              className={active.likeList && 'active'}
              name="likeList"
              onClick={onClick}
            >
              {active.likeList && <Dotted />}
              추천순
            </Button>
            <Button
              className={active.newList && 'active'}
              name="newList"
              onClick={onClick}
            >
              {active.newList && <Dotted />}
              최신순
            </Button>
          </Grid>
        </Grid>
      </ReviewTitle>
      {/* 배열로 할 예정 */}
      <ReviewCard />
    </ReviewWrap>
  );
};

const ReviewWrap = styled.section`
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

const Button = styled.button`
  font-size: 13px;
  font-weight: 300;
  color: #c2c6cb;
  &.active {
    color: #3e4042;
    font-weight: 600;
  }
`;

export default ReviewList;
