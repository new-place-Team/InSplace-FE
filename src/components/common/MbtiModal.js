import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Text } from '../../elements';
import { getMbti, setModalOff } from '../../redux/modules/userSlice';
import { close, checked } from '../../images/index';
import { getPeopleMbti } from '../../shared/transferText';
import { getMbtiList } from '../../shared/commonData';

const MbtiModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userInfo = useSelector(state => state.user.userInfo);
  const reduxMbti = useSelector(state => state.user.userMbti.mbtiId);
  const mbtiNum = getPeopleMbti(userInfo.mbti);
  const mbtiList = getMbtiList();
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
            {mbtiList.length > 0 &&
              mbtiList.map(item => {
                return (
                  <MBTIDiv
                    key={item.mbtiId}
                    onClick={() => {
                      selectMbti(item);
                    }}
                  >
                    <Text>{item.type}</Text>
                    {currentMbtiId === item.mbtiId ? (
                      <Icon src={checked} />
                    ) : null}
                  </MBTIDiv>
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
  cursor: pointer;
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

export default MbtiModal;
