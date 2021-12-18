const theme = {
  color: {
    mainColor: '#212529',
    grey1: '#ced4da',
    white: '#fff',
  },
  fontSize: {
    normal: '18px',
  },
  // 글자 굵기
  fontWeight: {
    extraBold: 800,
    semiBold: 600,
    regular: 400,
    light: 300,
  },
  view: {
    mobile: `(max-width: 767px)`,
    tablet: `(max-width: 1024px)`,
    desktop: `(min-width: 1025px)`,
    width: '360px',
  },
  flex: {
    column:
      'display: flex; flex-direction:column; align-items: center; justify-content: space-between; ',
    row: 'display: flex; align-items: center; justify-content: space-between;',
  },
  shadow: `box-shadow: 8px 8px 16px 4px rgba(133, 139, 146, 0.06)`,
  border_box: `box-sizing:border-box;`,

  /* nav color */
  weatherColor: {
    sun: '#FEB544',
    cloud: '#423F44',
    rain: '#558ED0',
    snow: '#81BCDA',
  },
  // 0번째 :인플러드 선택받은공간 ,  1번째 : MD's pick
  weatherBgColor: {
    sun: ['#FAF4E3', '#E9F1E8'],
    cloud: ['#F1F1F1', '#D8D8D8'],
    rain: ['#E9F1F5', '#C7DAE5'],
    snow: ['#F0F4FA', '#D3DDEA'],
  },
};

export default theme;
