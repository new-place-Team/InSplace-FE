import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCommonModalOff,
  setCommonModalOn,
  setFeedbackModalOff,
  setMoreModalOff,
  setReportModalOff,
} from '../../redux/modules/commonSlice';
import { Grid, Image, Text, Textarea } from '../../elements';
import { history } from '../../redux/configureStore';
import { modalClose, checked, close } from '../../images';
import { reviewReportText } from '../../shared/commonData';
import { reviewReportDB } from '../../redux/async/place';

const CommonModal = ({ type, showConfirmModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const modalInfo = useSelector(state => state.common.modalInfo);
  const goPage = useSelector(state => state.common.goPage);
  const moreInfo = useSelector(state => state.common.moreInfo);
  const [errorMessage, setErrorMessage] = useState('');
  const report = moreInfo && moreInfo.type === 'report';
  const [reportText, setReportText] = useState(reviewReportText);
  const [reportInfo, setReportInfo] = useState({
    toUserId: moreInfo && moreInfo.userId,
    categoryNum: 1,
    description: '',
  });

  // 닫기 버튼 클릭했을때
  const CloseModal = e => {
    e.stopPropagation();
    const name = e.target.className;
    if (name.indexOf('close') === -1) {
      return;
    }
    if (type === 'report') {
      dispatch(setReportModalOff());
    } else if (type === 'feedback') {
      dispatch(setFeedbackModalOff());
    } else {
      dispatch(setCommonModalOff());
    }
    if (goPage === 'back') {
      history.goBack();
    } else if (goPage) {
      history.push(goPage);
    }
  };

  // 리뷰 더보기 버튼 모달 닫기 버튼 클릭했을때
  const MoreModalClose = e => {
    e.stopPropagation();
    const name = e.target.className;
    if (name.indexOf('close') === -1) {
      return;
    }
    dispatch(setMoreModalOff());
  };

  // 리뷰 삭제
  const reviewDelete = () => {
    showConfirmModal();
  };

  // 리뷰 수정 버튼 클릭했을 때
  const goToReviewEditPage = () => {
    history.push({
      pathname: `/review/edit/${moreInfo.postId}`,
      state: moreInfo.reviewId,
    });
    dispatch(setMoreModalOff());
  };

  // 리뷰 신고 타입 선택했을때
  const reportTypeClick = idx => {
    const value = idx + 1;
    // 체크 버튼 상태값 변경해주기
    const newList = reportText.map(item => {
      return item.value === value
        ? { ...item, active: true }
        : { ...item, active: false };
    });
    setReportText(newList);
    setReportInfo({ ...reportInfo, categoryNum: value });
  };

  // 신고하기 버튼을 클릭했을때
  const reportClick = () => {
    const params = {
      postId: moreInfo.postId,
      reviewId: moreInfo.reviewId,
      toUserId: reportInfo.toUserId,
      categoryNum: reportInfo.categoryNum,
      description: reportInfo.description,
    };
    if (reportInfo.description.length <= 14) {
      return setErrorMessage('리뷰는 최소 15자 이상 등록해주세요');
    }
    return dispatch(reviewReportDB(params));
  };

  const [feedbackText, setFeedbackText] = useState('');
  const feedbackSubmit = () => {
    // 에러메세지 만들기
    if (feedbackText === '') {
      console.log('빈값');
    }
    dispatch(setFeedbackModalOff());
    const params = {
      title: `소중한 의견 감사합니다!`,
    };
    dispatch(setCommonModalOn(params));
  };

  // -> /feedbacks

  if (type === 'feedback') {
    return (
      <ModalContainer className="close" onClick={CloseModal}>
        <ModalContent>
          <Grid justify="space-between">
            <Title>의견보내기</Title>
            <CloseButton className="close" src={close} />
          </Grid>
          <Content>개선사항을 보내주세요</Content>
          <FeedbackTextarea
            rows={10}
            placeholder="자유롭게 의견을 보내주세요"
            onChange={e => setFeedbackText(e.target.value)}
          />
          <ModalButton
            className="fullButton"
            margin="32px 0 0 0"
            padding="15px"
            onClick={feedbackSubmit}
          >
            의견보내기
          </ModalButton>
        </ModalContent>
      </ModalContainer>
    );
  }

  // 더보기 버튼과 신고하기 버튼 타입일때
  if (type === 'more' || report) {
    return (
      <MoreContainer className="close more" onClick={MoreModalClose}>
        <MoreModalContent>
          <Grid justify="space-between">
            <Title>{report ? '신고 사유' : '리뷰 설정'}</Title>
            <CloseButton
              className="close"
              src={modalClose}
              onClick={MoreModalClose}
            />
          </Grid>
          <Grid>
            {report ? (
              <>
                {reportText.map((item, idx) => {
                  return (
                    <MoreGrid
                      onClick={() => reportTypeClick(idx)}
                      key={`item-${item.value}`}
                    >
                      <Text size="16px">{item.text}</Text>
                      {item.active && <Image src={checked} />}
                    </MoreGrid>
                  );
                })}
                <Grid margin="30px 0 0 0">
                  <Text>신고내용</Text>
                  <Textarea
                    height="120px"
                    padding="20px"
                    margin="16px 0 0 0"
                    border="1px solid #E6E9EC"
                    placeholder="최소 15자 이상 써 주세요"
                    _onChange={e =>
                      setReportInfo({
                        ...reportInfo,
                        description: e.target.value,
                      })
                    }
                  />
                  <Text fontSize="12px" color="#ff4949">
                    {errorMessage}
                  </Text>
                  <Text
                    margin="12px 0 0 0"
                    textAlign="right"
                    fontSize="14px"
                    color="#C2C6CB"
                  >
                    {reportInfo.description.length} / 최소 15자
                  </Text>
                  <ModalButton
                    className="fullButton"
                    margin="32px 0 0 0"
                    padding="15px"
                    onClick={reportClick}
                  >
                    {t('CommonModal.singo')}
                  </ModalButton>
                </Grid>
              </>
            ) : (
              <>
                <MoreGrid onClick={goToReviewEditPage}>
                  <Text>{t('CommonModal.edit')}</Text>
                </MoreGrid>
                <MoreGrid onClick={reviewDelete}>
                  <Text>{t('CommonModal.delete')}</Text>
                </MoreGrid>
              </>
            )}
          </Grid>
        </MoreModalContent>
      </MoreContainer>
    );
  }

  // 기본 확인 모달
  return (
    <>
      <ModalContainer className="close" onClick={CloseModal}>
        <ModalContent>
          {modalInfo && <Title>{modalInfo.title}</Title>}
          {modalInfo && <Content>{modalInfo.content}</Content>}
          <Grid justify="space-between" margin="40px 0 0 0">
            <ModalButton className="fullButton close" onClick={CloseModal}>
              {t('CommonModal.agree')}
            </ModalButton>
          </Grid>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;
const ModalContent = styled.div`
  position: relative;
  width: 375px;
  padding: 32px;
  border-radius: 4px;
  overflow-y: auto;
  background-color: #fff;
  @media (max-width: 415px) {
    width: 80%;
  }
`;
const Title = styled.h3`
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.0038em;
  @media (max-width: 415px) {
    font-size: 16px;
  }
`;
const Content = styled.p`
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.0041em;
  color: #7a7d81;
  @media (max-width: 415px) {
    font-size: 14px;
  }
`;
const ModalButton = styled.button`
  width: 49%;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '10px'};
  font-size: 16px;
  color: #232529;
  border: 1px solid #232529;
  cursor: pointer;
  @media (max-width: 415px) {
    font-size: 12px;
  }
  &.fullButton {
    width: 100%;
    color: #fff;
    background-color: #232529;
  }
  &.black {
    color: #fff;
    background-color: #232529;
  }
`;

const MoreContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: bottom;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;
const MoreModalContent = styled.div`
  position: absolute;
  bottom: 0;
  width: 768px;
  max-height: 98%;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px 12px 0px 0px;
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MoreGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 0;
  border-bottom: 1px solid #e6e9ec;
  cursor: pointer;
`;

const CloseButton = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url('${props => props.src}');
  background-position: top right;
  background-repeat: no-repeat;
`;

const FeedbackTextarea = styled.textarea`
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  border: 1px solid #eee;
  letter-spacing: -0.0008em;
  &:focus {
    outline: none;
  }
`;
export default CommonModal;
