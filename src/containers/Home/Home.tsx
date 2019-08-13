import React from "react";

const Home = (): React.ReactElement => {
  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h1>Welcome to Tezos Data Analytics Dashboard</h1>
      <h2>General idea:</h2>
      <p>
        1. Technology stack: React + Typescript + Hooks + Redux + Saga +
        ConseilJS.
      </p>
      <p>
        2. We get a transaction list (25000) only once and save it to the cache.
        To reach this we created a simple 'local storage' based cache.
      </p>
      <p>
        3. Every 10 seconds we are getting a list of the latest transactions and
        add them to the cache.
      </p>
      <p>4. We are creating charts for data stored in the cache.</p>
      <p>5. Be forgiving, please - time range was limited.</p>
    </div>
  );
};

export default Home;
