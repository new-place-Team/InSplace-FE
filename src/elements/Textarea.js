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
  } = props;
  const styles = { margin, padding, color, border };

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
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  box-sizing: border-box;
  resize: none;
  border: ${({ border }) => border};
  &:focus {
    outline: none;
  }
`;

export default Textarea;
