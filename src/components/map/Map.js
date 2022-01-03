/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
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

const Map = React.memo(props => {
  const mapDiv = useRef(null);
  const [isMap, setIsMap] = useState(null);
  const [isMarker, setIsMarker] = useState(null);
  const { width, height, allPlaces, latLonFocus, _onChnageFocusId, type } =
    props;
  const location = useSelector(state => state.place.location);

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
      if (allPlaces.length > 0) {
        latLon = {
          lat: allPlaces[0].postLocationY,
          lon: allPlaces[0].postLocationX,
        };
      } else {
        latLon = location.latLon;
      }
    }
    const options = {
      center: new kakao.maps.LatLng(latLon.lat, latLon.lon),
      level: 5,
    };
    let map = null;
    if (!isMap) {
      map = new kakao.maps.Map(mapDiv.current, options);
      setIsMap(map);
    } else {
      map = isMap;
    }

    /* Marker */
    if (isMarker) {
      isMarker.map(v => v.setMap(null));
    }
    /* 현재위치 */
    if (location) {
      const markerPosition = new kakao.maps.LatLng(
        location.latLon.lat,
        location.latLon.lon,
      );
      const nowMarker = new kakao.maps.Marker({
        position: markerPosition,
      });
      nowMarker.setMap(map);
    }

    const markers = allPlaces.map(el => {
      const { lat, lon } = latLon;
      const markerFocus = el.postLocationX === lon && el.postLocationY === lat;

      let imageSrc = markerFocus ? activity : activitySmall;
      if (el.category === 1) {
        imageSrc = markerFocus ? travel : travelSmall;
      } else if (el.category === 2) {
        imageSrc = markerFocus ? restaurant : restaurantSmall;
      } else if (el.category === 3) {
        imageSrc = markerFocus ? cafe : cafeSmall;
      } else if (el.category === 4) {
        imageSrc = markerFocus ? art : artSmall;
      }
      const imageSize = markerFocus
        ? new kakao.maps.Size(48, 54)
        : new kakao.maps.Size(36, 36);

      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(el.postLocationY, el.postLocationX),
        title: el.title,
        image: markerImage,
      });
      if (type !== 'detail') {
        /* 2-1. 마커를 클릭했을때 각 장소의 정보를 출력 */
        kakao.maps.event.addListener(marker, 'click', function () {
          _onChnageFocusId(el.postId);
        });
      }
      return marker;
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
    setIsMarker(markers);
  };

  return (
    <>
      {/* 지도를 띄워줄 div 영역 */}
      <MapContainer width={width} height={height} ref={mapDiv} type={type} />
    </>
  );
});

const MapContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  top: ${props => (props.type === 'detail' ? '15%' : '-18%')};
`;

export default Map;
