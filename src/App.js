import React, { useEffect } from 'react';
import './App.css';

function App() {
  console.log('첫 스타트! 1');
  useEffect(() => {
    console.log('2');
  }, []);
  console.log('컴포넌트 렌더링3');
  console.log('컴포넌트 렌더링4');
  return (
    <>
      <div>hello</div>
    </>
  );
}

export default App;
