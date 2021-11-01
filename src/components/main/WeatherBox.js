/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../../elements';
import { mapPin } from '../../images/index';
import { getWeatherText } from '../../shared/transferText';
import { ReactComponent as SunIcon } from '../../images/weather/sun.svg';
import { ReactComponent as RainIcon } from '../../images/weather/rain.svg';
import { ReactComponent as SnowIcon } from '../../images/weather/snow.svg';

const WeatherBox = props => {
  const { info } = props;
  return (
    <>
      <WeatherWrap>
        <Grid>
          <Grid width="16px" height="16px">
            <Image src={mapPin} />
          </Grid>
          <Grid padding="20px 10px">
            <Grid>
              <Text fontSize="16px" color="#7B7878">
                내 위치
              </Text>
            </Grid>
            <Grid justify="space-between">
              <Grid justify="space-between">
                <Text fontSize="16px" bold color="#7B7878" margin="0 13px 0 0">
                  {info && getWeatherText(info.status)}
                </Text>
                <Text fontSize="34px" bold color="#7B7878">
                  {info && info.temperature}&deg;
                </Text>
              </Grid>
              <Grid>
                <IconArea>
                  {info && info.status === 1 && <SunIcon />}
                  {info && info.status === 2 && <RainIcon />}
                  {info && info.status === 3 && <SnowIcon />}
                </IconArea>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </WeatherWrap>
    </>
  );
};

const WeatherWrap = styled.div`
  width: 282px;
  height: 162px;
  padding: 18px 25px;
  background-color: #f4f4f4;
`;

const IconArea = styled.div`
  svg {
    font-size: 14px;
  }
`;

export default WeatherBox;
