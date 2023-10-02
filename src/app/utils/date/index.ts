import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const convertDate = (value: string) => {
  const date = new Date(value);
  return `${format(date, 'dd MMMM yyyy HH:mma', { locale: id })}`
}

export default convertDate;