import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../images/Icon/ic_close.svg';
import { ReactComponent as Marker } from '../../images/ic-marker.svg';
import { ReactComponent as Particlulates } from '../../images/Icon/ic_weather_particulates.svg';
import { ReactComponent as WeatherGood } from '../../images/Icon/ic_weather_good.svg';
import sunBg from '../../images/weather/sun_bg_full.jpg';
import RainBg from '../../images/weather/rain_bg_full.jpg';
import CloudBg from '../../images/weather/cloud_bg_full.jpg';
import SnowBg from '../../images/weather/snow_bg_full.jpg';
import Sunshine from '../../images/weather/sunshine.png';
import CloudImg from '../../images/weather/cloudImg.png';
import { Grid, Text, Icons } from '../../elements';

const WeatherInfo = props => {
  const { closeWeatherModal } = props;
  const root = document.querySelector('#root');
  const location = useSelector(state => state.place.location);
  const weatherInfo = useSelector(state => state.place.weatherStatus);
  let weatherStatus = weatherInfo && weatherInfo.frontWeather;
  let weatherBg = '';
  useEffect(() => {
    root.setAttribute('style', 'overflow: hidden;');
    return () => root.removeAttribute('style');
  }, []);

  if (weatherInfo) {
    weatherStatus = 2;
    if (weatherStatus === 2) {
      weatherBg = RainBg;
    } else if (weatherStatus === 3) {
      weatherBg = SnowBg;
    } else if (weatherStatus === 4) {
      weatherBg = CloudBg;
    } else {
      weatherBg = sunBg;
    }
  }

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
          <Grid padding="77px 0 0 30px">
            {/* 현재위치 주소 */}
            <Grid isFlex>
              <Icons width="16px" height="16px" margin="0 10px 0 0">
                <Marker />
              </Icons>
              <Text fontSize="14px" color="#fff" bold>
                {location && location.address}
              </Text>
            </Grid>
            <Text fontSize="60px" color="#fff" bold>
              SEOUL
            </Text>
            <Text fontSize="96px" color="#fff" bold>
              {weatherInfo && weatherInfo.temperature}&deg;
            </Text>
          </Grid>
          <Grid />
          {/* Sub Info */}
          <SubInfo>
            {/* 미세먼지 */}
            <Grid isFlex padding="0 0 0 36px" margin="0 0 46px 0">
              <Icons width="32px" height="32px" margin="0 12px 0 0">
                <Particlulates />
              </Icons>
              <Text fontSize="28px" color="#fff" bold>
                좋음
              </Text>
              <Icons width="32px" height="32px" margin="0 0 0 8px">
                <WeatherGood />
              </Icons>
            </Grid>
            {/* 초 미세먼지 */}
            <Grid isFlex justify="space-between" padding="0 40px">
              <Text color="#fff" margin="0 0 8px 0">
                초미세먼지
              </Text>
              <Text color="#fff">{weatherInfo.pm25}</Text>
            </Grid>
            <Grid isFlex justify="space-between" padding="0 40px">
              <Text color="#fff">습도</Text>
              <Text color="#fff">{weatherInfo.humidity}</Text>
            </Grid>
          </SubInfo>
        </WeatherModal>
        {weatherStatus === 1 ? <SunshineArea src={Sunshine} /> : ''}
        {weatherStatus === 2 ? <RainArea>{getRain()}</RainArea> : ''}
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
  padding-top: 260px;
`;

/* Sunshine Interaction */
const SunshineArea = styled.div`
  position: absolute;
  top: -185px;
  right: -175px;
  width: 700px;
  height: 700px;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  animation: shine 5s infinite linear alternate;

  @keyframes shine {
    0% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
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
  position: absolute;
  top: 20%;
  width: 100%;
  height: 400px;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  /* animation: shine 7s infinite linear alternate;

  @keyframes shine {
    0% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1.2);
    }
  } */
`;

export default WeatherInfo;
