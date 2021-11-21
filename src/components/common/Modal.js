import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Grid, Text } from '../../elements';
import { getMbti, setModalOff } from '../../redux/modules/userSlice';
import { close, checked } from '../../images/index';
import { getPeopleMbti } from '../../shared/transferText';

const Modal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userInfo = useSelector(state => state.user.userInfo);
  const reduxMbti = useSelector(state => state.user.userMbti.mbtiId);
  const userMbti = userInfo.mbti;
  const mbtiNum = getPeopleMbti(userMbti);
  let currentMbtiId;
  if (!reduxMbti) {
    currentMbtiId = mbtiNum;
  } else {
    currentMbtiId = reduxMbti;
  }

  const selectMbti = mbtiInfo => {
    dispatch(getMbti(mbtiInfo));
    dispatch(setModalOff());
  };
  const modaloff = e => {
    e.stopPropagation();
    const name = e.target.className;
    if (name.indexOf('close') === -1) {
      return;
    }
    dispatch(setModalOff());
  };

  return (
    <>
      <Overlay className="close" onClick={modaloff}>
        <Grid>
          <ModalContent>
            <TitleWrap>
              <Text bold margin="32px 0px">
                {t('MbtiModal.mbtiTitle')}
              </Text>
              <AbsolBtn className="close" onClick={modaloff} src={close}>
                {/* <Image className="close" width="100%" src={xclose} /> */}
              </AbsolBtn>
            </TitleWrap>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 17, type: 'MBTI 선택안함' };
                selectMbti(info);
              }}
            >
              <Text>{t('MbtiModal.noSelection')}</Text>
              {currentMbtiId === 17 ? <Icon src={checked} /> : null}
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 1, type: 'ISTJ' };
                selectMbti(info);
              }}
            >
              <Text>ISTJ</Text>
              {currentMbtiId === 1 ? <Icon src={checked} /> : null}
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 2, type: 'ISFJ' };
                selectMbti(info);
              }}
            >
              <Text>ISFJ</Text>
              {currentMbtiId === 2 ? <Icon src={checked} /> : null}
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 3, type: 'INFJ' };
                selectMbti(info);
              }}
            >
              <Text>INFJ</Text>
              {currentMbtiId === 3 ? <Icon src={checked} /> : null}
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 4, type: 'INTJ' };
                selectMbti(info);
              }}
            >
              <Text>INTJ</Text>
              {currentMbtiId === 4 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 5, type: 'ISTP' };
                selectMbti(info);
              }}
            >
              <Text>ISTP</Text>
              {currentMbtiId === 5 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 6, type: 'ISFP' };
                selectMbti(info);
              }}
            >
              <Text>ISFP</Text>
              {currentMbtiId === 6 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 7, type: 'INFP' };
                selectMbti(info);
              }}
            >
              <Text>INFP</Text>
              {currentMbtiId === 7 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 8, type: 'INTP' };
                selectMbti(info);
              }}
            >
              <Text>INTP</Text>
              {currentMbtiId === 8 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 9, type: 'ESTP' };
                selectMbti(info);
              }}
            >
              <Text>ESTP</Text>
              {currentMbtiId === 9 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 10, type: 'ESFP' };
                selectMbti(info);
              }}
            >
              <Text>ESFP</Text>
              {currentMbtiId === 10 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 11, type: 'ENFP' };
                selectMbti(info);
              }}
            >
              <Text>ENFP</Text>
              {currentMbtiId === 11 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 12, type: 'ENTP' };
                selectMbti(info);
              }}
            >
              <Text>ENTP</Text>
              {currentMbtiId === 12 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 13, type: 'ESTJ' };
                selectMbti(info);
              }}
            >
              <Text>ESTJ</Text>
              {currentMbtiId === 13 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 14, type: 'ESFJ' };
                selectMbti(info);
              }}
            >
              <Text>ESFJ</Text>
              {currentMbtiId === 14 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 15, type: 'ENFJ' };
                selectMbti(info);
              }}
            >
              <Text>ENFJ</Text>
              {currentMbtiId === 15 ? <Icon src={checked} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 16, type: 'ENTJ' };
                selectMbti(info);
              }}
            >
              <Text>ENTJ</Text>
              {currentMbtiId === 16 ? <Icon src={checked} /> : null}
            </MBTIDiv>
          </ModalContent>
        </Grid>
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.55);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 90%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 24px;
  transition: bottom 0.3s ease-out;
  z-index: 999;
  overflow-y: auto;
  border-radius: 10px 10px 0 0;
  @media (min-width: 1024px) {
    width: 768px;
  }
`;
const TitleWrap = styled.div`
  position: relative;
`;
const AbsolBtn = styled.button`
  position: absolute;
  top: -5px;
  right: 0;
  width: 24px;
  height: 24px;
  background-image: url('${props => props.src}');
  background-repeat: no-repeat;
`;
const MBTIDiv = styled.div`
  width: 100%;
  padding: 22px 0;
  /* height: 5rem; */
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.img`
  width: 24px;
  margin: ${({ margin }) => margin || '0'};
  vertical-align: text-bottom;
  cursor: pointer;
`;

export default Modal;
