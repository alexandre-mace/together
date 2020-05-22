import compareAsc from 'date-fns/compareAsc'

const sortByDateAsc = (events) => {
  return events.sort((a, b) => {
    let dateA = new Date(a.date.slice(0, 19));
    let dateB = new Date(b.date.slice(0, 19));
    return compareAsc(dateA, dateB);
  })
};

export default sortByDateAsc;
