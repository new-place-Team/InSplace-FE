import React from 'react';
import styled from 'styled-components';
import { Grid, Button, Text } from '../elements';

const SelectedCategory = () => {
  return (
    <>
      <Grid isFlex>
        <Button padding="6px 16px" bg="F0F0F0">
          두명
        </Button>
        <Button padding="6px 16px" bg="F0F0F0">
          커플
        </Button>
        <Button padding="6px 16px" bg="F0F0F0">
          데이트
        </Button>
      </Grid>
    </>
  );
};

export default SelectedCategory;
