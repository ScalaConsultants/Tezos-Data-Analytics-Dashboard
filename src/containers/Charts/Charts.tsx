import React, { useEffect, useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import * as BlokchainActions from "../../store/actions/blokchain";
import BarChart from "../../components/charts/Bar/Bar";
import LineChart from "../../components/charts/Line/Line";
import DoughnutChart from "../../components/charts/Doughnut/Doughnut";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const mapState = (state: any) => ({
  blokchain: state.blokchain
});

const Charts = () => {
  const dispatch = useDispatch();
  const { blokchain } = useMappedState(mapState);
  const [dateFrom, setDateFrom] = useState('19-04-2019');
  const [dateTo, setDateTo] = useState('19-04-2019');


  useEffect(() => {
    const fetchTransactions = () => {
      dispatch({
        type: BlokchainActions.BLOKCHAIN_FETCH_TRANSACTIONS
      });
    };

    fetchTransactions();
  }, [dispatch]);

  const chartBarData = {
    labels: [...blokchain.slice(0, 30).map((item: any) => item.destination)],
    datasets: [
      {
        label: 'Amount',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [...blokchain.slice(0, 30).map((item: any) => item.amount)]
      }
    ]
  };

  const chartLineData = {
    labels: [...blokchain.slice(0, 30).map((item: any) => item.destination)],
    datasets: [
      {
        label: 'Fee',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [...blokchain.slice(0, 30).map((item: any) => item.amount)]
      }
    ]
  };

  const chartDoughnutData = {
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  };


  return (
    <div>
       <h1>Charts</h1>
       <div style={{marginBottom: '50px'}}>
        <TextField
          id="date"
          label="Date From"
          type="date"
          defaultValue="2017-05-24"
          style={{marginRight:'50px'}}

        />
        <TextField
          id="date"
          label="Date To"
          type="date"
          defaultValue="2017-05-24"
        />
      </div>
      <BarChart
        data={chartBarData}
        width={100}
        height={200}
        options={{
          maintainAspectRatio: false
        }}
      />
      <LineChart
        data={chartLineData}
      />
      <DoughnutChart
        data={chartDoughnutData}
      />
    </div>
  );
};

export default Charts;
