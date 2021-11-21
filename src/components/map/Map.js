/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  activity,
  activitySmall,
  art,
  artSmall,
  cafe,
  cafeSmall,
  travel,
  travelSmall,
  restaurant,
  restaurantSmall,
} from '../../images';

const Map = props => {
  const mapDiv = useRef(null);
  const { width, height, allPlaces, latLonFocus, _onChnageFocusId } = props;

  useEffect(() => {
    /* 페이지가 로드 시 지도 생성 */
    if (allPlaces) {
      mapscript(mapDiv, allPlaces, latLonFocus);
    }
  }, [mapDiv, allPlaces, latLonFocus]);

  const mapscript = (mapDiv, allPlaces, latLonObj) => {
    const { kakao } = window;
    let latLon = latLonObj;
    if (!latLon) {
      latLon = {
        lat: allPlaces[0].postLocationY,
        lon: allPlaces[0].postLocationX,
      };
    }
    const options = {
      center: new kakao.maps.LatLng(
        allPlaces[0].postLocationY,
        allPlaces[0].postLocationX,
      ),
      level: 5,
    };
    const map = new kakao.maps.Map(mapDiv.current, options);

    /* Marker */
    allPlaces.forEach(el => {
      // console.log(el, el.category);
      const { lat, lon } = latLon;
      const markerFocus = el.postLocationX === lon && el.postLocationY === lat;

      let imageSrc = markerFocus ? activity : activitySmall;
      if (el.category === '여행') {
        imageSrc = markerFocus ? travel : travelSmall;
      } else if (el.category === '맛집') {
        imageSrc = markerFocus ? restaurant : restaurantSmall;
      } else if (el.category === '카페') {
        imageSrc = markerFocus ? cafe : cafeSmall;
      } else if (el.category === '예술') {
        imageSrc = markerFocus ? art : artSmall;
      }
      const imageSize = markerFocus
        ? new kakao.maps.Size(48, 54)
        : new kakao.maps.Size(36, 36);
      // const imageSize = new kakao.maps.Size(48, 54);
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(el.postLocationY, el.postLocationX),
        title: el.title,
        image: markerImage,
      });

      /* 스와이프 시 지도 좌표로 이동 */
      if (latLon) {
        const { lat, lon } = latLon;
        function panTo(lat, lon) {
          const moveLatLon = new kakao.maps.LatLng(lat, lon);
          // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
          map.panTo(moveLatLon);
        }
        panTo(lat, lon);
      }

      /* 2-1. 마커를 클릭했을때 각 장소의 정보를 출력 */
      kakao.maps.event.addListener(marker, 'click', function () {
        console.log(el);
      });
    });
  };

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
