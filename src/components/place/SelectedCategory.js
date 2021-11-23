/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';
import { Grid } from '../../elements';
import { setSelectedCategory } from '../../redux/modules/placeSlice';

const SelectedCategory = props => {
  const { margin } = props;
  const dispatch = useDispatch();
  const categoryList = useSelector(state => state.place.categoryList);

  useEffect(() => {
    if (!categoryList) {
      dispatch(setSelectedCategory(history.location.search));
    }
  }, []);

  return (
    <>
      <Grid isFlex margin={margin}>
        {categoryList &&
          categoryList.map((item, idx) => {
            return (
              <React.Fragment key={`key_${idx}`}>
                <TagButton key={item.value}>{item}</TagButton>
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
