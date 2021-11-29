/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Label = props => {
  const {
    type,
    flex,
    margin,
    padding,
    fontSize,
    color,
    children,
    required,
    bold,
    marginBottom,
    cursor,
  } = props;
  const styles = {
    flex,
    margin,
    padding,
    fontSize,
    color,
    bold,
    required,
    marginBottom,
    cursor,
  };
  if (type === 'form') {
    return <LabelForm {...styles}>{children}</LabelForm>;
  }
  return <LabelWrap {...styles}>{children}</LabelWrap>;
};

Label.defaultProps = {
  flex: false,
  margin: '0px',
  padding: '0px',
  fontSize: `${theme.fontSize.normal}`,
  color: `${theme.color.mainColor}`,
  bold: false,
  required: false,
};

const LabelWrap = styled.label`
  ${props => props.flex && `flex:1`};
  ${props => (props.margin ? `margin:${props.margin}` : '')};
  ${props => (props.padding ? `padding:${props.padding}` : '')};
  ${props => (props.fontSize ? `font-size:${props.fontSize}` : '')};
  ${props => (props.color ? `color:${props.color}` : '')};
  font-weight: ${props => (props.bold ? `600` : `400`)};
  ${props => props.cursor && `cursor:pointer`};
`;
const LabelForm = styled.label`
  display: block;
  margin-bottom: ${({ marginBottom }) => marginBottom || '10px'};
  font-size: 13px;
  font-weight: bold;
  color: #b5b5b5;
  ${props => props.cursor && `cursor:pointer`};
  &::after {
    display: inline-block;
    ${props =>
      props.required &&
      `display: inline-block;content: '*';margin-left:2px;color: #ed5e5e;`};
  }
`;
export default Label;
