import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  interaction: {
    intersect: false,
  },
  radius: 1,
  responsive: true,
  scales: {
    x: {
      type: 'time' as const,
      time: {
        unit: 'month' as const,
        //       //          tooltipFormat: 'EEE MMM d',
        tooltipFormat: 'MMMM d (EEEE)',
      },
    },
  },
};

export function Chart(props: { datasetIdKey: string; datasets: any[] }) {
  return (
    <Line
      datasetIdKey={props.datasetIdKey}
      data={{
        datasets: props.datasets,
      }}
      options={options}
    />
  );
}
