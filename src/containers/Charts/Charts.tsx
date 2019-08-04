import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import * as BlokchainActions from "../../store/actions/blokchain";
import BarChart from "../../components/charts/Bar/Bar";
import DoughnutChart from "../../components/charts/Doughnut/Doughnut";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const mapState = (state: any) => ({
  blokchain: state.blokchain
});


const convertTimeStampToHour = (date: any) => {
  const newDate = new Date(date);
  const formattedDate = newDate.getHours();
  return formattedDate;
}

const convertTimeStamp = (date: any) => {
  const newDate = new Date(date);
  const formattedDate =
    ('0' + newDate.getDate())
      .slice(-2) + '-' + ('0' + (newDate.getMonth() + 1))
        .slice(-2) + '-' + newDate.getFullYear();

  return formattedDate.split("-").reverse().join("-");;
}

const getDayTime = (hour: any) => {
  if (hour > 6 && hour < 12) {
    return 'morning';
  }
  if (hour > 12 && hour < 18) {
    return 'afternoon';
  }
  if (hour > 18 && hour < 24) {
    return 'afternoon';
  }
  if (hour > 0 && hour < 6) {
    return 'night';
  }
}

const selectWhichDayTime = (dayTime: any, array: any) => {
  switch (dayTime) {
    case 'morning':
      array[0]++;
      break;
    case 'night':
      array[1]++;
      break;
    case 'evening':
      array[2]++;

      break;
    case 'afternoon':
      array[3]++;

      break;
    default:
  }

  return array;
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
  const [config, setConfig] = useState({
    chartType: 'transactions',
    label: 'Transactions',
    title: 'Amount of transactions per day'
  });
  const [select, setSelect] = useState('Select chart');
  const [donutData, setDonutData] = useState([10, 40, 80, 200])


  const filterChart = (blokchain: any, chartType: string) => {
    const dateArray = convertDateArray(dateFrom, dateTo);
    setLabel(dateArray);

    const chainArray: any = [];
    let donutArray: any = [0,0,0,0];

    dateArray.forEach((dateStamp: any) => {
      let elements = 0;
      let tempArray = [];
      let previousEl = 0;
      blokchain.forEach((item: any) => {
        const timeStampConverted = convertTimeStamp(item.timestamp);
        const timeStampHours = convertTimeStampToHour(item.timestamp);
        const dayTime = getDayTime(timeStampHours);

        if (timeStampConverted == dateStamp) {
          switch (chartType) {
            case 'transactions':
              elements++;
              donutArray = selectWhichDayTime(dayTime, donutArray);
              break;
            case 'selers':
              if (item.source !== previousEl) {
                tempArray.push(item.source);
                previousEl = item.source;
                donutArray = selectWhichDayTime(dayTime, donutArray);
              }
              elements = tempArray.length;

              break;
            case 'buyers':
              if (item.destination !== previousEl) {
                tempArray.push(item.destination);
                previousEl = item.destination;
                donutArray = selectWhichDayTime(dayTime, donutArray);
              }
              elements = tempArray.length;

              break;
            case 'currency':
              elements += item.amount;
              donutArray = selectWhichDayTime(dayTime, donutArray);

              break;
            default:
          }
        }
      })
      chainArray.push(elements);
    });
    setData(chainArray);
    setDonutData(donutArray);
  }

  const triggerSetDateFrom = (e: any) => {
    setDateFrom(e.target.value);
  }

  const triggerSetDateTo = (e: any) => {
    setDateTo(e.target.value);
  }

  const handleChartChange = (e: any) => {
    setSelect(e.target.value)
    switch (e.target.value) {
      case 'transactions':
        setConfig({
          chartType: 'transactions',
          label: 'Transactions',
          title: 'Amount of transactions per day'
        });

        break;
      case 'selers':
        setConfig({
          chartType: 'selers',
          label: 'Selers',
          title: 'Amount of selers per day'
        });
        break;
      case 'buyers':
        setConfig({
          chartType: 'buyers',
          label: 'Buyers',
          title: 'Amount of buyers per day'
        });
        break;
      case 'currency':
        setConfig({
          chartType: 'currency',
          label: 'Currency',
          title: 'Amount of currency sold per day'
        });
        break;
      default:
    }
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
    filterChart(blokchain, config.chartType);

  }, [dateTo, dateFrom, config]);



  const chartBarData = {
    labels: label,
    datasets: [
      {
        label: config.label,
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
      'Morning',
      'Night',
      'Evening',
      'Afternoon',
    ],
    datasets: [{
      data: donutData,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#a9fcff',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#a9fcff',
      ]
    }]
  };


  return (
    <div>
      <div style={{ marginBottom: '30px', marginTop: '30px' }}>
        <TextField
          id="date"
          label="Date From"
          type="date"
          name="dateFrom"
          onChange={(e) => triggerSetDateFrom(e)}
          defaultValue="2019-08-01"
          style={{ width: '33%' }}
        />
        <TextField
          id="date"
          label="Date To"
          type="date"
          name="dateTo"
          defaultValue="2019-08-15"
          onChange={(e) => triggerSetDateTo(e)}
          style={{ width: '33%', }}
        />
        <FormControl style={{ width: '33%' }}>
          <InputLabel>Select chart</InputLabel>
          <Select
            value={select}
            onChange={(e) => handleChartChange(e)}
          >
            <MenuItem value='transactions'>Transactions</MenuItem>
            <MenuItem value='currency'>Currency</MenuItem>
            <MenuItem value='buyers'>Buyers</MenuItem>
            <MenuItem value='selers'>Sellers</MenuItem>
          </Select>
        </FormControl>
      </div>
      <h1>{config.title}</h1>
      <BarChart
        data={chartBarData}
        width={100}
        height={100}
        options={{
          maintainAspectRatio: true
        }}

      />
      <h1>Time of day</h1>
      <DoughnutChart
        data={chartDoughnutData}
      />
    </div>
  );
};

export default Charts;
