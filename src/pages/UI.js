import React from 'react';
import Grid from '../elements/Grid';

const UI = () => {
  return (
    <>
      <Grid margin="30px 0 0 0" padding="10px" bg="#f1f3f5">
        DefaultGrid
      </Grid>
      <Grid
        justify="space-between"
        margin="30px 0 0 0"
        padding="10px"
        bg="#f1f3f5"
      >
        <Grid>justify : space-between</Grid>
        <Grid>justify : space-between</Grid>
        <Grid>justify : space-between</Grid>
      </Grid>
      <Grid justify="center" margin="30px 0 0 0" padding="10px" bg="#f1f3f5">
        <Grid>justify : center</Grid>
      </Grid>
      <Grid justify="flex-end" margin="30px 0 0 0" padding="10px" bg="#f1f3f5">
        <Grid>flex-end</Grid>
      </Grid>
    </>
  );
};

export default UI;
