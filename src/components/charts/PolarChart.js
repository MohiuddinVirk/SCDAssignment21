import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GradientPolarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
        datasets: [
          {
            data: [30, 40, 20, 10, 50],
            backgroundColor: createGradient(ctx, ['#4CAF50', '#FFC107', '#2196F3', '#FF5733', '#9C27B0']),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 60, // Adjust the maximum scale value
          },
        },
      },
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

export default GradientPolarChart;
