import React from 'react';
import styled from 'styled-components';
import { Grid, Image, Text } from '../elements';

const MapCard = () => {
  return (
    <MapCardCotainer>
      <Grid justify="space-between">
        {/* 이미지 부분 */}
        <Grid width="96px" height="100px" border="1px solid red">
          <Image
            width="100%"
            height="100%"
            src="https://tistory4.daumcdn.net/tistory/4367973/attach/059c57a4a960451fad4115308781a782"
            margin="0 20px 0 0"
          />
        </Grid>
        {/* 텍스트 부분 */}
        <Grid border="1px solid blue" padding="10px">
          <Text fontSize="12px" margin="0 0 2px 0">
            카페
          </Text>
          <Text fontSize="13px" bold>
            하남 돼지집 역삼 세인트존스 점
          </Text>
          <Grid>
            <Text fontSize="12px">강남구, 역삼동</Text>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid
        witdh="83%"
        padding="20px"
        margin="0 auto"
        bg="#0066ff"
        justify="space-between"
      >
        <Grid width="96px">
          <Image
            width="100%"
            height="100%"
            src="https://www.harrisonphoto.com/wp-content/themes/trend/assets/img/empty/424x500.png"
            margin="0 20px 0 0"
          />
        </Grid>
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
      </Grid> */}
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
  width: 80%;
  padding: 20px;
  background-color: white;
  position: fixed;
  left: 50%;
  bottom: 1px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
`;

export default MapCard;
