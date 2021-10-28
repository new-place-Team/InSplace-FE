import React from 'react';
import { Grid, Text, Image } from '../elements';
import { mapPin, vector } from '../images/index';

const WeatherBox = () => {
  return (
    <>
      <Grid
        width="282px"
        height="162px"
        padding="31px"
        bg="#F4F4F4"
        isFlex
        justify="space-between"
      >
        {/* 텍스트들 모음 */}
        <Grid isFlex direction="column">
          <Grid isFlex margin="0 0 38px 0">
            <Grid width="16px" height="16px" margin="0 8px 0 0">
              <Image src={mapPin} />
            </Grid>
            <Text fontSize="16px" color="#D1D0D0">
              내 위치
            </Text>
          </Grid>
          <Grid margin="0 0 16px 0" isFlex>
            <Text fontSize="16px" margin="0 13px 0 0">
              비
            </Text>
            <Text fontSize="16px">16&deg;</Text>
          </Grid>
          <Grid>
            <Text fontSize="13px">어제보다 2&deg; 낮아요</Text>
          </Grid>
        </Grid>
        {/* 날씨 이미지 */}
        <Grid width="64px" height="58px">
          <Image src={vector} />
        </Grid>
      </Grid>
    </>
  );
};

export default WeatherBox;
