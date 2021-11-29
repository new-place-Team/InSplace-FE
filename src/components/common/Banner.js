import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Icons } from '../../elements';
import { ReactComponent as Close } from '../../images/Icon/ic_close.svg';
import { history } from '../../redux/configureStore';
import { setCommonModalOn } from '../../redux/modules/commonSlice';
import CommonModal from './CommonModal';
// import { setTodayCookie } from '../../shared/utils';

const Banner = () => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(state => state.common.modalStatus);
  const isLogin = useSelector(state => state.user.isLogin);
  const [active, setActive] = useState(false);
  // const [checked, setChecked] = useState(false);

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

  // const closeToday = e => {
  //   e.stopPropagation();
  //   setChecked(ischecked => !ischecked);
  //   setTodayCookie();
  // };
  return (
    <>
      {modalStatus && <CommonModal />}

      <BannerWrap className={active && 'closeBanner'} onClick={goToFeedBack}>
        {/* <CheckBoxGrid onClick={closeToday}>
          <input type="checkbox" checked={checked} onChange={closeToday} />
          <Label fontSize="12px" margin="0 0 0 5px" color="#fff" cursor="true">
            오늘 하루 보지 않기
          </Label>
        </CheckBoxGrid> */}
        <Grid justify="space-between" padding="30px 24px">
          <BannerContent>
            서비스 사용 후 의견을 남겨주시면 스타벅스 <Span>아메리카노</Span> ☕
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
  @media (max-width: 415px) {
    font-size: 13px;
  }
`;
const Span = styled.span`
  color: #51d787;
`;
// const CheckBoxGrid = styled.div`
//   display: flex;
//   position: absolute;
//   bottom: 8px;
//   left: 20px;
//   cursor: pointer;
// `;
export default Banner;
