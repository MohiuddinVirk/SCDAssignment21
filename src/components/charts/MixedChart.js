import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MixedChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            type: 'line',
            label: 'Line Dataset',
            data: [30, 40, 25, 45, 30, 35, 50],
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderWidth: 2,
            fill: true,
          },
          {
            type: 'bar',
            label: 'Bar Dataset',
            data: [50, 35, 45, 30, 40, 20, 55],
            backgroundColor: createGradient(ctx, '#4CAF50', '#2196F3'),
            borderColor: 'rgba(75,192,192,1)',
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
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default MixedChart;
