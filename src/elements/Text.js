/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Text = props => {
  const { fontSize, bold, color, others, children, margin, textAlign, border } =
    props;

  const styles = {
    fontSize,
    bold,
    color,
    others,
    margin,
    textAlign,
    border,
  };

  return (
    <>
      <ElText {...styles}>{children}</ElText>
    </>
  );
};

Text.defaultProps = {
  fontSize: `${theme.fontSize.normal}`,
  bold: false,
  color: `${theme.color.mainColor}`,
  children: 'child',
  others: '',
  margin: null,
  textAlign: false,
  border: false,
};

const ElText = styled.div`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.bold};
  color: ${props => props.color};
  font-weight: ${props =>
    props.bold
      ? `${theme.fontWeight.extraBold}`
      : `${theme.fontWeight.regular}`};
  ${props => props.textAlign && `text-align: ${props.textAlign}`};
  ${props => props.others};
  ${props => (props.margin ? `margin: ${props.margin}` : '')};
  ${props => (props.border ? `border-bottom: ${props.border}` : '')};
`;

export default Text;

// // 마커 띄우기
// const markerPosition = new kakao.maps.LatLng(
//   currentCoordinate.latitude,
//   currentCoordinate.longitude,
// );
// const marker = new kakao.maps.Marker({
//   position: markerPosition,
// });
// marker.setMap(map);

// // 인포 윈도우 띄우기
// var iwContent =
//     '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
//   iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

// // 인포윈도우를 생성합니다
// var infowindow = new kakao.maps.InfoWindow({
//   position: iwPosition,
//   content: iwContent,
// });

// // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
// infowindow.open(map, marker);
