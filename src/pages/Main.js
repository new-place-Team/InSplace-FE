/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Slick } from '../components/Slick';
import ListCard from '../components/ListCard';

const Main = () => {
  return (
    <>
      <h2>Main Page</h2>
      <Slick>
        <ListCard type="main" />
        <ListCard type="main" />
        <ListCard type="main" />
        <ListCard type="main" />
      </Slick>
    </>
  );
};

export default Main;
