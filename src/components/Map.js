/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mapscript } from '../shared/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getLoaded } from '../redux/modules/loadedSlice';
import Spinner from '../components/Spinner';

const Map = props => {
  // 카카오지도를 담을 div를 잡아줌.
  const mapDiv = useRef(null);
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.loaded.is_loaded);
  // console.log(isLoaded);
  // 현재위치에 따른 위도 경도를 받아옴.
  const { latitude, longitude } = props.coordinate;
  const { width, height, markerdata } = props;

  useEffect(() => {
    dispatch(getLoaded(true));
    mapscript(latitude, longitude, mapDiv, markerdata);

    return () => {};
  }, [latitude, longitude]);

  return (
    <>
      <MapContainer width={width} height={height} ref={mapDiv} />
      {/* {isLoaded === true ? <Spinner /> : null} */}
    </>
  );
};

const MapContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default Map;
