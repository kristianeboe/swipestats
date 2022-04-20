import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export function Chart(props: {
  title: string;
  datasets: {
    key: string;
    data: { x: string; y: number }[];
    label: string;
    borderColor: string;
    backgroundColor: string;
  }[];
}) {
  const chartContainer = useRef(null);
  // const [chartInstance, setChartInstance] = useState<any>(null);
  const [chartData, setChartData] = useState(props.datasets);

  const options = {
    // type: 'line' as 'line',
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'month',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: props.title,
      },
    },
  };

  console.log('chart', props.title, props);

  useEffect(() => {
    // if (chartContainer && chartContainer.current) {
    //   // @ts-ignore
    //   const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
    //   setChartInstance(newChartInstance);
    // }
    if (chartData.length !== props.datasets.length) {
      setChartData(props.datasets);
      console.log('chart data updated');
    }
  }, [props.datasets, chartData.length]);

  useEffect(() => {
    const chartConfig = {
      type: 'line' as const,
      data: {
        datasets: chartData,
      },
      options,
    };

    if (chartContainer && chartContainer.current) {
      // @ts-ignore
      new Chartjs(chartContainer.current, chartConfig);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}
