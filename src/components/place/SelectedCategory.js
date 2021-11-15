/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';
import { Grid } from '../../elements';
import {
  getGenderText,
  getCategoryText,
  getPeopleText,
} from '../../shared/transferText';

const SelectedCategory = () => {
  const categoryInfo = useSelector(state => state.place.selectedCategory);
  console.log('categoryInfo', categoryInfo);
  const [tagList, setTagList] = useState([]);

  const setTagListFn = param => {
    const objList = param.replace('?', '').split('&');
    const list = objList.map(v => {
      const objArr = v.split('=');
      let text = '';
      if (objArr[0] === 'gender') {
        text = getGenderText(Number(objArr[1]));
      } else if (objArr[0] === 'num') {
        text = getPeopleText(Number(objArr[1]));
      } else if (objArr[0] === 'category') {
        text = getCategoryText(Number(objArr[1]));
      }
      return text;
    });
    list.shift();
    setTagList(list);
  };
  useEffect(() => {
    let params = '';
    if (categoryInfo) {
      params = categoryInfo;
    } else {
      params = history.location.search;
    }
    setTagListFn(params);
  }, []);

  return (
    <>
      <Grid isFlex margin="20px 0 40px 0">
        {tagList &&
          tagList.map((item, idx) => {
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
