/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../../elements';

const SelectedContents = props => {
  const {
    selectType,
    title,
    state,
    type,
    list,
    setState,
    selectData,
    setSelectData,
    bg,
  } = props;

  /* 버튼 선택 */
  const selectedBtn = (text, type, value) => {
    if (type === 'gender') {
      setState({ ...state, gender: { selecteText: text, value } });
      const dataList = [...selectData];
      const MemberCntIdx = dataList.findIndex(v => v.type === 'MemberCnt');
      if (value === 3) {
        dataList[MemberCntIdx].list = [
          { selecteText: '2명', value: 2 },
          { selecteText: '4명 미만', value: 3 },
          { selecteText: '4명 이상', value: 4 },
        ];
        setSelectData(dataList);
      } else {
        dataList[MemberCntIdx].list = [
          { selecteText: '1명', value: 1 },
          { selecteText: '2명', value: 2 },
          { selecteText: '4명 미만', value: 3 },
          { selecteText: '4명 이상', value: 4 },
        ];
        setSelectData(dataList);
      }
    } else if (type === 'MemberCnt') {
      setState({ ...state, MemberCnt: { selecteText: text, value } });
    } else {
      setState({ ...state, category: { selecteText: text, value } });
    }
  };

  const selectedReviewBtn = (text, type, value) => {
    console.log('type == ', type);
    console.log('text == ', text);
    console.log('value == ', value);
  };

  if (selectType === 'review') {
    return (
      <ReviewContent>
        <Text type="Title16">{title}</Text>
        <SelectedGrid>
          {list.map((item, idx) => {
            return (
              <React.Fragment key={`selected-${item.selecteText}`}>
                <ReviewButton
                  type="type"
                  width="auto"
                  value={item.selecteText}
                  keys={item.value}
                  isSelected={state[type].value === item.value}
                  isLast={list.length === idx}
                  onClick={() =>
                    selectedReviewBtn(item.selecteText, type, item.value)
                  }
                >
                  {item.selecteText}
                </ReviewButton>
              </React.Fragment>
            );
          })}
        </SelectedGrid>
      </ReviewContent>
    );
  }

  return (
    <SelectedContent bgColor={bg}>
      <Text fontSize="20px" bold>
        {title}
      </Text>
      <SelectedGrid>
        {list.map((item, idx) => {
          return (
            <React.Fragment key={`selected-${item.selecteText}`}>
              <Grid margin="10px 10px 0 0">
                <SelectedButton
                  type="type"
                  width="auto"
                  value={item.selecteText}
                  keys={item.value}
                  isSelected={state[type].value === item.value}
                  isLast={list.length === idx}
                  onClick={() =>
                    selectedBtn(item.selecteText, type, item.value)
                  }
                >
                  {item.selecteText}
                </SelectedButton>
              </Grid>
            </React.Fragment>
          );
        })}
      </SelectedGrid>
    </SelectedContent>
  );
};

SelectedContents.defaultProps = {
  title: '',
  list: [],
};

const SelectedContent = styled.div`
  width: 100%;
  padding: 45px 24px;
  background-color: ${({ bgColor }) => bgColor};
`;
const SelectedGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 14px;
`;

const SelectedButton = styled.button`
  width: ${({ width }) => width || 'auto'};
  margin: ${props => props.margin};
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ isSelected }) => (isSelected ? '#fff' : `#979797`)};
  background-color: ${({ isSelected }) => (isSelected ? '#232529' : `#fff`)};
  border: ${({ isSelected }) =>
    isSelected ? '1px solid #232529' : `1px solid #646464`};
`;
const ReviewContent = styled.div`
  width: 100%;
  padding-top: 40px;
  border: 1px solid blue;
`;
const ReviewButton = styled.button`
  margin: 0 12px 12px 0;
  padding: 12px 20px;
  border: 1px solid #7a7d81;
  color: #282828;
  &:last-child {
    margin-right: 0;
  }
`;
export default SelectedContents;
