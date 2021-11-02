import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Grid, Image, Text, Textarea } from '../elements';
// import Header from '../components/common/Header';

const ReviewWrite = () => {
  const [state, setState] = useState({ review: '' });
  const onChange = e => {
    setState({ review: e.target.value });
  };
  return (
    <Container>
      {/* <Header _type="search" _back _content="리뷰쓰기" /> */}
      <Grid>
        <TopGrid>
          <Image width="64px" height="64px" />
          <Grid flex margin="0 0 0 20px">
            <Text fontSize="13px" color="#A3A6AA">
              카페
            </Text>
            <Text type="Title16">스터디카페포레 역삼 2호점</Text>
          </Grid>
        </TopGrid>
      </Grid>
      <Background />
      <Grid>
        <QuestionsBox>
          <Text type="Title16">날씨는 어땠나요?</Text>
          <ButtonWrap>
            <QuestionsButton>맑음</QuestionsButton>
            <QuestionsButton>비</QuestionsButton>
            <QuestionsButton>눈</QuestionsButton>
            <QuestionsButton>기억안남</QuestionsButton>
          </ButtonWrap>
        </QuestionsBox>
        <QuestionsBox>
          <Text type="Title16">언제 가셨나요?</Text>
          <ButtonWrap>
            <QuestionsButton>평일</QuestionsButton>
            <QuestionsButton>주말</QuestionsButton>
          </ButtonWrap>
        </QuestionsBox>
        <QuestionsBox>
          <Text type="Title16">재방문 의사가 있으신가요?</Text>
          <ButtonWrap>
            <QuestionsButton>있음</QuestionsButton>
            <QuestionsButton>없음</QuestionsButton>
          </ButtonWrap>
        </QuestionsBox>
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
          {state.review.length} / 최소 15자
        </Text>
      </ReviewBox>
    </Container>
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
const QuestionsBox = styled.div`
  padding: 32px 0 0;
`;
const ButtonWrap = styled.div`
  margin-top: 16px;
  button {
    &:last-child {
      margin-right: 0;
    }
  }
`;
const QuestionsButton = styled.button`
  margin-right: 12px;
  padding: 12px 20px;
  border: 1px solid #7a7d81;
  &.active {
    color: #fff;
    background-color: #232529;
  }
`;

const ReviewBox = styled.div`
  margin-top: 32px;
  padding: 32px 0;
  border-top: 1px solid #f0f0f0;
`;

export default ReviewWrite;
