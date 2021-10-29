/**
 * 타입별 날씨 텍스트 변경
 * @param type 1.맑음  2.비 3.눈
 * @returns
 */
const getWeatherText = type => {
  let text = '';
  switch (type) {
    case 2:
      text = '비';
      break;
    case 3:
      text = '눈';
      break;
    default:
      text = '맑음';
  }
  return text;
};

export { getWeatherText };
