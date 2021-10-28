/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Grid, Image, Text } from '../elements';

const MapCard = props => {
  const { src } = props;
  return (
    <MapCardCotainer>
      <Grid padding="12px" bg="#42c1bc" justify="center">
        {/* 이미지 */}
        <Grid width="96px" height="96px" margin="0 20px 0 0">
          <Image width="100%" height="100%" src={src} />
        </Grid>
        {/* information */}
        <Grid width="180px">
          <Grid>
            <Text fontSize="12px" margin="0 0 2px 0">
              카페
            </Text>
            <Text fontSize="13px" bold margin="0 0 40px 0">
              하남 돼지집 역삼 세인트존스
            </Text>
          </Grid>
          <Text fontSize="12px">서울 특별시 강남구 역삼동 </Text>
        </Grid>
        <AbsoluteBox top="12px" right="12px">
          ❤️
        </AbsoluteBox>
      </Grid>
    </MapCardCotainer>
  );
};

const AbsoluteBox = styled.div`
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
`;

const MapCardCotainer = styled.div`
  width: 83%;
  background-color: transparent;
  margin: 0 auto;
  position: absolute;
  bottom: 58px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999999;
`;

export default MapCard;
