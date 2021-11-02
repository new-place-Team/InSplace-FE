/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import SelectedContents from '../components/place/SelectedContents';
import { Container, Grid, Text } from '../elements/index';
import { ReactComponent as Right } from '../images/ic-next.svg';
import { history } from '../redux/configureStore';
import { getPeopleText } from '../shared/transferText';

const SelectedType = () => {
  const [state, setState] = React.useState({
    MemberCnt: '',
    gender: '',
    category: '',
  });

  const [selectData, setSelectData] = React.useState([
    {
      title: '성별을 선택해 주세요',
      list: [
        { selecteText: '여자', value: 2 },
        { selecteText: '남자', value: 1 },
        { selecteText: '혼성', value: 3 },
      ],
      type: 'gender',
      grid: 0,
      bg: '#f4f4f4',
    },
    {
      title: '인원수를 선택해 주세요',
      list: [
        { selecteText: '1명', value: 1 },
        { selecteText: '2명', value: 2 },
        { selecteText: '4명 미만', value: 3 },
        { selecteText: '4명 이상', value: 4 },
      ],
      type: 'MemberCnt',
      grid: 2,
      bg: '#e8ecf2',
    },
    {
      title: '장소를 선택해주세요',
      list: [
        { selecteText: '여행', value: 1 },
        { selecteText: '맛집', value: 2 },
        { selecteText: '카페', value: 3 },
        { selecteText: '예술', value: 4 },
        { selecteText: '액티비티', value: 5 },
      ],
      type: 'category',
      grid: 3,
      bg: '#bbc0cf',
    },
  ]);

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
      pathname: '/select-type/result',
      state: params,
    });
  };

  return (
    <>
      <Header _content="유형선택" _back _type="search" />
      <Container padding="66px 0 0 0">
        <div style={{ padding: '10px' }} />
        <ChangeText>
          {state.gender !== '' && (
            <Grid isFlex>
              <Text bold fontSize="20px" border="2px solid #C0C0C0">
                {state.gender.selecteText}
              </Text>
            </Grid>
          )}
          {state.MemberCnt !== '' && (
            <Grid isFlex margin="0 10px">
              <Text bold fontSize="20px" border="2px solid #C0C0C0">
                {getPeopleText(state.MemberCnt.value)}
              </Text>
              <Text bold fontSize="20px" color="#C0C0C0">
                &nbsp;이
              </Text>
            </Grid>
          )}
          {state.category !== '' && (
            <>
              <Grid isFlex>
                <Text bold fontSize="20px" border="2px solid #C0C0C0">
                  {state.category.selecteText}
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
        {selectData.map(item => {
          return (
            <SelectedContents
              key={`key-${item.title}`}
              {...item}
              state={state}
              setState={setState}
              selectData={selectData}
              setSelectData={setSelectData}
            />
          );
        })}
        <Grid>
          <NextButton onClick={onClick}>
            <Right />
          </NextButton>
        </Grid>
      </Container>
    </>
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
  width: 80px;
  height: 80px;
  position: absolute;
  right: 0;
  bottom: -37px;
  background-color: #000;
  border: 1px solid black;
  svg {
    width: 36px;
    height: 36px;
    fill: #fff;
  }
`;

export default SelectedType;
