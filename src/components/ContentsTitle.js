/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Text } from '../elements';

const ContentsTitle = props => {
  const { title } = props;
  return (
    <Grid justify="space-between" margin="24px 0">
      <Grid>
        <Text fontSize="20px" bold>
          {title}
        </Text>
      </Grid>
      <Grid>🔎</Grid>
    </Grid>
  );
};

export default ContentsTitle;
