import { parseISO } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';

const functName = (date: string) => {
  const timeZone = 'America/New_York'; // Handles both EST and EDT automatically

  const utcDate = parseISO(date);
  const estDate = utcToZonedTime(utcDate, timeZone);

  const formatted = format(estDate, 'MM-dd-yyyy hh:mm a');
  return formatted;
};

const someDate = '03-11-2025';
const formatted = format(new Date(someDate), 'yyyy-MM-dd');
console.log(functName(formatted.toString()));

// console.log(functName(someDate)); // 03-11-2025 12:00 AM
// const parsedDate = parseISO(new Date(someDate).toString());
// const d = functName(parsedDate.toString());
// console.log(d);


export interface User {}