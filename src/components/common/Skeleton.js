import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';

const Skeleton = forwardRef(props => {
  const { type } = props;
  if (type === 'mainTop') {
    return (
      <MainContainer>
        <WeatherWrap>
          <WeatherContent />
        </WeatherWrap>
        <SelectTypeBtn />
      </MainContainer>
    );
  }
  if (type === 'slideCard') {
    return (
      <CardContainer>
        <CardImage />
        <Title />
        <Description />
      </CardContainer>
    );
  }
  if (type === 'searchList') {
    return (
      <CardContainer className="searchList">
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
    <CardContainer>
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
  z-index: 1;
  background-color: #eee;
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
const WeatherWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

const WeatherContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  position: relative;
  width: 240px;
  height: 358px;
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
