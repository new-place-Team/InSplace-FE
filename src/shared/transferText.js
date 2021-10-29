/**
 * 타입별 날씨 텍스트 변경
 * @param type 1.맑음  2.비 3.눈
 * @returns
 */
const getWeatherText = type => {
  let text = '';
  switch (type) {
    case 1:
      text = '맑음';
      break;
    case 2:
      text = '비';
      break;
    default:
      text = '눈';
  }
  return text;
};

/**
 * 타입별 카테고리 텍스트 변경
 * @param type 1.여행 2.맛집 3.카페 4.예술 5.엑티비티
 * @returns
 */
const getCategoryText = type => {
  let text = '';
  switch (type) {
    case 1:
      text = '여행';
      break;
    case 2:
      text = '맛집';
      break;
    case 3:
      text = '카페';
      break;
    case 4:
      text = '예술';
      break;
    default:
      text = '엑티비티';
  }
  return text;
};

export { getWeatherText, getCategoryText };
