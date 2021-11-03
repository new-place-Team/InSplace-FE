/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../../elements';
import { ReactComponent as SunIcon } from '../../images/weather/sun.svg';
import { ReactComponent as RainIcon } from '../../images/weather/rain.svg';
import { ReactComponent as SnowIcon } from '../../images/weather/snow.svg';

const WeatherBox = props => {
  const { info } = props;
  return (
    <>
      <WeatherWrap>
        <WeatherContent>
          {/* 날씨 아이콘 */}
          <Grid>
            <IconArea>
              {info && info.status === 1 && <SunIcon />}
              {info && info.status === 2 && <RainIcon />}
              {info && info.status === 3 && <SnowIcon />}
            </IconArea>
          </Grid>
          {/* 날씨 온도 */}
          <Grid>
            <Text fontSize="72px" bold color="#fff">
              {info && info.temperature}&deg;
            </Text>
          </Grid>
          {/* 어제 대비 온도 */}
          <Grid>
            <Text fontSize="18px" bold color="#fff" margin="19px 0 0 0">
              어제보다 2&deg; 낮아요
            </Text>
          </Grid>
        </WeatherContent>
      </WeatherWrap>
    </>
  );
};

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

const IconArea = styled.div`
  svg {
    font-size: 14px;
  }
`;

export default WeatherBox;
