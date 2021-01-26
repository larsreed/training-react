class DateTimeHandling {
  dateTime(dtString) {
    var dt = new Date(dtString)
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }) + " " + dt.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  dateOnly(dtString) {
    var dt = new Date(dtString)
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  }
  timeOnly(dtString) {
    var dt = new Date(dtString)
    return dt.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
}

export default new DateTimeHandling();
