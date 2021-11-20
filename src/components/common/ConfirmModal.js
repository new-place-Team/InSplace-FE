/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import { Grid } from '../../elements';
import { history } from '../../redux/configureStore';

const ConfirmModal = props => {
  const { title, content, isOk, Type, goToLogin } = props;

  const CloseConfirmModal = e => {
    const name = e.target.className;
    if (name.indexOf('close') === -1) {
      return;
    }
    props.setConfirmModal(false);
    if (props.pageMove) {
      props.pageMove();
    }
  };

  const CloseModal = e => {
    const name = e.target.className;
    if (name.indexOf('close') === -1) {
      return;
    }
    props.setModal(false);
    if (props.pageMove) {
      props.pageMove();
    }
  };

  const onDelete = () => {
    props.onDelete();
  };

  const goToLoginPage = () => {
    history.push('/login');
  };

  return (
    <>
      <ModalContainer
        className="close"
        onClick={e => (isOk ? CloseModal(e) : CloseConfirmModal(e))}
      >
        <ModalContent>
          <Title>{title}</Title>
          <Content>{content}</Content>
          <Grid justify="space-between" margin="40px 0 0 0">
            {isOk ? (
              <ModalButton className="fullButton close" onClick={CloseModal}>
                확인
              </ModalButton>
            ) : (
              <>
                <ModalButton className="close" onClick={CloseConfirmModal}>
                  취소
                </ModalButton>
                {!Type && !goToLogin ? (
                  <ModalButton className="black" onClick={onDelete}>
                    삭제
                  </ModalButton>
                ) : (
                  <ModalButton
                    className="black close"
                    onClick={e =>
                      !goToLogin ? CloseConfirmModal(e) : goToLoginPage()
                    }
                  >
                    확인
                  </ModalButton>
                )}
              </>
            )}
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
  background-color: rgba(0, 0, 0, 0.65);
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

export default React.memo(ConfirmModal);
