import React from 'react';
import { Container, Grid, Text, Image } from '../elements';
import mainImage from '../images/mainImage.jpg';
import logo from '../images/logo.png';
import insplaceText from '../images/insplacetext.png';

const Boarding = () => {
  return (
    <>
      <Container padding="0px">
        <Image type="bg" width="100%" height="100vh" src={mainImage}>
          <Grid padding="94px 152px 0 45px">
            <Text fontSize="22px" color="#fff" margin="0 0 12px 0">
              pick one for you
            </Text>
            <Text fontSize="28px" color="#fff" margin="0 0 53px 0">
              <strong>날씨</strong>와 어울리는
              <br /> 나만의 장소를
              <br /> 찾는다면?
            </Text>
            <Grid width="50%">
              <Image src={logo} />
              <Image src={insplaceText} />
            </Grid>
          </Grid>
        </Image>
      </Container>
    </>
  );
};

export default Boarding;
