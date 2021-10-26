/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Textarea = props => {
  const { margin, name, _onChange, placeholder, color } = props;
  const styles = { margin, color };

  return (
    <>
      <DefaultTextarea
        name={name}
        rows={5}
        onChange={_onChange}
        placeholder={placeholder}
        {...styles}
      />
    </>
  );
};

Textarea.defaultProps = {
  margin: false,
  _onChange: () => {},
  placeholder: '텍스트를 입력해주세요',
  color: `${theme.color.mainColor}`,
};

const DefaultTextarea = styled.textarea`
  width: 100%;
  ${props => (props.margin ? `margin:${props.margin}` : '')};
  border: none;
  box-sizing: border-box;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export default Textarea;
