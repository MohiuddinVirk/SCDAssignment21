import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GradientBarChart = ({lables,values,name}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lables,
        datasets: [
          {
            label: name,
            data: values,
            backgroundColor: createGradient(ctx,  '#3533CD','#000000'),
            borderColor: '#000000',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true },
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

export default GradientBarChart;
