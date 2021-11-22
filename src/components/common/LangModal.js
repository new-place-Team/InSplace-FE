import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Text } from '../../elements';
import { setModalOff } from '../../redux/modules/userSlice';
// import { checked } from '../../images';
// import { ReactComponent as CloseBtn } from '../../images/Icon/ic_close.svg';

const LangModal = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const korean = e => {
    e.stopPropagation();
    i18n.changeLanguage('ko-KR');
    dispatch(setModalOff());
  };
  const american = e => {
    e.stopPropagation();
    i18n.changeLanguage('en-US');
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
            <LangButton className="americanButton" onClick={american}>
              <LangIcon>
                <Text color="#fff">A</Text>
              </LangIcon>
              <LangText>English</LangText>
            </LangButton>
            {/* <Grid
            width="100%"
            isFlex
            padding="10px 20px"
            _onClick={() => {
              window.alert('서비스 준비중입니다.');
            }}
            cursor
          >
            <Grid
              margin="0 10px 0 0"
              bg="black"
              width="28px"
              height="28px"
              isFlex
              justify="center"
            >
              <Text color="#fff">와</Text>
            </Grid>
            <Grid flex>일본어</Grid>
          </Grid> */}
            <LangButton className="langButton" onClick={korean}>
              <LangIcon>
                <Text color="#fff">아</Text>
              </LangIcon>
              <LangText>한국어</LangText>
              {/* <Image src={checked} /> */}
            </LangButton>
            {/* 시안에 닫기 버튼이 없어서 주석함
            <Icon>
              <CloseBtn />
            </Icon> */}
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
  z-index: 100;
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

// const Icon = styled.div`
//   position: absolute;
//   top: 3px;
//   right: 3px;
//   width: 24px;
//   height: 24px;
//   svg {
//     fill: #000;
//   }
//   cursor: pointer;
// `;

export default LangModal;
