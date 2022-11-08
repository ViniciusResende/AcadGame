export const FIRST_BAR_CHART_COLOR = '#F01A1A';
export const FIRST_PLACE_LABEL_TAG = 'Primeiro';
export const MEAN_BAR_CHART_COLOR = '#ffb703';
export const MEAN_LABEL_TAG = 'Média';
export const USER_BAR_CHART_COLOR = '#0263FF';
export const USER_LABEL_TAG = 'Eu';

export const ProfileUserChartOptions = {
  // animation: {
  //   duration: 0,
  // },
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'x' as 'x',
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
      multiKeyBackground: USER_BAR_CHART_COLOR,
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
        labelColor: function (tooltipItem: any) {
          return {
            borderColor:
              tooltipItem.dataset.backgroundColor[tooltipItem.dataIndex],
            backgroundColor:
              tooltipItem.dataset.backgroundColor[tooltipItem.dataIndex],
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
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: '#606060',
        font: {
          family: "'Roboto'",
        },
      },
    },
    y: {
      grid: {
        display: true,
        drawBorder: true,
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
  },
  interaction: {
    mode: 'index' as 'index',
    axis: 'y' as 'y',
  },
};
