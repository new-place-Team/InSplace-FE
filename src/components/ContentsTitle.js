import React from 'react';
import { Grid, Text } from '../elements';

const ContentsTitle = props => {
  const test = {
    title: '실외에서 시원한 바람과 함께',
  };
  return (
    <Grid justify="space-between">
      <Grid>
        <Text fontSize="20px" bold>
          {test.title}
        </Text>
      </Grid>
      <Grid>🔎</Grid>
    </Grid>
  );
};

export default ContentsTitle;
