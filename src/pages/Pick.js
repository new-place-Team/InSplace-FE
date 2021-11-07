import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Text, Image } from '../elements';
import { heartFilled, pin } from '../images/index';

import Header from '../components/common/Header';

const Pick = () => {
  return (
    <>
      <Header _content="종완님 픽해주세요" _color="#fff" />
      <Container>
        <PickPlace>
          <Grid width="100%" isFlex justify="center">
            <Image
              src={heartFilled}
              width="22px"
              height="22px"
              margin="0 8px 1px 0"
            />
            <Text fontSize="16px">찜한곳</Text>
          </Grid>
          <Grid width="100%" isFlex justify="center">
            <Image src={pin} width="24px" height="24px" margin="0 8px 1px 0" />
            <Text fontSize="16px">가본곳</Text>
          </Grid>
        </PickPlace>
        <Grid width="100%" isFlex wrap>
          <Image
            padding="1px"
            type="bg"
            height="300px"
            width="49%"
            src="https://img.wowtv.co.kr/wowtv_news/dnrs/20210315/B20210315151659370.jpg"
          >
            <AbsoluteBox bottom="10px" left="10px">
              <Text color="#fff" fontSize="12px">
                맛집
              </Text>
              <Text color="#fff" fontSize="14px" bold>
                하남돼지집 강남역점
              </Text>
            </AbsoluteBox>
          </Image>
          <Image
            padding="1px"
            type="bg"
            height="300px"
            width="49%"
            src="https://m.upinews.kr/data/upi/image/2020/06/17/upi202006170016.jpg"
          >
            <AbsoluteBox bottom="10px" left="10px">
              <Text color="#fff" fontSize="12px">
                맛집
              </Text>
              <Text color="#fff" fontSize="14px" bold>
                하남돼지집 강남역점
              </Text>
            </AbsoluteBox>
          </Image>
          <Image
            padding="1px"
            type="bg"
            height="300px"
            width="49%"
            src="https://t1.daumcdn.net/cfile/tistory/992E014A5ED0BE7104"
          >
            <AbsoluteBox bottom="10px" left="10px">
              <Text color="#fff" fontSize="12px">
                맛집
              </Text>
              <Text color="#fff" fontSize="14px" bold>
                하남돼지집 강남역점
              </Text>
            </AbsoluteBox>
          </Image>
          <Image
            padding="1px"
            type="bg"
            height="300px"
            width="49%"
            src="https://d2qgx4jylglh9c.cloudfront.net/kr/wp-content/uploads/2018/07/namsan_015.png"
          >
            <AbsoluteBox bottom="10px" left="10px">
              <Text color="#fff" fontSize="12px">
                맛집
              </Text>
              <Text color="#fff" fontSize="14px" bold>
                하남돼지집 강남역점
              </Text>
            </AbsoluteBox>
          </Image>
          <Image
            padding="1px"
            type="bg"
            height="300px"
            width="49%"
            src="https://w.namu.la/s/2ceb50c734a752d27b67846e19a4d0c82830692576da4e9028cc58278b6b23ab07a3df76d84a15f8017dfca3940fa9a79479c00c3e7334139c49b03efdc438953894d6e8ef31882ae53b8cfde946ca1d8501edf5e8650a1038d8d114d7f1a765"
          >
            <AbsoluteBox bottom="10px" left="10px">
              <Text color="#fff" fontSize="12px">
                맛집
              </Text>
              <Text color="#fff" fontSize="14px" bold>
                하남돼지집 강남역점
              </Text>
            </AbsoluteBox>
          </Image>
          <Image
            padding="1px"
            type="bg"
            height="300px"
            width="49%"
            src="https://w.namu.la/s/2dfb1f72d0096c4671f5fb5e4bea91b1db55aa7915cd5bf55485f1cadf56e5e36bbf98dc26d1fe064c01d36d9e1a0b14106a3fccd8ba2ee58790de2dbaf2cba4fd639d75626ac6d7d8739cc331d255a7"
          >
            <AbsoluteBox bottom="10px" left="10px">
              <Text color="#fff" fontSize="12px">
                맛집
              </Text>
              <Text color="#fff" fontSize="14px" bold>
                하남돼지집 강남역점
              </Text>
            </AbsoluteBox>
          </Image>
        </Grid>
      </Container>
    </>
  );
};

const PickPlace = styled.div`
  max-width: 768px;
  height: 66px;
  margin: 0 auto;
  padding: 0 26px 0 24px;
  display: flex;
  justify-content: space-between;
`;

const AbsoluteBox = styled.div`
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  /* transform: translate(-50%, -50%); */
`;

export default Pick;
