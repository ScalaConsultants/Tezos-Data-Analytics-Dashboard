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
  let listDate = [];
  let startDate = dateFrom.toString();
  let endDate = dateTo.toString();
  let dateMove = new Date(startDate);
  let strDate = startDate;

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
  const [dateFrom, setDateFrom] = useState('2019-08-01');
  const [dateTo, setDateTo] = useState('2019-08-15');
  const [label, setLabel] = useState(['19-04-2019', '20-04-2019', '21-04-2019', '22-04-2019']);
  const [data, setData] = useState([10, 20, 30, 40]);
  let chartType = 'currency';

  const filterChart = (blokchain: any, chartType:string) => {
    const dateArray = convertDateArray(dateFrom, dateTo);
    setLabel(dateArray);

    const chainArray: any = [];
    dateArray.forEach((dateStamp: any) => {
      let elements = 0;
      let tempArray = [];
      let previousEl = 0;
      blokchain.forEach((item: any) => {
        const timeStampConverted = convertTimeStamp(item.timestamp);
        if (timeStampConverted == dateStamp) {
          switch(chartType) {
            case 'transactions':
              elements++;
              break;
            case 'selers':
              if(item.source !== previousEl) {
                tempArray.push(item.source);
                previousEl = item.source;
              }
              elements = tempArray.length;
              break;
            case 'buyers':
                if(item.destination !== previousEl) {
                  tempArray.push(item.destination);
                  previousEl = item.destination;
                }
                elements = tempArray.length;
              break;
            case 'currency':
                elements += item.amount;
              break;
            default:
          }
        }
      })
      chainArray.push(elements);
    });
    setData(chainArray);
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
    filterChart(blokchain, chartType);

  }, [dateTo, dateFrom]);

  const chartBarData = {
    labels: label,
    datasets: [
      {
        label: 'Amount',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: data
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
          defaultValue="2019-08-01"
        />
        <TextField
          id="date"
          label="Date To"
          type="date"
          name="dateTo"
          defaultValue="2019-08-15"
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
      <DoughnutChart
        data={chartDoughnutData}
      />
    </div>
  );
};

export default Charts;
