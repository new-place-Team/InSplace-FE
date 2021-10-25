import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseCount } from '../redux/modules/counter';

const TestPage = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.count);

  const CountUp = () => {
    dispatch(increaseCount());
  };
  return (
    <>
      <h2>Test Page</h2>
      <h2>{counter}</h2>
      <button type="button" onClick={CountUp}>
        클릭!
      </button>
    </>
  );
};

export default TestPage;
