import React from 'react';
import Button from '../elements/Button';
import Grid from '../elements/Grid';

const UI = () => {
  return (
    <Grid width="100%" padding="30px">
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
      <Grid>
        <Grid margin="50px 0 0 0" justify="space-between">
          <Button>default 버튼</Button>
          <Button type="tag">tag 버튼</Button>
          <Button type="type">type 버튼</Button>
          <Button type="rectangle">rectangle</Button>
        </Grid>
        <Grid margin="30px 0 0 0">
          <Button type="fullSizeBlack">fullSizeBlack 버튼</Button>
        </Grid>
        <Grid margin="30px 0 0 0">
          <Button type="fullSizeWhite" bg="#fff" color="#000">
            fullSize white 버튼
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UI;
