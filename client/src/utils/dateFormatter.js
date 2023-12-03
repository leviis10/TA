import moment from "moment";

function dateFormatter(date, format = "DD MMM YYYY") {
  return moment(date).format(format);
}

export default dateFormatter;
