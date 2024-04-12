import dayjs from "dayjs";

export function dateFormat(date: Date | number | string, format: string = "YYYY-MM-DD") {
  return dayjs(date).format(format)
}

export function isBoforeByDay(date: Date|number|string, nowDate: Date = new Date()) {
  return dayjs(date).isBefore(dayjs(nowDate),"day") // 默认毫秒

}