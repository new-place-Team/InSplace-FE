/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Grid, Image, Text } from '../elements/index';

const ListCard = props => {
  const { type, title, likeCnt, address, category } = props;

  const styles = {
    width: `${type}` === 'detail' ? '246px' : '158px',
    height: `${type}` === 'detail' ? '406px' : '294px',
    imgHeight: `${type}` === 'detail' ? '306px' : '196px',
  };
  console.log(type, styles);

  /* 메인 카드 */
  if (type === 'main') {
    return (
      <>
        <Grid width="247px" height="382px">
          <Image />
          <Tag>
            <Text color="#fff" fontSize="14px">
              {category}
            </Text>
          </Tag>
        </Grid>
        <Grid margin="16px 0 0 0">
          <Text fontSize="16px" color="#272727" bold>
            {title}
          </Text>
        </Grid>
        <Grid margin="6px 0 0 0" isFlex>
          <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
            ♥︎{likeCnt}
          </Text>
          <Text fontSize="14px" color="#646464">
            {address}
          </Text>
        </Grid>
      </>
    );
  }

  return (
    <Grid width={styles.width} height={styles.height} isFlex direction="column">
      <Image type="bg" width={styles.width} height={styles.imgHeight} />
      <Grid margin="12px 0 0 0">
        <Text fontSize="14px" color="#646464">
          {category}
        </Text>
      </Grid>
      <Grid margin="2px 0 0 0">
        <Text fontSize="16px" color="#272727">
          {title}
        </Text>
      </Grid>
      <Grid margin="6px 0 0 0" isFlex>
        <Text fontSize="14px" color="#646464">
          {address}
        </Text>
      </Grid>
      <Grid margin="5px 0 0 0" isFlex>
        <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
          ♥︎{likeCnt}
        </Text>
      </Grid>
    </Grid>
  );
};

ListCard.defaultProps = {
  type: 'list',
  title: '상호명을 적어주세요.',
  likeCnt: 3,
  address: '강남구|역삼동',
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
