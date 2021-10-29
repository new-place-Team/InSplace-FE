/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { markerdata } from '../shared/MarkerData';
// import { mapscript } from '../shared/utils';
const { kakao } = window;
const Map = props => {
  // 카카오지도를 담을 div를 잡아줌.
  const mapDiv = useRef(null);
  // 현재위치에 따른 위도 경도를 받아옴.
  const { latitude, longitude } = props.coordinate;
  const { width, height } = props;

  useEffect(() => {
    mapscript(latitude, longitude, mapDiv, markerdata);
    return () => {};
  }, [latitude, longitude]);

  return (
    <>
      <MapContainer width={width} height={height} ref={mapDiv} />
    </>
  );
};

const MapContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default Map;
