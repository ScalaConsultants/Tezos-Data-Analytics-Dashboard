import React, { useEffect, useState } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";

import BarChart from "../../components/charts/Bar/Bar";
import DoughnutChart from "../../components/charts/Doughnut/Doughnut";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as LoaderActions from "../../store/actions/loader";

import { Blockchain, EventTarget, Block } from './types';
import { convertTimeStampToHour, convertTimeStamp, getDayTime, selectWhichDayTime, convertDateArray } from './helpers';

const mapState = (state: Blockchain): Blockchain => ({
  blokchain: state.blokchain
});

const Charts = () => {
  const dispatch = useDispatch();
  const { blokchain } = useMappedState(mapState);
  const [dateFrom, setDateFrom] = useState("2019-07-25");
  const [dateTo, setDateTo] = useState("2019-08-15");
  const [label, setLabel] = useState([
    "19-04-2019",
    "20-04-2019",
    "21-04-2019",
    "22-04-2019"
  ]);
  const [data, setData] = useState([10, 20, 30, 40]);
  const [config, setConfig] = useState({
    chartType: "transactions",
    label: "Transactions",
    title: "Amount of transactions per day"
  });
  const [select, setSelect] = useState("transactions");
  const [donutData, setDonutData] = useState([10, 40, 80, 200]);

  const filterChart = (blokchain: Array<Block>, chartType: string): void => {
    const dateArray = convertDateArray(dateFrom, dateTo);
    setLabel(dateArray);

    const chainArray: Array<number> = [];
    let donutArray: Array<number> = [0, 0, 0, 0];

    dateArray.forEach((dateStamp: string) => {
      let elements:number = 0;
      let tempArray: Array<number> = [];
      let previousEl:number = 0;
      blokchain.forEach((item: Block) => {
        const timeStampConverted = convertTimeStamp(item.timestamp);
        const timeStampHours = convertTimeStampToHour(item.timestamp);
        const dayTime = getDayTime(timeStampHours);

        if (timeStampConverted === dateStamp) {
          switch (chartType) {
            case "transactions":
              elements++;
              donutArray = selectWhichDayTime(
                dayTime,
                donutArray,
                item,
                config
              );
              break;
            case "selers":
              if (item.source !== previousEl) {
                tempArray.push(item.source);
                previousEl = item.source;
                donutArray = selectWhichDayTime(
                  dayTime,
                  donutArray,
                  item,
                  config
                );
              }
              elements = tempArray.length;

              break;
            case "buyers":
              if (item.destination !== previousEl) {
                tempArray.push(item.destination);
                previousEl = item.destination;
                donutArray = selectWhichDayTime(
                  dayTime,
                  donutArray,
                  item,
                  config
                );
              }
              elements = tempArray.length;

              break;
            case "currency":
              elements += item.amount;
              donutArray = selectWhichDayTime(
                dayTime,
                donutArray,
                item,
                config
              );

              break;
            default:
          }
        }
      });
      chainArray.push(elements);
    });
    setData(chainArray);
    setDonutData(donutArray);
    setLoaderFalse();
  };

  const triggerSetDateFrom = (e: EventTarget): void => {
    setDateFrom(e.target.value);
  };

  const triggerSetDateTo = (e: EventTarget): void => {
    setDateTo(e.target.value);
  };

  const setLoaderFalse = (): void => {
    dispatch({
      type: 'LOADER_STATE',
      show: false
    });
  };

  const setLoaderTrue = (): void => {
    dispatch({
      type: 'LOADER_STATE',
      show: true
    });
  };

  const handleChartChange = (e: any): void => {
    setLoaderTrue();

    setSelect(e.target.value);
    switch (e.target.value) {
      case "transactions":
        setConfig({
          chartType: "transactions",
          label: "Transactions",
          title: "Amount of transactions per day"
        });

        break;
      case "selers":
        setConfig({
          chartType: "selers",
          label: "Selers",
          title: "Amount of sellers per day"
        });
        break;
      case "buyers":
        setConfig({
          chartType: "buyers",
          label: "Buyers",
          title: "Amount of buyers per day"
        });
        break;
      case "currency":
        setConfig({
          chartType: "currency",
          label: "Currency",
          title: "Amount of currency sold per day"
        });
        break;
      default:
    }
  };

  useEffect(() => {
    filterChart(blokchain, config.chartType);
  }, [dateTo, dateFrom, config, blokchain]);

  const chartBarData = {
    labels: label,
    datasets: [
      {
        label: config.label,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: data
      }
    ]
  };

  const chartDoughnutData = {
    labels: ["Morning", "Night", "Evening", "Afternoon"],
    datasets: [
      {
        data: donutData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#a9fcff"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#a9fcff"]
      }
    ]
  };

  return (
    <>
      <div>
        <div style={{ marginBottom: "30px", marginTop: "30px" }}>
          <TextField
            id="date"
            label="Date From"
            type="date"
            name="dateFrom"
            onChange={e => triggerSetDateFrom(e)}
            defaultValue="2019-07-25"
            style={{ width: "33%" }}
          />
          <TextField
            id="date"
            label="Date To"
            type="date"
            name="dateTo"
            defaultValue="2019-08-15"
            onChange={e => triggerSetDateTo(e)}
            style={{ width: "33%" }}
          />
          <FormControl style={{ width: "33%" }}>
            <InputLabel>Select chart</InputLabel>
            <Select value={select} onChange={(e) => {
              setTimeout(() => handleChartChange(e), 100);
            }
            }>
              <MenuItem value="transactions">Transactions</MenuItem>
              <MenuItem value="currency">Currency</MenuItem>
              <MenuItem value="buyers">Buyers</MenuItem>
              <MenuItem value="selers">Sellers</MenuItem>
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
        <DoughnutChart data={chartDoughnutData} />
      </div>
    </>
  );
};

export default Charts;
