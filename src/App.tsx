import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router/routes";
import MenuAppBar from "./components/menuAppBar/MenuAppBar";
import { useDispatch } from "redux-react-hook";
import * as BlokchainActions from "./store/actions/blokchain";
import "./App.css";

const fetchMoreIntervalSeconds = 10;

const App = (): React.ReactElement => {
  const dispatch = useDispatch();

  useEffect((): void => {
    // Fetch initial blockchain e.g. 50k
    const fetchTransactions = (): void => {
      dispatch({
        type: BlokchainActions.BLOKCHAIN_FETCH_TRANSACTIONS
      });
    };

    // Fetch more transactions every specified amount of time
    const fetchMoreTransactions = (): void => {
      dispatch({
        type: BlokchainActions.BLOKCHAIN_FETCH_MORE_TRANSACTIONS
      });
    };

    fetchTransactions();
    setInterval(fetchMoreTransactions, 1000 * fetchMoreIntervalSeconds);
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <MenuAppBar />
        <Routes />
      </Router>
    </div>
  );
};

export default App;
