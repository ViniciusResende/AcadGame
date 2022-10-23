export const LINE_CHART_COLOR = '#ffb703';

export const WeeklyUserChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      borderWidth: 4,
    },
    point: {
      radius: 6,
      hoverRadius: 8,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#fff',
      bodyColor: '#606060',
      bodyFont: {
        family: 'Roboto',
        size: 16,
        lineHeight: 1.5,
      },
      boxHeight: 5,
      boxWidth: 19,
      multiKeyBackground: LINE_CHART_COLOR,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      boxPadding: 4,
      cornerRadius: 10,
      padding: 16,
      intersect: false,
      titleColor: '#14213D',
      titleFont: {
        family: 'Roboto',
        size: 16,
        lineHeight: 1.5,
        weight: 'bold',
      },
      callbacks: {
        label: function (tooltipItem: any) {
          return `${tooltipItem.dataset.label}          ${tooltipItem.formattedValue}`;
        },
        labelColor: function () {
          return {
            borderColor: LINE_CHART_COLOR,
            backgroundColor: LINE_CHART_COLOR,
            borderWidth: 2,
            borderRadius: 2,
          };
        },
      },
    },
  },
  scales: {
    y: {
      grid: {
        display: true,
        drawBorder: false,
        offset: false,
        color: '#D6D6D6',
        borderDash: [3, 5],
      },
      ticks: {
        display: false,
        maxTicksLimit: 5,
      },
    },
    x: {
      grid: {
        display: false,
        borderColor: '#BFBDC0',
      },
      ticks: {
        color: '#606060',
        font: {
          family: "'Roboto'",
        },
      },
    },
  },
  interaction: {
    mode: 'index' as 'index',
    axis: 'x' as 'x',
  },
};
