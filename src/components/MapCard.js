import React from 'react';
import styled from 'styled-components';
import { Grid, Image, Text } from '../elements';

const MapCard = () => {
  return (
    <>
      {/* 이미지랑 description */}
      <Grid
        witdh="83%"
        padding="20px"
        margin="0 auto"
        bg="#0066ff"
        justify="space-between"
      >
        {/* backround image */}
        <Grid width="96px">
          <Image
            width="100%"
            height="100%"
            src="https://www.harrisonphoto.com/wp-content/themes/trend/assets/img/empty/424x500.png"
            margin="0 20px 0 0"
          />
        </Grid>
        {/* description */}
        <Grid width="180px">
          <Grid>
            <Text fontSize="12px" margin="0 0 2px 0">
              카페
            </Text>
            <Text fontSize="13px" bold>
              하남 돼지집 역삼 세인트존스 점 3층 203호하남 돼지집 역삼
              세인트존스 점 3층 203하남 돼지집 역삼 세인트존스 점 3층 203
            </Text>
          </Grid>
          <Text fontSize="12px">강남구, 역삼동</Text>
        </Grid>
        <AbsoluteBox top="12px" right="12px">
          ❤️
        </AbsoluteBox>
      </Grid>
    </>
  );
};

const AbsoluteBox = styled.div`
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
`;

export default MapCard;
