/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Input = props => {
  const {
    inputType,
    margin,
    label,
    type,
    name,
    value,
    flex,
    _onChange,
    placeholder,
  } = props;
  const styles = {
    margin,
    flex,
  };

  if (inputType === 'form') {
    return (
      <FormInput
        type={type}
        name={name}
        value={value}
        onChange={_onChange}
        placeholder={placeholder}
        {...styles}
      />
    );
  }

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
  ${props => (props.flex ? `flex:${props.flex}` : '')};
  border: none;
  border-bottom: 1px solid #212121;
  box-sizing: border-box;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0 0 13px;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  border: 0;
  border-bottom: 1px solid #b5b5b5;
  &:focus {
    outline: none;
  }
`;

export default Input;
