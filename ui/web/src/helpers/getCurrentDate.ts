import moment from 'moment';

export const getCurrentDate = (): string => {
  return moment(moment.now()).format('DD/MM/YYYY');
};
