/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Button } from '../elements';

const SelectedContents = props => {
  const { title, grid, state, type, list, setState } = props;
  // const buttonRef = React.useRef();

  const onClick = (value, type, idx) => {
    if (type === 'MemberCnt') {
      setState({ ...state, MemberCnt: value });
    } else if (type === 'gender') {
      setState({ ...state, gender: value });
    } else {
      setState({ ...state, category: value });
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
                <Button
                  type="type"
                  width="auto"
                  value={state.keys}
                  keys={state.keys}
                  _onClick={() => onClick(item.selected, type, idx)}
                >
                  {item.selected}
                </Button>
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
export default SelectedContents;
