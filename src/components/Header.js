/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';
import { FiMap } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { Grid, Text } from '../elements/index';

const Header = props => {
  const { back, search, content, map, close, color } = props;

  return (
    <Grid width="375px" height="56px" isFlex>
      {/* 뒤로가기 */}
      {back && (
        <Icon color={color} left="24px">
          <IoIosArrowBack />
        </Icon>
      )}
      {/* 컨텐츠명 */}
      {content && (
        <ContentArea back>
          <Text color={color}>{content}</Text>
        </ContentArea>
      )}
      {/* 지도 */}
      {map && (
        <Icon color={color} right="64px">
          <FiMap />
        </Icon>
      )}
      {/* 검색 */}
      {search && (
        <Icon color={color} right="24px">
          <GrSearch />
        </Icon>
      )}
      {/* 닫기 */}
      {close && (
        <Icon color={color} right="24px">
          <CgClose />
        </Icon>
      )}
    </Grid>
  );
};

Header.defaultProps = {
  back: false,
  search: false,
  text: null,
  map: false,
  close: false,
};

const Icon = styled.div`
  cursor: pointer;
  /* color: #000; */
  font-size: 24px;
  position: absolute;
  top: 16px;
  ${props => props.left && `left:${props.left}`};
  ${props => props.right && `right:${props.right}`};
  ${props => (props.color ? `color: ${props.color}` : '#000')};
`;

const ContentArea = styled.div`
  position: absolute;
  top: 16px;
  ${props => (props.back ? `left:52px` : 'left: 24px')};
`;

export default Header;
