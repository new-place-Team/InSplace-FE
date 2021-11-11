/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { mapscript, mapscript2, markerMake } from '../../shared/utils';
import { createMap } from '../../redux/modules/placeSlice';

const Map = props => {
  const coord = useSelector(state => state.place.focusCoord);
  const mapDiv = useRef(null);

  const { width, height, allPlaces } = props;
  /* 페이지가 로드되면 지도 생성 */
  useEffect(() => {
    mapscript(mapDiv, allPlaces, coord.lat, coord.lon);
  }, [mapDiv, allPlaces, coord.lat, coord.lon]);

  // useEffect(() => {
  //   dispatch(createMap(mapscript2(mapDiv, allPlaces)));
  //   markerMake(map, allPlaces);
  // }, [allPlaces]);

  return (
    <>
      {/* 지도를 띄워줄 div 영역 */}
      <MapContainer width={width} height={height} ref={mapDiv} />
    </>
  );
};

const MapContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default Map;
