import dayjs from "dayjs";

export default {
  formatNumber(value) {
    return new Intl.NumberFormat("en-IN").format(value);
  },
  formatDate(value) {
    const date = dayjs(value);
    return date.format(`DD/MM/YYYY • HH:mm`);
  },
};
