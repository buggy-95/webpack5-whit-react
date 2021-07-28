// import 'core-js';
// import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';

// import 'style/index.less';
// import bys from 'images/bys.jpeg';
// import Hello from 'components/Hello';

// const App = () => {
//   useEffect(() => {
//     (async () => {
//       console.log('success');
//     })();
//   }, []);
//   return (
//     <div className="test">
//       <Hello />
//       <img className="dog" src="/images/dog.jpeg" alt="dog" />
//       <br />
//       <img src={bys} alt="bys" className="dog" />
//       <div className="dog-bg"></div>
//     </div>
//   );
// };

// ReactDOM.render(
//   <App />,
//   document.getElementById('root'),
// );

// if (module.hot) {
//   module.hot.accept();
// }

new Promise(res => setTimeout(() => res('test'), 100)).then(console.log);
const a = [1, [2]].flat();
console.log(a);
