/* eslint-disable no-shadow */
import React, { useState, memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  /* 버튼 선택 */
  const selectedBtn = (text, type, value) => {
    /* 타입이 gender 이면 부모 전체 SelectData를 변경 */
    if (type === 'gender') {
      setState({ ...state, gender: { selecteText: text, value } });
      const dataList = [...selectData];
      const numIdx = dataList.findIndex(v => v.type === 'num');
      if (value === 3) {
        dataList[numIdx].list = [
          { selecteText: t('SelectedContents.memberCount1.0'), value: 2 },
          { selecteText: t('SelectedContents.memberCount1.1'), value: 3 },
          { selecteText: t('SelectedContents.memberCount1.2'), value: 4 },
        ];
        setSelectData(dataList);
      } else {
        dataList[numIdx].list = [
          { selecteText: t('SelectedContents.memberCount2.0'), value: 1 },
          { selecteText: t('SelectedContents.memberCount2.1'), value: 2 },
          { selecteText: t('SelectedContents.memberCount2.2'), value: 3 },
          { selecteText: t('SelectedContents.memberCount2.3'), value: 4 },
        ];
        setSelectData(dataList);
      }
      /* 타입이 num 이면 State 그대로 */
    } else if (type === 'num') {
      setState({ ...state, num: { selecteText: text, value } });
      /* 타입이 value 이면 State 그대로 */
    } else {
      setState({ ...state, category: { selecteText: text, value } });
    }
  };

  // 리뷰 등록 페이지의 첫번째 버튼은 활성화가 되어야함.
  const [active, setActive] = useState({
    revisitYN: true,
    weekdayYN: true,
    weather: true,
  });
  const selectedReviewBtn = (text, type, value) => {
    if (type === 'revisitYN') {
      setActive({ ...active, revisitYN: false });
      setState({ ...state, revisitYN: value });
    } else if (type === 'weekdayYN') {
      setActive({ ...active, weekdayYN: false });
      setState({ ...state, weekdayYN: value });
    } else if (type === 'weather') {
      setActive({ ...active, weather: false });
      setState({ ...state, weather: value });
    }
  };

  if (selectType === 'review') {
    return (
      <ReviewContent>
        <Text type="Title16">{title}</Text>
        <SelectedGrid>
          {list.map(item => {
            return (
              <React.Fragment key={`selected-${item.selecteText}`}>
                <ReviewButton
                  type="type"
                  width="auto"
                  value={item.selecteText}
                  keys={item.value}
                  isSelected={state[type].value === item.value}
                  className={item.value === state[type] && 'activeButton'}
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
    /* 실제로 뷰를 그려주는  3개로 나줘짐 */

    /* 배경 색상 (3가지) */
    <SelectedContent bgColor={bg}>
      {/* 선택 항목의 제목들  */}
      <Text fontSize="20px" bold>
        {title}
      </Text>
      <SelectedGrid>
        {list.map(item => {
          return (
            <React.Fragment key={`selected-${item.selecteText}`}>
              <Grid margin="10px 10px 0 0">
                {/* 각 버튼들을 Map을 돌립니다.  */}
                <SelectedButton
                  keys={item.value}
                  type="type"
                  width="auto"
                  value={item.selecteText}
                  isSelected={state[type].value === item.value}
                  // isLast={list.length === idx}
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
`;
const ReviewButton = styled.button`
  margin: 0 12px 0 0;
  padding: 12px 20px;
  border: 1px solid #7a7d81;
  color: ${({ isSelected }) => (isSelected ? '#fff' : `#282828`)};
  background-color: ${({ isSelected }) => (isSelected ? '#232529' : `#fff`)};
  &.activeButton {
    color: #fff;
    background-color: #232529;
  }
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 500px) {
    margin: 0 12px 12px 0;
  }
`;
export default memo(SelectedContents);
