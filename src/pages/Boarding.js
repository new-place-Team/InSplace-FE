import React from 'react';
// import styled from 'styled-components';

import { Container, Image } from '../elements';
// import mainImage from '../images/mainImage.jpg';
// import logo from '../images/logo.png';
// import insplaceText from '../images/insplacetext.png';
import splashImage from '../images/splashImage.jpg';

const Boarding = () => {
  return (
    <>
      <Container padding="0px">
        <Image type="bg" width="100%" height="100vh" src={splashImage}>
          {/* <Grid padding="94px 45px 0 45px" text>
            <Text fontSize="22px" color="#fff" margin="0 0 12px 0">
              pick one for you
            </Text>
            <Text fontSize="28px" color="#fff" margin="0 0 53px 0">
              <strong>날씨</strong>와 어울리는
              <br /> 나만의 장소를
              <br /> 찾는다면?
            </Text>

            <Grid width="30%">
              <Image src={logo} />
              <Image src={insplaceText} />
            </Grid> */}
          {/* </Grid> */}
        </Image>
      </Container>
    </>
  );
};

export default Boarding;
