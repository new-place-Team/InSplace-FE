/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Grid = props => {
  const {
    justify,
    isFlex,
    flex,
    direction,
    width,
    height,
    margin,
    padding,
    bg,
    wrap,
    border,
    _onClick,
    children,
  } = props;

  const styles = {
    justify,
    isFlex,
    flex,
    direction,
    width,
    height,
    margin,
    padding,
    bg,
    wrap,
    border,
  };

  if (justify === 'space-between') {
    return (
      <BetweenGrid {...styles} onClick={_onClick}>
        {children}
      </BetweenGrid>
    );
  }

  if (justify === 'center') {
    return (
      <CenterGrid {...styles} onClick={_onClick}>
        {children}
      </CenterGrid>
    );
  }

  if (justify === 'flex-end') {
    return (
      <EndGrid {...styles} onClick={_onClick}>
        {children}
      </EndGrid>
    );
  }

  return (
    <DefaultGrid {...styles} onClick={_onClick}>
      {children}
    </DefaultGrid>
  );
};

Grid.defaultProps = {
  justify: 'flex-start',
  isFlex: false,
  flex: false,
  wrap: false,
  direction: 'row',
  width: 'auto',
  height: 'auto',
  margin: 0,
  padding: 0,
  bg: 'transparent',
  border: 'none',
};

const DefaultGrid = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  background-color: ${props => props.bg};
  border: ${props => props.border};
  position: relative;
  ${props => props.isFlex && `display:flex`};
  ${props => props.wrap && `flex-wrap:wrap`};
  box-sizing: border-box;
  ${props => (props.flex ? `flex:1` : '')};
  ${props => (props.direction ? ` flex-direction:${props.direction}` : '')};
`;
const BetweenGrid = styled.div`
  ${props =>
    props.justify
      ? `display:flex; justify-content:space-between; align-items:center`
      : ''};
  ${props => (props.flex ? `flex:1` : '')};
  ${props => (props.direction ? ` flex-direction:${props.direction}` : '')};
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  background-color: ${props => props.bg};
  border: ${props => props.border};
  ${props => props.wrap && `flex-wrap:wrap`};
`;
const CenterGrid = styled.div`
  ${props =>
    props.justify
      ? `display:flex; justify-content:center; align-items:center`
      : ''};
  ${props => (props.flex ? `flex:1` : '')};
  ${props => (props.direction ? ` flex-direction:${props.direction}` : '')};
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  background-color: ${props => props.bg};
  border: ${props => props.border};
  ${props => props.wrap && `flex-wrap:wrap`};
`;
const EndGrid = styled.div`
  ${props =>
    props.justify
      ? `display:flex; justify-content:flex-end; align-items:center`
      : ''};
  ${props => (props.flex ? `flex:1` : '')};
  ${props => (props.direction ? ` flex-direction:${props.direction}` : '')};
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  background-color: ${props => props.bg};
  border: ${props => props.border};
  ${props => props.wrap && `flex-wrap:wrap`};
`;
export default Grid;
