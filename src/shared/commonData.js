import { t } from 'i18next';

export const reviewReportText = [
  { text: '욕설 / 비하', value: 1, active: true },
  { text: '리뷰 성격에 부적절함', value: 2, active: false },
  { text: '낚시 / 놀람 / 도배', value: 3, active: false },
  { text: '음란물 / 불건전한 만남 및 대화', value: 4, active: false },
  { text: '상업적 광고 및 판매', value: 5, active: false },
];

export const getMbtiList = () => {
  return [
    { mbtiId: 17, type: t('MbtiModal.noSelection') },
    { mbtiId: 1, type: 'ISTJ' },
    { mbtiId: 2, type: 'ISFJ' },
    { mbtiId: 3, type: 'INFJ' },
    { mbtiId: 4, type: 'INTJ' },
    { mbtiId: 5, type: 'ISTP' },
    { mbtiId: 6, type: 'ISFP' },
    { mbtiId: 7, type: 'INFP' },
    { mbtiId: 8, type: 'INTP' },
    { mbtiId: 9, type: 'ESTP' },
    { mbtiId: 10, type: 'ESFP' },
    { mbtiId: 11, type: 'ENFP' },
    { mbtiId: 12, type: 'ENTP' },
    { mbtiId: 13, type: 'ESTJ' },
    { mbtiId: 14, type: 'ESFJ' },
    { mbtiId: 15, type: 'ENFJ' },
    { mbtiId: 16, type: 'ENTJ' },
  ];
};

export const getSeoulGuList = () => {
  return [
    { guId: 0, text: '현재위치 (현재는 서울만 가능합니다)' },
    { guId: 1, text: '서울전체' },
    { guId: 11680, text: '강남구' },
    { guId: 11740, text: '강동구' },
    { guId: 11305, text: '강북구' },
    { guId: 11500, text: '강서구' },
    { guId: 11620, text: '관악구' },
    { guId: 11215, text: '광진구' },
    { guId: 11530, text: '구로구' },
    { guId: 11545, text: '금천구' },
    { guId: 11350, text: '노원구' },
    { guId: 11320, text: '도봉구' },
    { guId: 11230, text: '동대문구' },
    { guId: 11590, text: '동작구' },
    { guId: 11440, text: '마포구' },
    { guId: 11410, text: '서대문' },
    { guId: 11650, text: '서초구' },
    { guId: 11200, text: '성동구' },
    { guId: 11290, text: '성북구' },
    { guId: 11710, text: '송파구' },
    { guId: 11470, text: '양천구' },
    { guId: 11560, text: '영등포' },
    { guId: 11170, text: '용산구' },
    { guId: 11380, text: '은평구' },
    { guId: 11110, text: '종로구' },
    { guId: 11140, text: '중구' },
    { guId: 11260, text: '중랑구' },
  ];
};
