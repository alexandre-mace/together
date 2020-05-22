export default function isSameDay(date1string, date2string) {
  const date1 = new Date(date1string);
  const date2 = new Date(date2string);

  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}
