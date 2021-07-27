import React from 'react';

const Hello = () => {
  const test = (e) => {
    e.test();
  };
  return (
    <div className="hello" onClick={test}>
      hello there~ 123
    </div>
  );
};

export default Hello;
