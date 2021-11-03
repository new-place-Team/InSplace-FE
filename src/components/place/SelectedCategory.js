/* eslint-disable react/prop-types */
import React from 'react';
// import styled from 'styled-components';
import { Grid, Button } from '../../elements';

const SelectedCategory = props => {
  const { tag } = props;
  const tagList = [];
  tagList.push(tag.MemberCnt);
  tagList.push(tag.category);
  tagList.push(tag.gender);
  return (
    <>
      <Grid isFlex margin="20px 0 40px 0">
        {tagList &&
          tagList.map(item => {
            return (
              <Button key={item.value} type="tag">
                {item.selecteText}
              </Button>
            );
          })}
      </Grid>
    </>
  );
};

export default SelectedCategory;
