import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const DoughnutChart = (data:any) => (
  <Doughnut
    {...data}
  />
);

export default DoughnutChart;
 