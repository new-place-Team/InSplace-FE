import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text } from '../../elements';
import { setModalOff } from '../../redux/modules/userSlice';
import { getCurrentCoordinateWEB } from '../../redux/async/place';

const LangModal = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const korean = e => {
    e.stopPropagation();
    i18n.changeLanguage('ko-KR');
    dispatch(getCurrentCoordinateWEB('ko'));
    dispatch(setModalOff());
  };
  const american = e => {
    e.stopPropagation();
    i18n.changeLanguage('en-US');
    dispatch(getCurrentCoordinateWEB('en'));
    dispatch(setModalOff());
  };

  const onClose = e => {
    e.stopPropagation();
    const name = e.target.className;
    if (name.indexOf('close') === -1) {
      return;
    }
    dispatch(setModalOff());
  };

  return (
    <>
      <Overlay className="close" onClick={onClose}>
        <ModalContainer>
          <ModalContent>
            {/* 영어 */}
            <LangButton className="americanButton" onClick={american}>
              <LangIcon>
                <Text color="#fff">A</Text>
              </LangIcon>
              <LangText>English</LangText>
            </LangButton>
            {/* 한국어 */}
            <LangButton className="langButton" onClick={korean}>
              <LangIcon>
                <Text color="#fff">아</Text>
              </LangIcon>
              <LangText>한국어</LangText>
            </LangButton>
          </ModalContent>
        </ModalContainer>
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.48);
  z-index: 10;
`;
const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  width: 768px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ModalContent = styled.div`
  position: absolute;
  top: 65px;
  right: 33px;
  width: 171px;
  padding: 8px;
  background-color: #fff;
`;

const LangButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e6e9ec;
  }
  &:last-child {
    margin-bottom: 0px;
  }
`;

const LangIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin: 0 10px 0 0;
  background-color: #000;
`;

const LangText = styled.p`
  font-size: 17px;
  font-weight: 700;
  color: #282828;
`;

export default LangModal;
