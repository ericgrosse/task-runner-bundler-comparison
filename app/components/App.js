import React from 'react';
import Header from './common/Header';

const App = (props) => {
  return (
    <div>
    <Header/>
    {props.children}
    </div>
  );
}

export default App;