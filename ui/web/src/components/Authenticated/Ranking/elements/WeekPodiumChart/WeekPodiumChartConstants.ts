export const BAR_CHART_COLOR = '#ffb703';

export const WeekPodiumChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as 'y',
  elements: {
    bar: {
      borderWidth: 4,
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
      multiKeyBackground: BAR_CHART_COLOR,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      boxPadding: 4,
      cornerRadius: 10,
      padding: 16,
      intersect: true,
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
            borderColor: BAR_CHART_COLOR,
            backgroundColor: BAR_CHART_COLOR,
            borderWidth: 2,
            borderRadius: 2,
          };
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        drawBorder: false,
        offset: false,
        color: '#606060',
        borderDash: [3, 5],
      },
      ticks: {
        color: '#606060',
        font: {
          family: "'Roboto'",
        },
        maxTicksLimit: 5,
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: true,
      },
      ticks: {
        display: true,
        color: '#606060',
        font: {
          family: "'Roboto'",
        },
      },
    },
  },
  interaction: {
    mode: 'index' as 'index',
    axis: 'y' as 'y',
  },
};
