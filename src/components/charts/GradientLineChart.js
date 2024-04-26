import React, { useEffect, useRef ,useState} from 'react';
import Chart from 'chart.js/auto';

const GradientLineChart = ({lables,values,name}) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: lables,
        datasets: [
          {
            label: name,
            data: values,
            borderColor: '#000000',
            backgroundColor: createGradient(ctx,  '#3533CD','#000000'),
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  const createGradient = (ctx, color1, color2) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  return (
    <div>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default GradientLineChart;
