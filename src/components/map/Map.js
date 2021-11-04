/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mapscript } from '../../shared/utils';

const Map = props => {
  // 카카오지도를 담을 div를 잡아줌.
  const mapDiv = useRef(null);
  const { width, height, allPlaces } = props;
  useEffect(() => {
    mapscript(mapDiv, allPlaces);
    return () => {};
  }, [allPlaces]);

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
