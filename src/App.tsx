import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router/routes";
import MenuAppBar from "./components/menuAppBar/MenuAppBar";
import * as BlokchainActions from "./store/actions/blokchain";
import { useDispatch, useMappedState } from 'redux-react-hook';
import "./App.css";
import Loader from "./components/loader/Loader";

// const fetchMoreIntervalSeconds = 10;

const mapState = (state: any) => ({
  blokchain: state.blokchain,
  loader: state.loader
});

const App = (): React.ReactElement => {

  const { blokchain, loader } = useMappedState(mapState);

  const dispatch = useDispatch();
  let dep = 0;
  useEffect((): void => {
    // Fetch initial blockchain e.g. 50k
    if (blokchain.length) return;

    const fetchTransactions = (): void => {
      dispatch({
        type: BlokchainActions.BLOKCHAIN_FETCH_TRANSACTIONS
      });
    };

    // Fetch more transactions every specified amount of time
    // const fetchMoreTransactions = (): void => {
    //   dispatch({
    //     type: BlokchainActions.BLOKCHAIN_FETCH_MORE_TRANSACTIONS
    //   });
    // };

    fetchTransactions();
    // setInterval(fetchMoreTransactions, 1000 * fetchMoreIntervalSeconds);
  }, [dep]);

  return (
    <div className="App">
      <Router>
        <MenuAppBar />
        <Routes />
        {loader ? <Loader /> : null}
      </Router>
    </div>
  );
};

export default App;
