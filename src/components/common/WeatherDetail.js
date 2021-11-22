import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { ReactComponent as Close } from '../../images/Icon/ic_close.svg';
import { ReactComponent as Marker } from '../../images/ic-marker.svg';
import { ReactComponent as Particlulates } from '../../images/Icon/ic_weather_particulates.svg';
import { ReactComponent as WeatherGood } from '../../images/Icon/ic_weather_good.svg';
import { ReactComponent as WeatherSoso } from '../../images/Icon/ic_weather_soso.svg';
import { ReactComponent as WeatherBad } from '../../images/Icon/ic_weather_bad.svg';
import { ReactComponent as WeatherSoBad } from '../../images/Icon/ic_weather_sobad.svg';
import { ReactComponent as WeatherDanger } from '../../images/Icon/ic_weather_dangerous.svg';
import {
  SunFull768,
  RainFull768,
  CloudFull768,
  SnowFull768,
  Sunshine,
  CloudImg,
} from '../../images/weather/index.js';
import { Grid, Text, Icons } from '../../elements';

const WeatherInfo = props => {
  const { closeWeatherModal } = props;
  const root = document.querySelector('#root');
  const { t } = useTranslation();
  const location = useSelector(state => state.place.location);
  const weatherInfo = useSelector(state => state.place.weatherStatus);
  const weatherStatus = weatherInfo && weatherInfo.frontWeather;
  let weatherBg = SunFull768;
  let PmStatus = '';
  let PmText = '';
  if (weatherInfo) {
    /* 날씨에 따른 배경 이미지 */
    if (weatherStatus === 2) {
      weatherBg = RainFull768;
    } else if (weatherStatus === 3) {
      weatherBg = SnowFull768;
    } else if (weatherStatus === 4) {
      weatherBg = CloudFull768;
    } else {
      weatherBg = SunFull768;
    }
    /* 미세먼지 아이콘 변경 */
    if (weatherInfo.pm10 === 2) {
      PmStatus = WeatherSoso;
      PmText = t('WeatherDetail.weatherCondition.miseNormal');
    } else if (weatherInfo.pm10 === 3) {
      PmStatus = WeatherBad;
      PmText = t('WeatherDetail.weatherCondition.miseBad');
    } else if (weatherInfo.pm10 === 4) {
      PmStatus = WeatherSoBad;
      PmText = t('WeatherDetail.weatherCondition.miseSoBad');
    } else if (weatherInfo.pm10 === 5) {
      PmStatus = WeatherDanger;
      PmText = t('WeatherDetail.weatherCondition.miseDanger');
    } else {
      PmStatus = WeatherGood;
      PmText = t('WeatherDetail.weatherCondition.miseGood');
    }
  }

  useEffect(() => {
    root.setAttribute('style', 'overflow: hidden;');
    return () => root.removeAttribute('style');
  }, []);

  /* 비 호출 */
  const getRain = () => {
    let increment = 0;
    const drops = [];
    while (increment < 45) {
      const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
      const randoFiver = Math.floor(Math.random() * (4 - 2 + 1) + 2);
      increment += randoFiver;
      drops.push(
        <div
          key={`rain_${increment}`}
          className="drop"
          style={{
            left: `${increment * 2}%`,
            bottom: `${randoFiver + randoFiver - 1 + 100}%`,
            animationDelay: `0.${randoHundo}s`,
          }}
        >
          <div
            className="stem"
            style={{
              animationDelay: `0.${randoHundo}s`,
              animationDuration: `0.5${randoHundo}s`,
            }}
          />
          <div
            className="splat"
            style={{
              animationDelay: `0.${randoHundo}s`,
              animationDuration: `0.5${randoHundo}s`,
            }}
          />
        </div>,
      );
    }
    return drops;
  };
  return (
    <Wrap>
      <Container>
        {/* 닫기버튼 */}
        <CloseBtn onClick={() => closeWeatherModal()}>
          <Close />
        </CloseBtn>
        <WeatherModal src={weatherBg}>
          {/* Main Info */}
          <Grid padding="77px 0 0 8%">
            {/* 현재위치 주소 */}
            <Grid isFlex>
              <Icons width="16px" height="16px" margin="0 10px 0 0">
                <Marker />
              </Icons>
              <Text fontSize="14px" color="#fff" bold>
                {location && location.address}
              </Text>
            </Grid>
            <CityText>SEOUL</CityText>
            <Text fontSize="96px" color="#fff" bold>
              {weatherInfo && weatherInfo.temperature}&deg;
            </Text>
          </Grid>
          <Grid />
          {/* Sub Info */}
          <SubInfo>
            {/* 미세먼지 */}
            <Grid isFlex padding="0 0 0 8%" margin="0 0 46px 0">
              <Icons width="32px" height="32px" margin="0 12px 0 0">
                <Particlulates />
              </Icons>
              <Text fontSize="28px" color="#fff" bold>
                {PmText}
              </Text>
              <Icons width="32px" height="32px" margin="0 0 0 8px">
                <PmStatus />
              </Icons>
            </Grid>
            {/* 초 미세먼지 */}
            <Grid isFlex justify="space-between" padding="0 8%">
              <Text color="#fff" margin="0 0 8px 0">
                {t('WeatherDetail.particulateMatter')}
              </Text>
              <Text color="#fff">{weatherInfo.pm25}</Text>
            </Grid>
            <Grid isFlex justify="space-between" padding="0 8%">
              <Text color="#fff">{t('WeatherDetail.humidity')}</Text>
              <Text color="#fff">{weatherInfo.humidity}</Text>
            </Grid>
          </SubInfo>
        </WeatherModal>
        {weatherInfo && weatherStatus === 1 ? (
          <SunshineContainer>
            <SunshineArea src={Sunshine} />
          </SunshineContainer>
        ) : (
          ''
        )}
        {weatherStatus === 2 ? <RainArea>{getRain()}</RainArea> : ''}
        {weatherStatus === 3 ? (
          <>
            <SnowArea animation="snowOne" />
            <SnowArea backgroundSize="300px" filter="1px" animation="snowTwo" />
            <SnowArea
              backgroundSize="800px"
              filter="2px"
              height="650px"
              animation="snowThree"
            />
          </>
        ) : (
          ''
        )}
        {weatherStatus === 4 ? <CloudArea src={CloudImg} /> : ''}
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const Container = styled.div`
  position: relative;
  max-width: 768px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
`;

const WeatherModal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
`;

const CloseBtn = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  opacity: 0.4;
  background-color: #000;
  border-radius: 50%;
  z-index: 5;
  .svg {
    fill: #fff;
    width: 24px;
    height: 24px;
  }
`;

const SubInfo = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;
`;

const CityText = styled.div`
  font-size: 60px;
  color: #fff;
  font-weight: 600;
  font-family: 'Oswald', sans-serif;
`;

/* Sunshine Interaction */
const SunshineContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  z-index: 1;
`;

const SunshineArea = styled.div`
  position: absolute;
  top: -10%;
  right: -10%;
  width: 70%;
  height: 70%;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  animation: shine 5s infinite linear alternate;

  @media (max-width: 414px) {
    top: -25%;
    right: -3%;
    width: 100%;
    height: 100%;
  }

  @keyframes shine {
    0% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1.3);
    }
  }
`;

/* Rain Interaction */
const RainArea = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .drop {
    position: absolute;
    bottom: 100%;
    width: 10px;
    height: 120px;
    pointer-events: none;
    animation: drop 1.3s linear infinite;
  }

  @keyframes drop {
    0% {
      transform: translateY(0vh);
    }
    75% {
      transform: translateY(100vh);
    }
    100% {
      transform: translateY(108vh);
    }
  }

  .stem {
    width: 2px;
    height: 60%;
    margin-left: 7px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.25)
    );
    animation: stem 0.5s linear infinite;
  }

  @keyframes stem {
    0% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  .splat {
    width: 15px;
    height: 10px;
    border-top: 2px dotted rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    opacity: 1;
    transform: scale(0);
    animation: splat 0.5s linear infinite;
    display: none;
  }

  .splat {
    display: block;
  }

  @keyframes splat {
    0% {
      opacity: 1;
      transform: scale(0);
    }
    80% {
      opacity: 1;
      transform: scale(0);
    }
    90% {
      opacity: 0.5;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }
`;

/* Cloud Interaction */
const CloudArea = styled.div`
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url('${props => props.src}') repeat-x;
  background-size: cover;
  animation: cloud 9000s linear infinite;

  @keyframes cloud {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 9000% 0;
    }
  }
`;

const SnowArea = styled.div`
  background: url('https://designshack.net/tutorialexamples/letitsnow/snow.png');
  background-repeat: repeat;
  width: 100%;
  height: ${({ height }) => height || '780px'};
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ animation }) => animation || 'snowOne'} 13s infinite linear;
  ${props => props.backgroundSize && `background-size:${props.backgroundSize}`};
  ${props => props.filter && `filter:blur(${props.filter})`};

  @keyframes snowOne {
    0% {
      background-position: 0px 0px;
    }
    100% {
      background-position: 100px 750px;
    }
  }
  @keyframes snowTwo {
    0% {
      background-position: 0px -100px;
    }
    100% {
      background-position: 0px 750px;
    }
  }
  @keyframes snowThree {
    0% {
      background-position: 0px 100px;
    }
    100% {
      background-position: 300px 750px;
    }
  }
`;

export default WeatherInfo;
