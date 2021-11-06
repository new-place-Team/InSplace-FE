/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { mapscript, mapscript2, markerMake } from '../../shared/utils';
import { createMap } from '../../redux/modules/placeSlice';

const Map = props => {
  // 카카오지도를 담을 div를 잡아줌.
  const dispatch = useDispatch();
  const coord = useSelector(state => state.place.focusCoord);
  const mapDiv = useRef(null);
  const { width, height, allPlaces } = props;
  useEffect(() => {
    mapscript(mapDiv, allPlaces, coord.lat, coord.lon);
    return () => {};
  }, [allPlaces]);
  // useEffect(() => {
  //   dispatch(createMap(mapscript2(mapDiv, allPlaces)));
  //   markerMake(map, allPlaces);
  // }, [allPlaces]);

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
