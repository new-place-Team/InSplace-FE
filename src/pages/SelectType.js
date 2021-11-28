/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import SelectedContents from '../components/place/SelectedContents';
import { Container, Grid, Text, Label } from '../elements/index';
import { ReactComponent as Right } from '../images/ic-next.svg';
import { history } from '../redux/configureStore';
// import { getPeopleText } from '../shared/transferText';
import {
  getSearchConditionDB,
  getCurrentCoordinateWEB,
} from '../redux/async/place';
import CommonModal from '../components/common/CommonModal';
import GuModal from '../components/common/GuModal';
import { setCommonModalOn } from '../redux/modules/commonSlice';
import polygonimg from '../images/Polygon.png';

const SelectedType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const weatherStatus = useSelector(state => state.place.weatherStatus);
  const location = useSelector(state => state.place.location);
  const commomModal = useSelector(state => state.common.modalStatus);

  const [guModal, setGuModal] = useState(false);
  const [currentGu, setCurrentGu] = useState({
    guId: 1,
    text: t('guList.all'),
  });

  const [categoryInfo, setCategoryInfo] = React.useState({
    MemberCnt: '',
    gender: '',
    category: '',
  });

  const showCategory =
    categoryInfo.MemberCnt === '' &&
    categoryInfo.gender === '' &&
    categoryInfo.category === '';

  const getPeopleText = type => {
    let text = '';
    switch (type) {
      case 1:
        text = t('selectTypePage.returnText.0');
        break;
      case 2:
        text = t('selectTypePage.returnText.1');
        break;
      case 3:
        text = t('selectTypePage.returnText.2');
        break;
      default:
        text = t('selectTypePage.returnText.3');
    }
    return text;
  };
  const [selectData, setSelectData] = React.useState([
    {
      title: t('selectTypePage.selectGender.selectTitle'),
      list: [
        {
          selecteText: t('selectTypePage.selectGender.genderType.0'),
          value: 2,
        },
        {
          selecteText: t('selectTypePage.selectGender.genderType.1'),
          value: 1,
        },
        {
          selecteText: t('selectTypePage.selectGender.genderType.2'),
          value: 3,
        },
      ],
      type: 'gender',
      grid: 0,
      bg: '#f4f4f4',
    },
    {
      title: t('selectTypePage.selectNumber.selectTitle'),
      list: [
        {
          selecteText: t('selectTypePage.selectNumber.peopleCount.0'),
          value: 1,
        },
        {
          selecteText: t('selectTypePage.selectNumber.peopleCount.1'),
          value: 2,
        },
        {
          selecteText: t('selectTypePage.selectNumber.peopleCount.2'),
          value: 3,
        },
        {
          selecteText: t('selectTypePage.selectNumber.peopleCount.3'),
          value: 4,
        },
      ],
      type: 'MemberCnt',
      grid: 2,
      bg: '#e8ecf2',
    },
    {
      title: t('selectTypePage.selectPlace.selectTitle'),
      list: [
        { selecteText: t('selectTypePage.selectPlace.placeType.0'), value: 1 },
        { selecteText: t('selectTypePage.selectPlace.placeType.1'), value: 2 },
        { selecteText: t('selectTypePage.selectPlace.placeType.2'), value: 3 },
        { selecteText: t('selectTypePage.selectPlace.placeType.3'), value: 4 },
        { selecteText: t('selectTypePage.selectPlace.placeType.4'), value: 5 },
      ],
      type: 'category',
      grid: 3,
      bg: '#bbc0cf',
    },
  ]);

  /* 지역구 모달 Open */
  const openGuModal = () => setGuModal(true);
  /* 지역구 모달 Close */
  const closeGuModal = () => setGuModal(false);
  /* 지역구 변경 */
  const changeGuInfo = async guInfo => {
    /* 현재 위치 체크 */
    if (guInfo.guId === 0 && !location) {
      const payload = await dispatch(getCurrentCoordinateWEB());
      if (!payload.payload.address) {
        const modalParams = { title: t('selectTypePage.pleaseCheckLocation') };
        dispatch(setCommonModalOn(modalParams));
        return;
      }
    }
    setCurrentGu(guInfo);
  };
  /* category 별 검색 */
  const goSearch = () => {
    if (
      categoryInfo.gender === '' ||
      categoryInfo.MemberCnt === '' ||
      categoryInfo.category === ''
    ) {
      const modalParams = {
        title: t('selectTypePage.alert'),
      };
      dispatch(setCommonModalOn(modalParams));
      // window.alert(t('selectTypePage.alert'));
      return;
    }

    let params = `?weather=${weatherStatus.status}&category=${categoryInfo.category.value}&num=${categoryInfo.MemberCnt.value}&gender=${categoryInfo.gender.value}`;
    if (currentGu.guId === 0) {
      const { latLon } = location;
      params += `&x=${latLon.lat}&y=${latLon.lon}`;
    } else if (currentGu.guId > 1) {
      params += `&area=${currentGu.text}`;
    }
    dispatch(getSearchConditionDB(params));
    history.push(`/select-type/result${params}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectData]);

  return (
    <>
      {commomModal && <CommonModal />}
      <Header
        _content={t('selectTypePage.headerSubTitle')}
        _back
        _type="search"
        padding
      />
      <Container padding="66px 0 0 0">
        <ChangeContainer>
          <SelectGuArea>
            <Grid padding="12px 24px 24px 24px">
              <Label type="form" marginBottom="0">
                {t('guList.selectArea')}
              </Label>
              <GuArea onClick={openGuModal}>
                {/* <Text>{t('signUpPage.noMbtiSelect')}</Text> */}
                <Text>{currentGu.text}</Text>
                <Icon src={polygonimg} />
              </GuArea>
            </Grid>
          </SelectGuArea>
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
                  &nbsp;{t('selectTypePage.resultSentence.0')}
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
                    &nbsp;{t('selectTypePage.resultSentence.1')}
                  </Text>
                </Grid>
                <LineBreak>
                  <Text bold fontSize="20px">
                    {t('selectTypePage.resultSentence.2')}
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
        <NextButton onClick={goSearch}>
          <Right />
        </NextButton>
        <Grid height="64px" padding="64px" />
        {guModal && (
          <GuModal
            currentGu={currentGu}
            changeGuInfo={type => changeGuInfo(type)}
            closeGuModal={closeGuModal}
          />
        )}
      </Container>
      <Navbar />
    </>
  );
};

const ChangeContainer = styled.div`
  /* position: fixed; */
  background-color: #fff;
  width: 100%;
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
      padding: 0 24px 24px 24px;
    }
  }
`;
const SelectContainer = styled.div`
  width: 100%;
  /* padding-top: 150px; */
  @media (max-width: 500px) {
    /* padding-top: 130px; */
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
  display: block;
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
const SelectGuArea = styled.div`
  width: 100%;
`;
const GuArea = styled.div`
  width: 100%;
  height: 3rem;
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 16px;
  margin: ${({ margin }) => margin || '0'};
  vertical-align: text-bottom;
`;

export default SelectedType;
