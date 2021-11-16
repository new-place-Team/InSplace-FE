import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonModalOff } from '../../redux/modules/commonSlice';
import { Grid } from '../../elements';
import { history } from '../../redux/configureStore';

const CommonModal = () => {
  const dispatch = useDispatch();
  const title = useSelector(state => state.common.title);
  const content = useSelector(state => state.common.content);
  const goPage = useSelector(state => state.common.goPage);

  const CloseModal = e => {
    e.stopPropagation();
    const name = e.target.className;
    if (name.indexOf('close') === -1) {
      return;
    }
    dispatch(setCommonModalOff());
    if (goPage === 'back') {
      history.goBack();
    } else if (goPage) {
      history.push(goPage);
    }
  };

  return (
    <>
      <ModalContainer className="close" onClick={CloseModal}>
        <ModalContent>
          <Title>{title}</Title>
          {content && <Content>content</Content>}
          <Grid justify="space-between" margin="40px 0 0 0">
            <ModalButton className="fullButton close" onClick={CloseModal}>
              확인
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
  z-index: 999;
`;
const ModalContent = styled.div`
  position: relative;
  width: 375px;
  padding: 32px;
  border-radius: 4px;
  overflow-y: auto;
  background-color: #fff;
`;
const Title = styled.h3`
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.0038em;
`;
const Content = styled.p`
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.0041em;
  color: #7a7d81;
`;
const ModalButton = styled.button`
  width: 49%;
  padding: 10px;
  font-size: 16px;
  color: #232529;
  border: 1px solid #232529;
  cursor: pointer;
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

export default CommonModal;
