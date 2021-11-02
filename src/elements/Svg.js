import React from 'react';
import styled from 'styled-components';

const Svg = children => {
  return <SvgImage>{children}</SvgImage>;
};

const SvgImage = styled.i`
  border: 1px solid red;
`;

export default Svg;
