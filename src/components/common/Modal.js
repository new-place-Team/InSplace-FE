/* eslint-disable no-undef */
// eslint-disable-next-line prefer-const
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Text, Image } from '../../elements';
import { getMbti, setModalOff } from '../../redux/modules/userSlice';
// eslint-disable-next-line import/named
import { x, checkIcon } from '../../images/index';
import { getPeopleMbti } from '../../shared/transferText';

const Modal = () => {
  const dispatch = useDispatch();
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
  const modaloff = () => {
    dispatch(setModalOff());
  };

  return (
    <>
      <Overlay>
        <Grid>
          <ModalContent>
            <Text bold margin="32px 0px">
              MBTI를 선택해주세요!
            </Text>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 17, type: 'MBTI 선택안함' };
                selectMbti(info);
              }}
            >
              <Text>MBTI 선택안함</Text>
              {currentMbtiId === 17 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 1, type: 'ISTJ' };
                selectMbti(info);
              }}
            >
              <Text>ISTJ</Text>
              {currentMbtiId === 1 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 2, type: 'ISFJ' };
                selectMbti(info);
              }}
            >
              <Text>ISFJ</Text>
              {currentMbtiId === 2 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 3, type: 'INFJ' };
                selectMbti(info);
              }}
            >
              <Text>INFJ</Text>
              {currentMbtiId === 3 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 4, type: 'INTJ' };
                selectMbti(info);
              }}
            >
              <Text>INTJ</Text>
              {currentMbtiId === 4 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 5, type: 'ISTP' };
                selectMbti(info);
              }}
            >
              <Text>ISTP</Text>
              {currentMbtiId === 5 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 6, type: 'ISFP' };
                selectMbti(info);
              }}
            >
              <Text>ISFP</Text>
              {currentMbtiId === 6 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 7, type: 'INFP' };
                selectMbti(info);
              }}
            >
              <Text>INFP</Text>
              {currentMbtiId === 7 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 8, type: 'INTP' };
                selectMbti(info);
              }}
            >
              <Text>INTP</Text>
              {currentMbtiId === 8 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 9, type: 'ESTP' };
                selectMbti(info);
              }}
            >
              <Text>ESTP</Text>
              {currentMbtiId === 9 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 10, type: 'ESFP' };
                selectMbti(info);
              }}
            >
              <Text>ESFP</Text>
              {currentMbtiId === 10 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 11, type: 'ENFP' };
                selectMbti(info);
              }}
            >
              <Text>ENFP</Text>
              {currentMbtiId === 11 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 12, type: 'ENTP' };
                selectMbti(info);
              }}
            >
              <Text>ENTP</Text>
              {currentMbtiId === 12 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 13, type: 'ESTJ' };
                selectMbti(info);
              }}
            >
              <Text>ESTJ</Text>
              {currentMbtiId === 13 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 14, type: 'ESFJ' };
                selectMbti(info);
              }}
            >
              <Text>ESFJ</Text>
              {currentMbtiId === 14 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 15, type: 'ENFJ' };
                selectMbti(info);
              }}
            >
              <Text>ENFJ</Text>
              {currentMbtiId === 15 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 16, type: 'ENTJ' };
                selectMbti(info);
              }}
            >
              <Text>ENTJ</Text>
              {currentMbtiId === 16 ? <Icon src={checkIcon} /> : null}
            </MBTIDiv>
            <AbsolBtn onClick={modaloff}>
              <Image width="30%" src={x} />
            </AbsolBtn>
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
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 10px;
  @media (min-width: 1024px) {
    width: 768px;
  }
`;

const MBTIDiv = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AbsolBtn = styled.button`
  position: absolute;
  top: 46px;
  right: -70px;
  transform: translate(-50%, -50%);
`;

const Icon = styled.img`
  width: 24px;
  margin: ${({ margin }) => margin || '0'};
  vertical-align: text-bottom;
  cursor: pointer;
`;

export default Modal;
