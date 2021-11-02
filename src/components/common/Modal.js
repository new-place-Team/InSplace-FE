import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Grid, Text, Button } from '../../elements';
import { getMbti, setModalOff } from '../../redux/modules/userSlice';

const Modal = () => {
  const dispatch = useDispatch();

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
            <Text margin="32px 0px">MBTI를 선택해주세요!</Text>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 1, type: 'ISTJ' };
                selectMbti(info);
              }}
            >
              <Text bold>ISTJ</Text>
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 2, type: 'ISFJ' };
                selectMbti(info);
              }}
            >
              <Text bold>ISFJ</Text>
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 3, type: 'INFJ' };
                selectMbti(info);
              }}
            >
              <Text bold>INFJ</Text>
            </MBTIDiv>

            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 4, type: 'INTJ' };
                selectMbti(info);
              }}
            >
              <Text bold>INTJ</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 5, type: 'ISTP' };
                selectMbti(info);
              }}
            >
              <Text bold>ISTP</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 6, type: 'ISFP' };
                selectMbti(info);
              }}
            >
              <Text bold>ISFP</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 7, type: 'INFP' };
                selectMbti(info);
              }}
            >
              <Text bold>INFP</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 8, type: 'INTP' };
                selectMbti(info);
              }}
            >
              <Text bold>INTP</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 9, type: 'ESTP' };
                selectMbti(info);
              }}
            >
              <Text bold>ESTP</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 10, type: 'ESFP' };
                selectMbti(info);
              }}
            >
              <Text bold>ESFP</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 11, type: 'ENFP' };
                selectMbti(info);
              }}
            >
              <Text bold>ENFP</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 12, type: 'ENTP' };
                selectMbti(info);
              }}
            >
              <Text bold>ENTP</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 13, type: 'ESTJ' };
                selectMbti(info);
              }}
            >
              <Text bold>ESTJ</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 14, type: 'ESFJ' };
                selectMbti(info);
              }}
            >
              <Text bold>ESFJ</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 15, type: 'ENFJ' };
                selectMbti(info);
              }}
            >
              <Text bold>ENFJ</Text>
            </MBTIDiv>
            <MBTIDiv
              onClick={() => {
                const info = { mbtiId: 16, type: 'ENTJ' };
                selectMbti(info);
              }}
            >
              <Text bold>ENTJ</Text>
            </MBTIDiv>
            <AbsolBtn onClick={modaloff}>❌</AbsolBtn>
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
  z-index: 5;
`;

const ModalContent = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 90%;
  left: 0;
  padding: 0 24px;
  transition: bottom 0.3s ease-out;
  z-index: 10;
  overflow: auto;
  border-radius: 10px;
`;

const MBTIDiv = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  color: white;
  display: flex;
  align-items: center;
`;

const AbsolBtn = styled.button`
  position: absolute;
  top: 44px;
  right: 24px;
  transform: translate(-50%, -50%);
`;

export default Modal;
