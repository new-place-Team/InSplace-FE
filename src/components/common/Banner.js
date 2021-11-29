import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Icons } from '../../elements';
import { ReactComponent as Close } from '../../images/Icon/ic_close.svg';
import CommonModal from './CommonModal';
import { history } from '../../redux/configureStore';
import { setCommonModalOn } from '../../redux/modules/commonSlice';

const Banner = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modalStatus = useSelector(state => state.common.modalStatus);
  const isLogin = useSelector(state => state.user.isLogin);
  const [active, setActive] = useState(false);

  const closeBanner = e => {
    e.stopPropagation();
    setActive(true);
  };
  const goToFeedBack = () => {
    if (!isLogin) {
      const params = {
        title: '로그인을 해야 이용할 수 있는 서비스입니다.',
        goPage: '/login',
      };
      dispatch(setCommonModalOn(params));
    } else {
      history.push(`/mypage`);
    }
  };
  return (
    <>
      {modalStatus && <CommonModal />}
      <BannerWrap className={active && 'closeBanner'} onClick={goToFeedBack}>
        <Grid justify="space-between" padding="30px 24px">
          <BannerContent>
            {t('Banner.BannerSentence')}
            <Span>{t('Banner.Americano')}</Span> ☕
          </BannerContent>
          <Icons _onClick={closeBanner} className="closeButton">
            <Close />
          </Icons>
        </Grid>
      </BannerWrap>
    </>
  );
};

const BannerWrap = styled.div`
  position: fixed;
  bottom: 65px;
  display: block;
  width: 768px;
  margin: 0 auto;
  background-color: #282828;
  cursor: pointer;
  z-index: 10;
  &.closeBanner {
    display: none;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const BannerContent = styled.p`
  color: #fff;
  font-weight: 600;
`;
const Span = styled.span`
  color: #51d787;
`;
export default Banner;
