import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { Grid } from '../../elements';

ReactModal.setAppElement('#root');

const ConfirmModal = props => {
  const { title, content, isOk } = props;

  const CloseConfirmModal = () => {
    props.setConfirmModal(false);
  };

  const CloseModal = () => {
    props.setModal(false);
  };

  const onDelete = () => {
    props.onDelete();
  };

  return (
    <>
      <ReactModal
        isOpen
        onRequestClose={isOk ? CloseModal : CloseConfirmModal}
        style={{
          overlay: {
            position: 'fixed',
            zIndex: 100,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            position: 'relative',
            background: '#fff',
            width: '375px',
            overflowY: 'auto',
            borderRadius: '4px',
            padding: '32px',
          },
        }}
      >
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Grid justify="space-between" margin="40px 0 0 0">
          {isOk ? (
            <ModalButton className="fullButton" onClick={CloseModal}>
              확인
            </ModalButton>
          ) : (
            <>
              <ModalButton onClick={CloseConfirmModal}>취소</ModalButton>
              <ModalButton className="black" onClick={onDelete}>
                삭제
              </ModalButton>
            </>
          )}
        </Grid>
      </ReactModal>
    </>
  );
};

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
