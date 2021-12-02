import { t } from 'i18next';

export const reviewReportText = [
  { text: '욕설 / 비하', value: 1, active: true },
  { text: '리뷰 성격에 부적절함', value: 2, active: false },
  { text: '낚시 / 놀람 / 도배', value: 3, active: false },
  { text: '음란물 / 불건전한 만남 및 대화', value: 4, active: false },
  { text: '상업적 광고 및 판매', value: 5, active: false },
];

export const userReviewReportText = [
  { text: '괴롭힘 및 사이버 폭력', value: 1, active: true },
  { text: '개인정보 침해', value: 2, active: false },
  { text: '명의 도용', value: 3, active: false },
  { text: '폭력적 위협', value: 4, active: false },
  { text: '아동 학대', value: 5, active: false },
  { text: '보호 대상 집단에 대한 증오심 표현', value: 6, active: false },
  { text: '스팸 및 사기', value: 7, active: false },
  { text: '나에게 해당하는 문제 없음', value: 8, active: false },
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
    { guId: 0, text: t('guList.nowLoaction') },
    { guId: 1, text: t('guList.all') },
    { guId: 11680, text: t('guList.gangnam') },
    { guId: 11740, text: t('guList.gangdong') },
    { guId: 11305, text: t('guList.gangbuk') },
    { guId: 11500, text: t('guList.gangseo') },
    { guId: 11620, text: t('guList.gwanak') },
    { guId: 11215, text: t('guList.gwangjin') },
    { guId: 11530, text: t('guList.guro') },
    { guId: 11545, text: t('guList.geumcheon') },
    { guId: 11350, text: t('guList.nowon') },
    { guId: 11320, text: t('guList.dobong') },
    { guId: 11230, text: t('guList.dongdaemun') },
    { guId: 11590, text: t('guList.dongjak') },
    { guId: 11440, text: t('guList.mapo') },
    { guId: 11410, text: t('guList.seodaemun') },
    { guId: 11650, text: t('guList.seocho') },
    { guId: 11200, text: t('guList.seongdong') },
    { guId: 11290, text: t('guList.seongbuk') },
    { guId: 11710, text: t('guList.songpa') },
    { guId: 11470, text: t('guList.yangcheon') },
    { guId: 11560, text: t('guList.yeongdeungpo') },
    { guId: 11170, text: t('guList.yongsan') },
    { guId: 11380, text: t('guList.eunpyeong') },
    { guId: 11110, text: t('guList.jongno') },
    { guId: 11140, text: t('guList.junggu') },
    { guId: 11260, text: t('guList.jungnang') },
  ];
};
