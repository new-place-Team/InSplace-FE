import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseCount } from '../redux/modules/counterSlice';
import { getRoomListDB } from '../redux/async/room';

const TestPage = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.count);
  const roomList = useSelector(state => state.counter.list);

  const CountUp = () => {
    dispatch(increaseCount());
  };

  React.useEffect(() => {
    dispatch(getRoomListDB());
  }, []);

  return (
    <>
      <h2>Test Page</h2>
      <h2>{counter}</h2>
      <button type="button" onClick={CountUp}>
        클릭!
      </button>
      {roomList.map((v, idx) => {
        return (
          <div key={v.locationName}>
            <h2>{v.locationName}</h2>
          </div>
        );
      })}
    </>
  );
};

export default TestPage;
