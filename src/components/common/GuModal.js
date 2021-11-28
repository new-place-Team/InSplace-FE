import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid, Text } from '../../elements';
import { close, checked } from '../../images/index';
import { getSeoulGuList } from '../../shared/commonData';

const GuModal = props => {
  const { closeGuModal, currentGu, changeGuInfo } = props;
  const guList = getSeoulGuList();
  const { t } = useTranslation();
  return (
    <>
      <Overlay className="close" onClick={closeGuModal}>
        <Grid cursor>
          <ModalContent>
            <TitleWrap>
              <Text bold margin="32px 0px 20px">
                {t('guList.pleaseSelectArea')}
              </Text>
              <AbsolBtn className="close" onClick={closeGuModal} src={close}>
                {/* <Image className="close" width="100%" src={xclose} /> */}
              </AbsolBtn>
            </TitleWrap>
            {guList.length > 0 &&
              guList.map(item => {
                return (
                  <GuContent key={item.guId} onClick={() => changeGuInfo(item)}>
                    <Text>{item.text}</Text>
                    {currentGu.guId === item.guId ? (
                      <Icon src={checked} />
                    ) : null}
                  </GuContent>
                );
              })}
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
  z-index: 10;
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
  z-index: 10;
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
const GuContent = styled.div`
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

export default GuModal;
