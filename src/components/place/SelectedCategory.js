/* eslint-disable react/prop-types */
import React from 'react';
// import styled from 'styled-components';
import { Grid, Button } from '../../elements';

const SelectedCategory = props => {
  const { tag } = props;

  return (
    <>
      <Grid isFlex margin="20px 0 40px 0">
        {tag.map(item => {
          return (
            <Button key={`tag-${item.tag}`} type="tag">
              {item.tag}
            </Button>
          );
        })}
      </Grid>
    </>
  );
};

export default SelectedCategory;
