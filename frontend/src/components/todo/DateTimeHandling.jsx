var formatISO = require('date-fns/formatISO')

class DateTimeHandling {
  dateTime(dtString) {
    return formatISO(new Date(dtString));
  }
  dateOnly(dtString) {
    return formatISO(new Date(dtString), { representation: 'date' });
  }
  timeOnly(dtString) {
    return formatISO(new Date(dtString), { representation: 'time' });
  }
}

export default new DateTimeHandling();
