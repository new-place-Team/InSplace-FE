import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import SelectedContents from '../components/place/SelectedContents';
import { Container, Grid, Text } from '../elements/index';
import { ReactComponent as Right } from '../images/ic-next.svg';
import { history } from '../redux/configureStore';
import { getPeopleText } from '../shared/transferText';
import { getSearchConditionDB } from '../redux/async/place';
import CommonModal from '../components/common/CommonModal';
import { setCommonModalOn } from '../redux/modules/commonSlice';

const SelectedType = () => {
  const dispatch = useDispatch();
  const weatherStatus = useSelector(state => state.place.weatherStatus);
  const commomModal = useSelector(state => state.common.modalStatus);
  const [categoryInfo, setCategoryInfo] = React.useState({
    MemberCnt: '',
    gender: '',
    category: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showCategory =
    categoryInfo.MemberCnt === '' &&
    categoryInfo.gender === '' &&
    categoryInfo.category === '';

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

  const goSearch = () => {
    if (
      categoryInfo.gender === '' ||
      categoryInfo.MemberCnt === '' ||
      categoryInfo.category === ''
    ) {
      const modalParams = {
        title: '검색 유형을 모두 선택해주세요',
      };
      dispatch(setCommonModalOn(modalParams));
      return;
    }

    const params = `?weather=${weatherStatus.status}&category=${categoryInfo.category.value}&num=${categoryInfo.MemberCnt.value}&gender=${categoryInfo.gender.value}`;
    dispatch(getSearchConditionDB(params));
    history.push(`/select-type/result${params}`);
  };

  return (
    <>
      {commomModal && <CommonModal />}
      <Header _content="유형선택" _back _type="search" />
      <Container padding="66px 0 0 0">
        <ChangeContainer>
          <ChangeText className={!showCategory && 'hide'}>
            {categoryInfo.gender !== '' && (
              <Grid isFlex>
                <Text bold fontSize="20px" border="2px solid #C0C0C0">
                  {categoryInfo.gender.selecteText}
                </Text>
              </Grid>
            )}
            {categoryInfo.MemberCnt !== '' && (
              <Grid isFlex margin="0 10px">
                <Text bold fontSize="20px" border="2px solid #C0C0C0">
                  {getPeopleText(categoryInfo.MemberCnt.value)}
                </Text>
                <Text bold fontSize="20px" color="#C0C0C0">
                  &nbsp;이
                </Text>
              </Grid>
            )}
            {categoryInfo.category !== '' && (
              <>
                <Grid isFlex>
                  <Text bold fontSize="20px" border="2px solid #C0C0C0">
                    {categoryInfo.category.selecteText}
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
        </ChangeContainer>
        <SelectContainer className={showCategory && 'hide'}>
          {selectData.map(item => {
            return (
              <SelectedContents
                key={`key-${item.title}`}
                {...item}
                state={categoryInfo}
                setState={setCategoryInfo}
                selectData={selectData}
                setSelectData={setSelectData}
              />
            );
          })}
        </SelectContainer>
        <Grid _onClick={goSearch}>
          <NextButton>
            <Right />
          </NextButton>
        </Grid>
        <Grid height="64px" padding="64px" />
      </Container>
      <Navbar />
    </>
  );
};

const ChangeContainer = styled.div`
  position: fixed;
  background-color: #fff;
  z-index: 3;
`;

const ChangeText = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 768px;
  &.hide {
    padding: 40px 34px;
  }

  @media (max-width: 500px) {
    width: 100%;
    &.hide {
      padding: 30px 24px;
    }
  }
`;
const SelectContainer = styled.div`
  width: 100%;
  padding-top: 150px;
  @media (max-width: 500px) {
    padding-top: 130px;
  }
  &.hide {
    padding-top: 0;
  }
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
