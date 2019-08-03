import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import * as BlokchainActions from "../../store/actions/blokchain";
import BarChart from "../../components/charts/Bar/Bar";
import LineChart from "../../components/charts/Line/Line";
import DoughnutChart from "../../components/charts/Doughnut/Doughnut";
import TextField from '@material-ui/core/TextField';

const mapState = (state: any) => ({
  blokchain: state.blokchain
});

const convertTimeStamp = (date: any) => {
  const newDate = new Date(date);
  const formattedDate =
    ('0' + newDate.getDate())
      .slice(-2) + '-' + ('0' + (newDate.getMonth() + 1))
        .slice(-2) + '-' + newDate.getFullYear();

  return formattedDate.split("-").reverse().join("-");;
}

const convertDateArray = (dateFrom: any, dateTo: any) => {
  var listDate = [];
  var startDate = dateFrom.toString();
  var endDate = dateTo.toString();
  var dateMove = new Date(startDate);
  var strDate = startDate;

  while (strDate < endDate) {
    strDate = dateMove.toISOString().slice(0, 10);
    listDate.push(strDate);
    dateMove.setDate(dateMove.getDate() + 1);
  };



  return listDate;
}

const Charts = () => {
  const dispatch = useDispatch();
  const { blokchain } = useMappedState(mapState);
  const [dateFrom, setDateFrom] = useState('2019-05-01');
  const [dateTo, setDateTo] = useState('2019-05-30');
  const [labelBar, setLabelBar] = useState(['19-04-2019', '20-04-2019', '21-04-2019', '22-04-2019']);
  const [dataBar, setDataBar] = useState([10, 20, 30, 40]);




  const filterChartBar = (blokchain: any) => {
    const dateArray = convertDateArray(dateFrom, dateTo);
    setLabelBar(dateArray);

    const chainArray:any = [];
    dateArray.forEach((dateStamp: any) => {
      let elements = 0;
      blokchain.forEach((item: any) => {
        const timeStampConverted = convertTimeStamp(item.timestamp);
        if (timeStampConverted == dateStamp) {
          elements++;
        }
      })
      chainArray.push(elements);
    });

    setDataBar(chainArray);

  }

  const triggerSetDateFrom = (e: any) => {
    setDateFrom(e.target.value);
  }

  const triggerSetDateTo = (e: any) => {
    setDateTo(e.target.value);
  }

  useEffect(() => {
    const fetchTransactions = () => {
      dispatch({
        type: BlokchainActions.BLOKCHAIN_FETCH_TRANSACTIONS
      });
    };

    fetchTransactions();
  }, [dispatch]);

  useEffect(() => {
    
    filterChartBar(blokchain);
   
  } ,[dateTo, dateFrom]);

  const chartBarData = {
    labels: labelBar,
    datasets: [
      {
        label: 'Amount',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: dataBar
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
      <div style={{ marginBottom: '50px' }}>
        <TextField
          id="date"
          label="Date From"
          type="date"
          name="dateFrom"
          onChange={(e) => triggerSetDateFrom(e)}
          defaultValue="2019-05-01"


        />
        <TextField
          id="date"
          label="Date To"
          type="date"
          name="dateTo"
          defaultValue="2019-05-30"
          onChange={(e) => triggerSetDateTo(e)}
        />
      </div>
      <BarChart
        data={chartBarData}
        width={100}
        height={100}
        options={{
          maintainAspectRatio: true
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
