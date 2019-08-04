import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router/routes";
import MenuAppBar from "./components/menuAppBar/MenuAppBar";
import * as BlokchainActions from "./store/actions/blokchain";
import { useDispatch, useMappedState } from 'redux-react-hook';
import "./App.css";

const fetchMoreIntervalSeconds = 10;

const mapState = (state: any) => ({
  blokchain: state.blokchain
});


const App = (): React.ReactElement => {

  const { blokchain } = useMappedState(mapState);

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
        {blokchain.length !=0 ?
        <Routes />
        : 
        <div  style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh'}}>
          <div className='loader'></div>
        </div>
        }
      </Router>
    </div>
  );
};

export default App;
