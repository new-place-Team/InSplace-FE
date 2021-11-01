/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import SelectedContents from '../components/place/SelectedContents';
import { Container, Grid, Text } from '../elements/index';
import { arrowRight } from '../images/index';
import { history } from '../redux/configureStore';

const data = [
  {
    title: '나와 함께할 사람들은',
    list: [
      { selected: '한명', value: 1 },
      { selected: '두명', value: 2 },
      { selected: '네명 미만', value: 3 },
      { selected: '네명 이상', value: 4 },
    ],
    type: 'MemberCnt',
    grid: 2,
  },
  {
    title: '원하시는 유형을 선택해 주세요',
    list: [
      { selected: '여자끼리', value: 2 },
      { selected: '남자끼리', value: 1 },
      { selected: '혼성', value: 3 },
    ],
    type: 'gender',
    grid: 0,
  },
  {
    title: '장소를 선택해주세요',
    list: [
      { selected: '여행', value: 1 },
      { selected: '맛집', value: 2 },
      { selected: '카페', value: 3 },
      { selected: '예술', value: 4 },
      { selected: '액티비티', value: 5 },
    ],
    type: 'category',
    grid: 3,
  },
];

const SelectedType = () => {
  const [state, setState] = React.useState({
    MemberCnt: '',
    gender: '',
    category: '',
  });

<<<<<<< HEAD
  const data = [
    {
      title: '나와 함께할 사람들은',
      list: [
        { selected: '한명', value: 1 },
        { selected: '두명', value: 2 },
        { selected: '네명 미만', value: 3 },
        { selected: '네명 이상', value: 4 },
      ],
      type: 'MemberCnt',
      grid: 2,
    },
    {
      title: '원하시는 유형을 선택해 주세요',
      list: [
        { selected: '여자', value: 2 },
        { selected: '남자', value: 1 },
        { selected: '혼성', value: 3 },
      ],
      type: 'gender',
      grid: 0,
    },
    {
      title: '장소를 선택해주세요',
      list: [
        { selected: '여행', value: 1 },
        { selected: '맛집', value: 2 },
        { selected: '카페', value: 3 },
        { selected: '예술', value: 4 },
        { selected: '액티비티', value: 5 },
      ],
      type: 'category',
      grid: 3,
    },
  ];

=======
>>>>>>> 1e0e6b2a6cd20aacf2a2e6447985f1d794d62391
  const onClick = () => {
    if (
      state.gender === '' ||
      state.MemberCnt === '' ||
      state.category === ''
    ) {
      window.alert('모두 입력해주세요');
      return;
    }
    const params = {
      weather: 1,
      category: state.category.value,
      num: state.MemberCnt.value,
      gender: state.gender.value,
    };

    // 유저가 선택한 유형을 history state에 담아서 보낸다.
    history.push({
      pathname: '/select/type/result',
      state: params,
    });
  };

  return (
    <Container>
      <div style={{ padding: '10px' }}>
        <Header _content="유형선택" _back _type="search" />
      </div>
      <ChangeText>
        {state.MemberCnt !== '' && (
          <Grid>
            <Text bold fontSize="20px" border="2px solid #C0C0C0">
              {state.MemberCnt.selected},
            </Text>
          </Grid>
        )}
        {state.gender !== '' && (
          <Grid isFlex margin="0 10px">
            <Text bold fontSize="20px" border="2px solid #C0C0C0">
              {state.gender.selected}
            </Text>
          </Grid>
        )}
        {state.category !== '' && (
          <>
            <Grid isFlex>
              <Text bold fontSize="20px" border="2px solid #C0C0C0">
                {state.category.selected}
              </Text>
              <Text bold fontSize="20px" color="#C0C0C0">
                &nbsp;장소 을(를)
              </Text>
            </Grid>
            <LineBreak>
              <Text bold fontSize="20px">
                가고 싶어요
              </Text>
            </LineBreak>
          </>
        )}
      </ChangeText>
      {data.map(item => {
        return (
          <SelectedContents
            key={`key-${item.title}`}
            {...item}
            setState={setState}
            state={state}
          />
        );
      })}
      <NextButton onClick={onClick}>
        <Img src={arrowRight} />
      </NextButton>
    </Container>
  );
};

const ChangeText = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  /* height: 105px; */
  padding: 17px 16px;
`;

const LineBreak = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const NextButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #000;
  border: 1px solid black;
`;
const Img = styled.img``;
export default SelectedType;
