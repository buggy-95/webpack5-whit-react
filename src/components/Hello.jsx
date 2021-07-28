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

const cdn = 'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js';

fetch(cdn).then(res => res.text()).then(res => {
  console.log(res);
  return res;
}).then(eval)
