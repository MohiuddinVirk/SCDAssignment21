import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BubbleChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'My Bubble Chart',
            data: [
              { x: 10, y: 20, r: 15 },
              { x: 30, y: 40, r: 25 },
              { x: 50, y: 30, r: 20 },
            ],
            backgroundColor: 'rgba(75,192,192,0.6)',
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

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default BubbleChart;
