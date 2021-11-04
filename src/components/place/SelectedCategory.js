/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Grid } from '../../elements';

const SelectedCategory = props => {
  const { tag } = props;
  const tagList = [];
  tagList.push(tag.gender);
  tagList.push(tag.MemberCnt);
  tagList.push(tag.category);
  return (
    <>
      <Grid isFlex margin="20px 0 40px 0">
        {tagList &&
          tagList.map(item => {
            return (
              <React.Fragment key={`${item.selectedText}_${item.value}`}>
                <TagButton key={item.value} type="tag">
                  {item.selecteText}
                </TagButton>
              </React.Fragment>
            );
          })}
      </Grid>
    </>
  );
};

const TagButton = styled.button`
  width: auto;
  height: 30px;
  background-color: #484c51;
  color: #ffffff;
  margin-right: 8px;
  cursor: pointer;
  padding: 6px 16px;
`;

export default SelectedCategory;
