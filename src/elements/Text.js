import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Text = props => {
  const {
    fontSize,
    bold,
    color,
    others,
    children,
    margin,
    textAlign,
    lineHeight,
    border,
    letterSpacing,
    type,
  } = props;

  const styles = {
    fontSize,
    bold,
    color,
    others,
    margin,
    textAlign,
    border,
    lineHeight,
    letterSpacing,
  };

  if (type === 'title16') {
    return <Title16 {...styles}>{children}</Title16>;
  }
  return (
    <>
      <ElText {...styles}>{children}</ElText>
    </>
  );
};

Text.defaultProps = {
  fontSize: `${theme.fontSize.normal}`,
  bold: false,
  color: `${theme.color.mainColor}`,
  children: '',
  others: '',
  margin: null,
  textAlign: false,
  border: false,
  lineHeight: '1.5',
  letterSpacing: 1,
};

const ElText = styled.div`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.bold};
  color: ${props => props.color};
  font-weight: ${props =>
    props.bold
      ? `${theme.fontWeight.extraBold}`
      : `${theme.fontWeight.regular}`};
  ${props => props.textAlign && `text-align: ${props.textAlign}`};
  ${props => props.others};
  ${props => (props.margin ? `margin: ${props.margin}` : '')};
  ${props => (props.border ? `border-bottom: ${props.border}` : '')};
  line-height: ${({ lineHeight }) => lineHeight || '1.5'};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '1'};
`;
const Title16 = styled.p`
  font-size: 16px;
  font-weight: ${props => (props.bold ? `600` : '400')};
  line-height: ${({ lineHeight }) => lineHeight || '22px'};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '-0.0041em'};
  color: ${({ color }) => color || '#3E4042'};
`;
export default Text;
