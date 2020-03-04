import compareDesc from 'date-fns/compareDesc'

const sortByDateDesc = (events) => {
  return events.sort((a, b) => {
    let dateA = new Date(a.date.slice(0, 19));
    let dateB = new Date(b.date.slice(0, 19));
    return compareDesc(dateA, dateB);
  })
};

export default sortByDateDesc;
