import dayjs from "dayjs";

export default {
  formatDate(value) {
    const date = dayjs(value);
    return date.format(`DD/MM/YYYY • HH:mm`);
  },
};
