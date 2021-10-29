/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import SelectedContents from '../components/SelectedContents';
import { Grid, Text } from '../elements/index';
import { arrowRight } from '../images/index';
import { getSelected } from '../redux/modules/selected';
import { history } from '../redux/configureStore';

const SelectedType = () => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    gender: '',
    MemberCnt: '',
    category: '',
  });

  const data = [
    {
      title: '나와 함께할 사람들은',
      list: [
        { selected: '한명' },
        { selected: '두명' },
        { selected: '네명 미만' },
        { selected: '네명 이상' },
      ],
      type: 'MemberCnt',
      grid: 2,
    },
    {
      title: '원하시는 유형을 선택해 주세요',
      list: [
        { selected: '여자끼리' },
        { selected: '남자끼리' },
        { selected: '혼성' },
      ],
      type: 'gender',
      grid: 0,
    },
    {
      title: '장소를 선택해주세요',
      list: [
        { selected: '여행' },
        { selected: '맛집' },
        { selected: '카페' },
        { selected: '예술' },
        { selected: '액티비티' },
      ],
      type: 'category',
      grid: 3,
    },
  ];

  const onClick = () => {
    if (
      state.gender === '' ||
      state.MemberCnt === '' ||
      state.category === ''
    ) {
      window.alert('모두 입력해주세요');
    }
    const list = [];
    list.push(
      { tag: state.gender },
      { tag: state.MemberCnt },
      { tag: state.gender },
    );
    console.log('aa list == ', list);
    dispatch(getSelected(list));
    history.push('/searchtypelist');
  };

  return (
    <SelectedWrap>
      <Wrap>
        <div style={{ padding: '10px' }}>
          <Header _content="header" _search _type="search" />
        </div>
        <ChangeText>
          {state.MemberCnt !== '' && (
            <Grid>
              <Text bold fontSize="20px" border="2px solid #C0C0C0">
                {state.MemberCnt},
              </Text>
            </Grid>
          )}
          {state.gender !== '' && (
            <Grid isFlex margin="0 10px">
              <Text bold fontSize="20px" border="2px solid #C0C0C0">
                {state.gender}
              </Text>
            </Grid>
          )}
          {state.category !== '' && (
            <>
              <Grid isFlex>
                <Text bold fontSize="20px" border="2px solid #C0C0C0">
                  {state.category}
                </Text>
                <Text bold fontSize="20px" color="#C0C0C0">
                  을(를)
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
      </Wrap>
    </SelectedWrap>
  );
};

const SelectedWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  position: relative;
  width: 375px;
  height: 100vh;
  overflow: hidden;
`;
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
  bottom: 10px;
  background-color: #000;
  border: 1px solid black;
`;
const Img = styled.img``;
export default SelectedType;
