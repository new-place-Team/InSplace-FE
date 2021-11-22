import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import { Container, Text, Grid } from '../elements';
import { logOut } from '../redux/modules/userSlice';
import { unRegisterDB } from '../redux/async/user';
import ConfirmModal from '../components/common/ConfirmModal';
import CommonModal from '../components/common/CommonModal';
import { setCommonModalOn } from '../redux/modules/commonSlice';

const Setting = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const commomModal = useSelector(state => state.common.modalStatus);
  const [confirmModal, setConfirmModal] = useState(false);

  const goLogoOut = () => {
    dispatch(logOut());
    const modalParams = {
      title: `로그아웃되었습니다.`,
      goPage: '/',
    };
    dispatch(setCommonModalOn(modalParams));
    // window.location.href = '/';
  };

  const onClick = () => {
    setConfirmModal(true);
  };

  const goUnRegister = () => {
    dispatch(unRegisterDB());
    setConfirmModal(false);
    window.location.href = '/';
  };

  return (
    <>
      {/* 로그아웃 모달창은 풀 받고 진행예정 */}
      {commomModal && <CommonModal />}
      {confirmModal && (
        <ConfirmModal
          title="회원 탈퇴 하시겠습니까?"
          content="탈퇴된 회원은 영구적으로 탈퇴됩니다."
          setConfirmModal={setConfirmModal}
          confirmFun={goUnRegister}
          confirmText={t('CommonModal.agree')}
        />
      )}
      <Header _back _content={t('Setting.headerSubTitle')} _language />
      <Container padding="66px 0 0 0">
        <Grid padding="0 20px">
          <MBTIDiv onClick={goLogoOut}>
            <Text> {t('Setting.logOut')}</Text>
          </MBTIDiv>
          <MBTIDiv onClick={onClick}>
            <Text>{t('Setting.withdrawal')}</Text>
          </MBTIDiv>
        </Grid>
      </Container>
    </>
  );
};

const MBTIDiv = styled.div`
  width: 100%;
  height: 4rem;
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default Setting;
