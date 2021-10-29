/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';

const SelectedContents = props => {
  const { title, state, type, list, setState } = props;
  // const buttonRef = React.useRef();

  const selectedBtn = (text, type, value) => {
    console.log('click', text, type, value);
    if (type === 'MemberCnt') {
      setState({ ...state, MemberCnt: { selected: text, value } });
    } else if (type === 'gender') {
      setState({ ...state, gender: { selected: text, value } });
    } else {
      setState({ ...state, category: { selected: text, value } });
    }
  };

  return (
    <SelectedContent>
      <Text fontSize="20px" bold>
        {title}
      </Text>
      <SelectedGrid>
        {list.map((item, idx) => {
          return (
            <React.Fragment key={`selected-${item.selected}`}>
              <Grid margin="10px 10px 0 0">
                <SelectedButton
                  type="type"
                  width="auto"
                  value={item.selected}
                  keys={item.value}
                  onClick={() => selectedBtn(item.selected, type, item.value)}
                >
                  {item.selected}
                </SelectedButton>
              </Grid>
            </React.Fragment>
          );
        })}
      </SelectedGrid>
    </SelectedContent>
  );
};

SelectedContents.defaultProps = {
  title: '',
  list: [],
};

const SelectedContent = styled.div`
  width: 100%;
  padding: 45px 24px;
  background-color: #e4e4e4;
  &:nth-child(2n) {
    background-color: #f0f0f0;
  }
`;
const SelectedGrid = styled.div`
  /* display: grid;
  grid-template-columns: ${props =>
    props.gridNum ? `repeat(${props.gridNum}, '300px'})` : `repeat(3, 1fr)`};
  button {
    border: 1px solid #fff;
  } */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 14px;
`;

const SelectedButton = styled.button`
  width: ${props => (props.width ? props.width : 'auto')};
  margin: ${props => props.margin};
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${props => (props.color ? props.color : '#646464')};
  background-color: ${props => (props.bg ? props.bg : `#fff`)};
  border: 1px solid #646464;
  &:focus {
    color: #fff;
    background-color: #838383;
    border: 1px solid #838383;
  }
`;
export default SelectedContents;
