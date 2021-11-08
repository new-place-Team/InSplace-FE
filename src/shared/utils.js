/* eslint-disable import/no-cycle */
/* eslint-disable func-names */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
import { history } from '../redux/configureStore';
/* 개발모드에서 logger */
export const logger = msg => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(msg);
};

/* localStorage에서 토큰 가져오기 */
export const getToken = () => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      resolve(`Bearer ${token}`);
    } else {
      resolve(null);
    }
  });
};

/* 현재위치 위도경도 가져오기 */
export const getPosition = options => {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

/* 기능이도 생성 + 마커 생 비빔밥이 된 함수 : 지성 + 지도 이동 이벤트 */
export const mapscript = (mapDiv, allPlaces, lati, loni) => {
  const { kakao } = window;

  /* 1️⃣ 지도를 생성하는 함수 */
  const options = {
    center: new kakao.maps.LatLng(
      allPlaces[0].postLocationY,
      allPlaces[0].postLocationX,
    ),
    level: 5,
  };
  // 🔥🔥🔥🔥🔥🔥🔥🔥 문제점 : 밑의 2,3 함수에서 map을 쓰는데 이걸 어떻게 분리해야할까?!?!?!  🔥🔥🔥🔥🔥🔥🔥🔥
  const map = new kakao.maps.Map(mapDiv.current, options);

  /* 2️⃣ 마커들을 찍는 함수 */
  allPlaces.forEach(el => {
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(el.postLocationY, el.postLocationX),
      title: el.title,
    });
    /* 2-1. 마커를 클릭했을때 각 장소의 정보를 출력 */
    kakao.maps.event.addListener(marker, 'click', function () {
      console.log(el);
    });
  });

  /* 3️⃣ 스와이프 했을때 지도 좌표를 이동하는 함수 */
  if (lati && loni) {
    function panTo(lati, loni) {
      const moveLatLon = new kakao.maps.LatLng(lati, loni);
      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      map.panTo(moveLatLon);
    }
    panTo(lati, loni);
  }
};

export const isLoginChk = isLogin => {
  if (!isLogin) {
    const confirm = window.confirm(
      '로그인을 해야 이용할 수 있는 서비스입니다 로그인 하시겠습니까?',
    );
    if (confirm) {
      history.push('/login');
    }
    return false;
  }
  return true;
};
