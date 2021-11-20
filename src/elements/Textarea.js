/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Textarea = props => {
  const {
    margin,
    padding,
    name,
    _onChange,
    placeholder,
    color,
    border,
    value,
    height,
    size,
  } = props;
  const styles = { margin, padding, color, border, height, size };

  return (
    <>
      <DefaultTextarea
        name={name}
        rows={5}
        onChange={_onChange}
        placeholder={placeholder}
        value={value}
        {...styles}
      />
    </>
  );
};

Textarea.defaultProps = {
  margin: false,
  padding: false,
  _onChange: () => {},
  placeholder: '텍스트를 입력해주세요',
  color: `${theme.color.mainColor}`,
};

const DefaultTextarea = styled.textarea`
  width: 100%;
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
  box-sizing: border-box;
  resize: none;
  border: ${({ border }) => border};
  letter-spacing: -0.0008em;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #a3a6aa;
    font-size: 14px;
  }
`;

export default Textarea;
