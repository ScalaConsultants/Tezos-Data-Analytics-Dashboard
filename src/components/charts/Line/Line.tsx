import React from 'react';
import {Line} from 'react-chartjs-2';

const LineChart = (data:any) => (
  <Line
    {...data}
  />
);

export default LineChart;
 