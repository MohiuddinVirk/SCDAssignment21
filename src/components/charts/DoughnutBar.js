import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GradientDoughnutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Category 1', 'Category 2', 'Category 3'],
        datasets: [
          {
            data: [30, 40, 30],
            backgroundColor: createGradient(ctx, ['#4CAF50', '#FFC107', '#2196F3']),
            borderColor: ['rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  }, []);

  const createGradient = (ctx, colors) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color);
    });
    return gradient;
  };

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default GradientDoughnutChart;
