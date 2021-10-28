/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import SelectedContents from '../components/SelectedContents';
import { Container } from '../elements/index';

const SelectedType = () => {
  return (
    <Container>
      <SelectedContents />
      <SelectedContents />
      <SelectedContents />
    </Container>
  );
};

export default SelectedType;
