import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';

const Skeleton = forwardRef((props, ref) => {
  const { type } = props;
  if (type === 'mainTop') {
    return (
      <MainContainer ref={ref}>
        <WeatherWrap>
          <WeatherContent>
            <SquareGrid />
            <LineGrid>
              <MainTitle />
              <MainDescription />
              <MainDescription />
            </LineGrid>
          </WeatherContent>
          <BottomLine />
          <BottomLine />
        </WeatherWrap>
        <SelectTypeBtn />
      </MainContainer>
    );
  }
  if (type === 'slideCard') {
    return (
      <CardContainer ref={ref}>
        <CardImage />
        <Title />
        <Description />
      </CardContainer>
    );
  }
  if (type === 'searchList') {
    return (
      <CardContainer className="searchList" ref={ref}>
        <CardImage className="searchList">
          <CardShimmerWrapper>
            <Shimmer />
          </CardShimmerWrapper>
        </CardImage>
        <Title className="searchList">
          <TitleShimmerWrapper>
            <Shimmer />
          </TitleShimmerWrapper>
        </Title>
        <Description className="searchList">
          <DescriptionShimmerWrapper>
            <Shimmer />
          </DescriptionShimmerWrapper>
        </Description>
      </CardContainer>
    );
  }
  return (
    <CardContainer ref={ref}>
      <CardImage>
        <CardShimmerWrapper>
          <Shimmer />
        </CardShimmerWrapper>
      </CardImage>
      <Title>
        <TitleShimmerWrapper>
          <Shimmer />
        </TitleShimmerWrapper>
      </Title>
      <Description>
        <DescriptionShimmerWrapper>
          <Shimmer />
        </DescriptionShimmerWrapper>
      </Description>
    </CardContainer>
  );
});

const loading = keyframes`
    0% {
      transform: translateX(-150%);
    }
    50% {
      transform: translateX(-60%);
    }
    100% {
      transform: translate(150%);
    }
`;
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  background-color: #eee;
`;
const WeatherWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 111px 59px 0;
`;
const SelectTypeBtn = styled.div`
  position: absolute;
  bottom: -35px;
  right: 0;
  width: 133px;
  height: 125px;
  background-color: #ddd;
  cursor: pointer;
  z-index: 3;
`;
const WeatherContent = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 100px;
`;
const SquareGrid = styled.div`
  width: 143px;
  height: 122px;
  background-color: #ddd;
`;
const LineGrid = styled.div`
  flex: 1;
  margin: 10px 0 10px 60px;
`;

const BottomLine = styled.div`
  width: 235px;
  height: 17px;
  background-color: #ddd;

  &:last-child {
    width: 190px;
    margin-top: 12px;
  }
`;
const MainTitle = styled.div`
  width: 46px;
  height: 17px;
  background-color: #ddd;
`;
const MainDescription = styled.div`
  width: 143px;
  height: 17px;
  margin-top: 21px;
  background-color: #ddd;
`;
const CardContainer = styled.div`
  position: relative;
  width: 240px;
  height: ${({ height }) => height || '358px'};
  &.mainTop {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &.searchList {
    width: 156px;
    height: 196px;
  }
`;
const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #eee;
  &.searchList {
    height: 196px;
  }
`;
const CardShimmerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  animation: ${loading} 1.8s infinite;
  &.searchList {
    height: 196px;
  }
`;
const Shimmer = styled.div`
  width: 60%;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.2);
  transform: skewX(-6deg);
  &.searchList {
    height: 196px;
  }
`;
const Title = styled.div`
  position: relative;
  width: 112px;
  height: 12px;
  margin: 16px 0 12px 0;
  background-color: #eee;
`;
const TitleShimmerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${loading} 1.9s infinite;
`;
const Description = styled.div`
  position: relative;
  width: 116px;
  height: 12px;
  background-color: #eee;
`;
const DescriptionShimmerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${loading} 2s infinite;
`;
export default Skeleton;
