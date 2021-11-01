/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Grid, Image, Text } from '../../elements';

const MapCard = props => {
  const { el } = props;
  const content = useRef(null);
  return (
    <MapCardCotainer ref={content}>
      <Grid padding="10px " bg="#fff" justify="space-between">
        {/* 이미지 */}
        <Grid width="96px" height="96px" margin="0 20px 0 0">
          <Image width="100%" height="100%" src={el.src} />
        </Grid>
        {/* information */}
        <Grid width="180px">
          <Grid>
            <Text fontSize="12px" margin="0 0 2px 0">
              카페
            </Text>
            <Text fontSize="13px" bold margin="0 0 40px 0">
              {el.title}
            </Text>
          </Grid>
          <Text fontSize="12px">서울 특별시 강남구 역삼동 </Text>
        </Grid>
      </Grid>
      <AbsoluteBox top="15px" right="4px">
        <Grid isFlex>
          <Text fontSize="12px" color="red" margin="0 2px 0 0">
            ♥︎
          </Text>
          <Text fontSize="12px">1</Text>
        </Grid>
      </AbsoluteBox>
    </MapCardCotainer>
  );
};

const AbsoluteBox = styled.div`
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  transform: translate(-50%, -50%);
`;

const MapCardCotainer = styled.div`
  width: 90%;
  background-color: transparent;
  margin: 0 auto;
  position: relative;
`;

export default MapCard;
