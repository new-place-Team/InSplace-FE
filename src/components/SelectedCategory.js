import React from 'react';
// import styled from 'styled-components';
import { Grid, Button, Text } from '../elements';

const SelectedCategory = () => {
  return (
    <>
      <Grid padding=" 24px" isFlex>
        <Button margin="0 8px 8px 0" type="tag" bg="#F0F0F0">
          두명
        </Button>
        <Button margin="0 8px 8px 0" type="tag" bg="#F0F0F0">
          커플
        </Button>
        <Button margin="0 8px 8px 0" type="tag" bg="#F0F0F0">
          데이트
        </Button>
        <Button margin="0 8px 8px 0" type="tag" bg="#F0F0F0">
          데이트
        </Button>
      </Grid>
    </>
  );
};

export default SelectedCategory;
