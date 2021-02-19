var formatISO = require('date-fns/formatISO');

class DateTimeHandling {
  dateTime(dtString: string) {
    return formatISO(new Date(dtString));
  }
  dateOnly(dtString: string) {
    return formatISO(new Date(dtString), { representation: 'date' });
  }
  timeOnly(dtString: string) {
    return formatISO(new Date(dtString), { representation: 'time' });
  }
}

export default new DateTimeHandling();
