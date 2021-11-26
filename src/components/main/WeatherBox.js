/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Grid, Text, Icons } from '../../elements';
import { ReactComponent as SunIcon } from '../../images/weather/sun-nav.svg';
import { ReactComponent as RainIcon } from '../../images/weather/rain.svg';
import { ReactComponent as SnowIcon } from '../../images/weather/snow.svg';
import { ReactComponent as CloudIcon } from '../../images/weather/cloud.svg';
import { ReactComponent as Marker } from '../../images/Icon/ic_weather_map-pin.svg';
import { ReactComponent as Particlulates } from '../../images/Icon/ic_weather_particulates.svg';
// import { ReactComponent as WeatherGood } from '../../images/Icon/ic_weather_good_white.svg';
import { ReactComponent as WeatherGood } from '../../images/Icon/ic_weather_good.svg';
import { ReactComponent as WeatherSoso } from '../../images/Icon/ic_weather_soso.svg';
import { ReactComponent as WeatherBad } from '../../images/Icon/ic_weather_bad.svg';
import { ReactComponent as WeatherSoBad } from '../../images/Icon/ic_weather_sobad.svg';
import { ReactComponent as WeatherDanger } from '../../images/Icon/ic_weather_dangerous.svg';
// import { get어제대비온도 } from '../../shared/transferText';

const WeatherBox = props => {
  const { info } = props;
  const { t } = useTranslation();
  const location = useSelector(state => state.place.location);
  let PmText = '';
  let PmStatus = null;
  if (info) {
    /* 미세먼지 아이콘 변경 */
    if (info.pm10 === 2) {
      PmStatus = WeatherSoso;
      PmText = t('WeatherDetail.weatherCondition.miseNormal');
    } else if (info.pm10 === 3) {
      PmStatus = WeatherBad;
      PmText = t('WeatherDetail.weatherCondition.miseBad');
    } else if (info.pm10 === 4) {
      PmStatus = WeatherSoBad;
      PmText = t('WeatherDetail.weatherCondition.miseSoBad');
    } else if (info.pm10 === 5) {
      PmStatus = WeatherDanger;
      PmText = t('WeatherDetail.weatherCondition.miseDanger');
    } else {
      PmStatus = WeatherGood;
      PmText = t('WeatherDetail.weatherCondition.miseGood');
    }
  }
  return (
    <>
      <WeatherWrap>
        <WeatherContent>
          {/* 날씨 온도 */}
          <Grid>
            <TemperatureText>{info && info.temperature}</TemperatureText>
            <TemperatureIcon>&deg;</TemperatureIcon>
          </Grid>
          <WeatehrInfo>
            {/* 날씨 아이콘 */}
            <Grid>
              <IconArea className="weatherIcon">
                {info && info.frontWeather === 1 && <SunIcon />}
                {info && info.frontWeather === 2 && <RainIcon />}
                {info && info.frontWeather === 3 && <SnowIcon />}
                {info && info.frontWeather === 4 && <CloudIcon />}
              </IconArea>
            </Grid>
            <Grid isFlex margin="8px 0 0 0">
              <Icons width="16px" height="16px">
                <Marker />
              </Icons>
              <Text fontSize="14px" color="#fff" bold margin="0 0 0 8px">
                {/* 현재위치 주소 */}
                {location ? location.address : t('mainPage.hasNoLocation')}
              </Text>
            </Grid>
            {/* 미세먼지 */}
            <Grid isFlex margin="7px 0 0 0">
              <Icons width="16px" height="16px" margin="0 8px 0 0">
                <Particlulates />
              </Icons>
              <Text fontSize="14px" color="#fff" bold>
                {PmText}
              </Text>
              <Icons width="24px" height="24px" margin="0 0 0 4px">
                {/* 이미지 오류나서 수정할 예정 */}
                {PmStatus && <PmStatus />}
              </Icons>
            </Grid>
            {/* 어제 대비 온도 */}
            {/* <Grid>
              <Text fontSize="18px" bold color="#fff" margin="4px 0 0 0">
                {info && get어제대비온도(Number(info.diff))}
              </Text>
            </Grid> */}
          </WeatehrInfo>
        </WeatherContent>
      </WeatherWrap>
    </>
  );
};

const WeatherWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 31px 0 0 37px;
`;

const WeatherContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const WeatehrInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  .weatherIcon {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 414px) {
    margin-left: 40px;
    .weatherIcon {
      width: 32px;
      height: 32px;
    }
  }
`;

const TemperatureText = styled.div`
  font-size: 140px;
  color: #fff;
  font-weight: 600;
  font-family: 'Oswald', sans-serif;
  @media (max-width: 414px) {
    font-size: 96px;
  }
`;

const TemperatureIcon = styled.div`
  position: absolute;
  top: 20px;
  right: -45px;
  font-size: 80px;
  color: #fff;
  font-weight: 600;
  font-family: 'Oswald', sans-serif;
  @media (max-width: 414px) {
    top: 20px;
    right: -20px;
    font-size: 40px;
  }
`;

const IconArea = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  svg {
    width: 40px;
    height: 40px;
    fill: #fff;
  }
`;

export default WeatherBox;
