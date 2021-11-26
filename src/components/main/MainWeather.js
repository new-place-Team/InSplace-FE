import React from 'react';
import styled from 'styled-components';
import { main } from '../../images';
import {
  SunMain768 as sun768,
  SunMain375 as sun375,
  RainMain768 as rain768,
  RainMain375 as rain375,
  CloudMain768 as cloud768,
  CloudMain375 as cloud375,
  SnowMain768 as snow768,
  SnowMain375 as snow375,
  Sunshine,
  CloudImg,
} from '../../images/weather/index';

const MainWeather = props => {
  let img375 = main;
  let img768 = main;
  const { weatherInfo, imgLoading } = props;

  // const weatherStatus = weatherInfo && weatherInfo.frontWeather;
  const weatherStatus = 3;
  if (weatherInfo) {
    if (weatherStatus === 2) {
      img768 = rain768;
      img375 = rain375;
    } else if (weatherStatus === 3) {
      img768 = snow768;
      img375 = snow375;
    } else if (weatherStatus === 4) {
      img768 = cloud768;
      img375 = cloud375;
    } else {
      img375 = sun375;
      img768 = sun768;
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
    <ImgArea>
      <BackgroundImg className="phone" src={imgLoading ? img375 : main} />
      <BackgroundImg className="tablet" src={imgLoading ? img768 : main} />
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
    </ImgArea>
  );
};
const ImgArea = styled.div`
  .phone {
    display: none;
  }
  .tablet {
    display: block;
  }
  @media (max-width: 414px) {
    .phone {
      display: block;
    }
    .tablet {
      display: none;
    }
  }
`;

const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 672px;
  object-fit: cover;
  z-index: -1;
  @media (max-width: 414px) {
    height: 473px;
  }
`;
const SunshineContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  z-index: -1;
`;
/* Sunshine Interaction */
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
    top: -23%;
    right: -17%;
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
  z-index: -1;
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

/* Snow Interaction */
const SnowArea = styled.div`
  background: url('https://designshack.net/tutorialexamples/letitsnow/snow.png');
  background-repeat: repeat;
  width: 100%;
  height: ${({ height }) => height || '700px'};
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ animation }) => animation || 'snowOne'} 13s infinite linear;
  ${props => props.backgroundSize && `background-size:${props.backgroundSize}`};
  ${props => props.filter && `filter:blur(${props.filter})`};
  opacity: 0.5;
  z-index: -1;

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
  z-index: -1;

  @keyframes cloud {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 9000% 0;
    }
  }
`;

export default MainWeather;
