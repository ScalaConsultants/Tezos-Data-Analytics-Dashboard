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
      <br />
      <h2>Real world ;)</h2>
      <p>1. Technology stack: React + Typescript + Hooks + Redux + Saga + ConseilJS.</p>
      <p>2. We get a transaction list from last few days(100 000 transactions) only once and save it to the Redux. Local storage was too small to keep them. We thought there is smaller amount of transactions in Tezos.</p>
      <p>3. There were some problems with getting the latest transactions from Conseil API.</p>
      <p>4. We are creating charts for data stored in the Redux.</p>
      <p>5. There were no stable possibility of getting only the latest transactions from the API, so we lost lots of time on trying to do workaround, but we failed in the time we had. Live charts updated every ten seconds was too havy for browser because of 100 000 transactions. We need more time to optimize APP for such big amount of data, so we decided to make all visualisations static. In free time we'll improove the App.</p>
    </div>
  );
};

export default Home;
