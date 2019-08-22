import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = (data:any) => (
  <Bar
    {...data}
  />
);

export default BarChart;
 