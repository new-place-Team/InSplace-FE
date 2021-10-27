/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Slick } from '../components/Slick';
import ListCard from '../components/ListCard';

const Main = () => {
  return (
    <>
      <h2>Main Page</h2>
      <div>
        <Slick>
          <ListCard />
          <ListCard />
          <ListCard />
          <ListCard />
          <ListCard />
        </Slick>
      </div>
    </>
  );
};

export default Main;
