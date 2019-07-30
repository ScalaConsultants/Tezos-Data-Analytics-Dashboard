import React, {useState, useEffect} from 'react';

const Home = (props: any) => {

  const goTo = (route: any) => {
    props.history.push(route);
  };

  return (
    <div>
      <h1>Welcome!!!</h1>
      <p><a href="" onClick={() => goTo('/transactions')}>Get Transactions</a></p>
    </div>
  );
};

export default Home;
