import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

export default (date, dateFormat = 'dd MMMM yyyy') => {
  const result = format(
    new Date(date),
    dateFormat,
    { locale: fr },
  );
  return result;
};
