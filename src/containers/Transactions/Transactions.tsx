import React, {useState, useEffect} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import * as BlokchainActions from "../../store/actions/blokchain";


const mapState = (state: any) => ({
  blokchain: state.blokchain
});

const Transactions = () => {
  const dispatch = useDispatch();
  const { blokchain } = useMappedState(mapState);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    dispatch({
      type: BlokchainActions.BLOKCHAIN_FETCH_TRANSACTIONS
    });
  };

  return (
    <div>
      <h1>Transactions:</h1>
      {blokchain.slice(0, 100).map((item: any, index: any) => <div key={index}>{item.timestamp} {item.source} {item.destination} </div>)}
    </div>
  );
};

export default Transactions;
