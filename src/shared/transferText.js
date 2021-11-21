import { t } from 'i18next';

/**
 * 타입별 날씨 텍스트 변경
 * @param type 1.맑음  2.비 3.눈
 * @returns
 */

const getWeatherText = type => {
  let text = '';
  switch (type) {
    case 1:
      text = t('ReviewWrite.selectWeather.weatherType.0'); // 맑음
      break;
    case 2:
      text = t('ReviewWrite.selectWeather.weatherType.1'); // 비
      break;
    default:
      text = t('ReviewWrite.selectWeather.weatherType.2'); // 눈
  }
  return text;
};

/**
 * 타
 * 별 카테고리 텍스트 변경
 * @param type 1.여행 2.맛집 3.카페 4.예술 5.엑티비티
 * @returns
 */
const getCategoryText = type => {
  let text = '';
  switch (type) {
    case 1:
      text = t('selectTypePage.selectPlace.placeType.0');
      break;
    case 2:
      text = t('selectTypePage.selectPlace.placeType.1');
      break;
    case 3:
      text = t('selectTypePage.selectPlace.placeType.2');
      break;
    case 4:
      text = t('selectTypePage.selectPlace.placeType.3');
      break;
    default:
      text = t('selectTypePage.selectPlace.placeType.4');
  }
  return text;
};

/**
 * 타입별 인원 텍스트 변경
 * @param type 1.한명 2.두명 3.네명 미만 4.네명 이상
 * @returns
 */
const getPeopleText = type => {
  let text = '';
  switch (type) {
    case 1:
      text = t('SelectedContents.memberCount2.0');
      break;
    case 2:
      text = t('SelectedContents.memberCount2.1');
      break;
    case 3:
      text = t('SelectedContents.memberCount2.2');
      break;
    default:
      text = t('SelectedContents.memberCount2.3');
  }
  return text;
};

/**
 * 타입별 성별 텍스트 변경
 * @param type 1.남성 2.여성 3.혼성
 * @returns
 */
const getGenderText = type => {
  let text = '';
  switch (type) {
    case 1:
      text = t('selectTypePage.selectGender.genderType.1');
      break;
    case 2:
      text = t('selectTypePage.selectGender.genderType.0');
      break;
    default:
      text = t('selectTypePage.selectGender.genderType.2');
  }
  return text;
};

/* 카테고리 리스트 텍스트 변경 */
const getCategoryArrText = (type, value) => {
  if (type === 'gender') {
    return getGenderText(value);
  }
  if (type === 'num') {
    return getPeopleText(value);
  }
  return getCategoryText(value);
};

/**
 * 받은 MBTI 타입숫자 변경
 * @param type
 * @returns
 */
const getPeopleMbti = type => {
  let number = 0;
  switch (type) {
    case 'ISTJ':
      number = 1;
      break;
    case 'ISFJ':
      number = 2;
      break;
    case 'INFJ':
      number = 3;
      break;
    case 'INTJ':
      number = 4;
      break;
    case 'ISTP':
      number = 5;
      break;
    case 'ISFP':
      number = 6;
      break;
    case 'INFP':
      number = 7;
      break;
    case 'INTP':
      number = 8;
      break;
    case 'ESTP':
      number = 9;
      break;
    case 'ESFP':
      number = 10;
      break;
    case 'ENFP':
      number = 11;
      break;
    case 'ENTP':
      number = 12;
      break;
    case 'ESTJ':
      number = 13;
      break;
    case 'ESFJ':
      number = 14;
      break;
    case 'ENFJ':
      number = 15;
      break;
    case 'ENTJ':
      number = 16;
      break;
    default:
      number = 17;
  }
  return number;
};

/**
 * 어제대비 온도별 텍스트 변경
 * @param {*} dgree
 * @returns
 */
const get어제대비온도 = dgree => {
  let text = '';
  if (dgree > 0) {
    text = `어제보다 ${dgree}° 높아요`;
  } else if (dgree < 0) {
    text = `어제보다 ${dgree}° 낮아요`;
  } else {
    text = '어제와 온도가 같아요';
  }
  return text;
};

export {
  getWeatherText,
  getCategoryText,
  getPeopleText,
  get어제대비온도,
  getPeopleMbti,
  getGenderText,
  getCategoryArrText,
};
