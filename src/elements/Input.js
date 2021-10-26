/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Input = props => {
  const { margin, label, type, name, value, _onChange, placeholder } = props;
  const styles = {
    margin,
  };
  return (
    <>
      <DefaultInput
        id={label}
        type={type}
        name={name}
        value={value}
        onChange={_onChange}
        placeholder={placeholder}
        {...styles}
      />
    </>
  );
};

Input.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  value: '',
  _onChange: () => {},
  placeholder: '텍스트를 입력해주세요',
};

const DefaultInput = styled.input`
  width: 100%;
  ${props => (props.margin ? `margin:${props.margin}` : '')};
  border: none;
  border-bottom: 1px solid #212121;
  box-sizing: border-box;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export default Input;
