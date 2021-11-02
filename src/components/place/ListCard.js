/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { Grid, Image, Text } from '../../elements/index';
import { heartFilled } from '../../images/index';
import { getCategoryText } from '../../shared/transferText';
import { history } from '../../redux/configureStore';

const ListCard = props => {
  const { type, title, likeCnt, address, category, src, info } = props;

  // 각 포스트에 해당하는 id (props로 받아옴)
  const postId = info && info.post_id;

  // 디테일 페이지로 이동
  const gotoDetail = () => {
    history.push(`/place/detail/${postId}`);
  };

  /* 메인 카드 */
  if (type === 'main') {
    return (
      <>
        <Grid _onClick={gotoDetail}>
          <Image width="237px" height="320px" src={info && info.post_images} />
          <Tag>
            <Text color="#fff" fontSize="14px">
              {info && getCategoryText(info.category_id)}
            </Text>
          </Tag>
        </Grid>
        <Grid margin="16px 0 0 0">
          <Text fontSize="16px" color="#272727" bold>
            {info && info.title}
          </Text>
        </Grid>
        <Grid margin="6px 0 0 0" isFlex width="100%">
          <Grid width="15px" height="16px" margin="0 4px 0 0">
            <Image src={heartFilled} />
          </Grid>
          <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
            {info && info.like_cnt}
          </Text>
          <Text fontSize="14px" color="#646464">
            {info && info.address_short}
          </Text>
        </Grid>
      </>
    );
  }

  if (type === 'search') {
    return (
      <>
        <Grid width="49%" margin="0 0 32px 0" _onClick={gotoDetail}>
          <Grid height="195px">
            <Image src={src} />
          </Grid>
          <Grid margin="11px 0 0 0">
            <Text fontSize="13px" color="#949494">
              {category}
            </Text>
          </Grid>
          <Text fontSize="16px" color="#272727" bold>
            {title}
          </Text>
          <Grid margin="6px 0 0 0">
            <Text fontSize="14px" color="#646464">
              {address}
            </Text>
          </Grid>
          <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
            ♥︎{likeCnt}
          </Text>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid width="247px" height="306px" _onClick={gotoDetail}>
        <Image width="247px" height="306px" src={info && info.post_images} />
      </Grid>
      <Grid margin="16px 0 0 0">
        <Text fontSize="16px" color="#272727" bold>
          {info && info.title}
        </Text>
      </Grid>
      <Grid margin="6px 0 0 0" isFlex>
        <Grid width="15px" height="16px" margin="0 4px 0 0">
          <Image src={heartFilled} />
        </Grid>
        <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
          {info && info.like_cnt}
        </Text>
        <Text fontSize="14px" color="#646464">
          {info && info.address_short}
        </Text>
      </Grid>
    </>
  );
};

ListCard.defaultProps = {
  type: 'list',
  title: '상호명을 적어주세요.',
  likeCnt: 3,
  address: '강남구 · 역삼동',
  category: '카페',
};
const Tag = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 8px 12px;
  background-color: #000;
`;
export default ListCard;
