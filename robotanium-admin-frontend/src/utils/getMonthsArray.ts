import { monthsArray, monthsType } from "../Models/DateAndTime";

export const getMonthsArray = (month1: monthsType, month2: monthsType):monthsType[] => {
  const month1Index = monthsArray.indexOf(month1);
  const month2Index = monthsArray.indexOf(month2);

  return monthsArray.slice(month1Index, month2Index+1);
};
