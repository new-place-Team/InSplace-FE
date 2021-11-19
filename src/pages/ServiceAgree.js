import React from 'react';
import { Container, Grid, Text } from '../elements';

const ServiceAgree = () => {
  return (
    <>
      <Container padding="66px 0 0 0">
        <Grid padding="0 20px">
          <Text fontSize="28px" bold margin="0 0 25px 0">
            서비스 이용을 위한
            <br /> 동의 안내
          </Text>
          <Text>
            서비스 이용에 꼭 필요한 사항입니다. 정책 및 약관을 확인해 주세요.
          </Text>
        </Grid>
      </Container>
    </>
  );
};

export default ServiceAgree;
