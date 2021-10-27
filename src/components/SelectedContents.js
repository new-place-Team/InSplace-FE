import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Button } from '../elements';

const SelectedContents = props => {
  const testProps = {
    title: '나와 함께할 사람들은',
    gridNum: 2, // test
    list: [
      { num: '1명' },
      { num: '2명' },
      { num: '4명 미만 123123123' },
      { num: '4명 이상' },
    ],
  };

  return (
    <SelectedContent>
      <Text fontSize="20px" bold>
        {testProps.title}
      </Text>
      <SelectedGrid gridNum={testProps.gridNum}>
        {testProps.list.map((item, idx) => {
          return (
            <React.Fragment key={`selected-${item.num}`}>
              <Grid margin="10px 10px 0 0">
                <Button type="type" width="auto">
                  {item.num}
                </Button>
              </Grid>
            </React.Fragment>
          );
        })}
      </SelectedGrid>
    </SelectedContent>
  );
};

const SelectedContent = styled.div`
  width: 375px;
  padding: 40px 24px;
  background-color: #e4e4e4;
`;
const SelectedGrid = styled.div`
  /* display: grid;
  grid-template-columns: ${props =>
    props.gridNum ? `repeat(${props.gridNum}, auto)` : `repeat(3, 1fr)`};
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
