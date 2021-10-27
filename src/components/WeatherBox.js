import React from 'react';
import { Grid, Text, Image } from '../elements';

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
            <Text fontSize="16px" margin="0 8px 0 0">
              📍
            </Text>
            <Text fontSize="16px" color="#D1D0D0">
              내 위치
            </Text>
          </Grid>
          <Grid isFlex>
            <Text fontSize="16px" margin="0 13px 16px 0">
              비
            </Text>
            <Text fontSize="16px">11도</Text>
          </Grid>
          <Grid>
            <Text fontSize="13px">어제보다 2도 낮아요</Text>
          </Grid>
        </Grid>
        {/* 날씨 이미지 */}
        <Grid width="73px" height="73px" bg="#0066ff">
          <Image
            shape={false}
            width="100%"
            src="https://i.pinimg.com/originals/1e/36/6e/1e366e54a8a8a8769f950ca2dad6ff60.png"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default WeatherBox;
