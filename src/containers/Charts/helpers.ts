import { Config, Block } from "../../types";

export const convertTimeStampToHour = (date: number): number => {
  const newDate = new Date(date);
  const formattedDate = newDate.getHours();
  return formattedDate;
};

export const convertTimeStamp = (date: number): string => {
  const newDate = new Date(date);
  const formattedDate =
    ("0" + newDate.getDate()).slice(-2) +
    "-" +
    ("0" + (newDate.getMonth() + 1)).slice(-2) +
    "-" +
    newDate.getFullYear();

  return formattedDate
    .split("-")
    .reverse()
    .join("-");
};

export const getDayTime = (hour: number): string => {
  if (hour >= 6 && hour <= 12) {
    return "morning";
  }
  if (hour > 12 && hour <= 18) {
    return "afternoon";
  }
  if (hour > 18 && hour <= 23) {
    return "evening";
  }
  if (hour >= 0 && hour < 6) {
    return "night";
  }

  return "";
};

export const selectWhichDayTime = (
  dayTime: string,
  array: number[],
  item: Block,
  config: Config
): number[] => {
  switch (dayTime) {
    case "morning":
      if (config.chartType === "currency") {
        array[0] += item.amount;
      } else {
        array[0]++;
      }
      break;
    case "night":
      if (config.chartType === "currency") {
        array[1] += item.amount;
      } else {
        array[1]++;
      }
      break;
    case "evening":
      if (config.chartType === "currency") {
        array[2] += item.amount;
      } else {
        array[2]++;
      }

      break;
    case "afternoon":
      if (config.chartType === "currency") {
        array[3] += item.amount;
      } else {
        array[3]++;
      }

      break;
    default:
  }

  return array;
};

export const convertDateArray = (
  dateFrom: string,
  dateTo: string
): string[] => {
  let listDate = [];
  let startDate = dateFrom.toString();
  let endDate = dateTo.toString();
  let dateMove = new Date(startDate);
  let strDate = startDate;

  while (strDate < endDate) {
    strDate = dateMove.toISOString().slice(0, 10);
    listDate.push(strDate);
    dateMove.setDate(dateMove.getDate() + 1);
  }

  return listDate;
};

export const getDate = (days:any):string => {
  const date = new Date();
  const last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
  const data = last.toJSON().slice(0,10).replace(/-/g,'-');
  return data.toString();
};