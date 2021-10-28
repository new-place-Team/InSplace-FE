/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { setMarker } from './Marker';
import { setInfoWindow } from './InfoWindow';
import { markerdata } from '../shared/MarkerData';

const { kakao } = window;

const Map = props => {
  // 카카오지도를 담을 div를 잡아줌.
  const mapbox = useRef(null);
  // 현재위치에 따른 위도 경도를 받아옴.
  const { latitude, longitude } = props.coordinate;

  const mapscript = () => {
    const options = {
      // 지도 옵션중에 위도 경도를 받아옴.
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const map = new kakao.maps.Map(mapbox.current, options);

    markerdata.forEach(el => {
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title,
      });

      var content = `
                <div class="title">
                   ${el.title}
                    <div class="close" onclick="closeOverlay()" title="닫기"></div>
                </div>`;

      new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
      });
    });
  };

  useEffect(() => {
    mapscript();
    // setMarker(map, latitude, longitude);
    // setInfoWindow(map, latitude, longitude);
    return () => {};
  }, [latitude, longitude]);

  return (
    <>
      <MapContainer width="100vw" height="80vh" ref={mapbox} />
    </>
  );
};

const MapContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default Map;
