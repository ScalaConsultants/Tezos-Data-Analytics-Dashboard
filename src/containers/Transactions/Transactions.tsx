import React, {useState, useEffect} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import * as BlokchainActions from "../../store/actions/blokchain";
import BarChart from "../../components/charts/Bar/Bar";


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

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My example chart',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  return (
    <div>
      <h1>Transactions:</h1>
      {blokchain.slice(0, 100).map((item: any, index: any) => <div key={index}>{item.timestamp} {item.source} {item.destination} </div>)}
      <BarChart
        data={chartData}
        width={100}
        height={200}
        options={{
        maintainAspectRatio: false
        }}
      />
    </div>
  );
};

export default Transactions;
