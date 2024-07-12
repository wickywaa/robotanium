import { yearsType, yearsArray } from "../Models/DateAndTime";

export const getYearsArray = (year1:yearsType, year2: yearsType):yearsType[] => {
  const year1Index = yearsArray.indexOf(year1);
  const year2Index = yearsArray.indexOf(year2);

  return yearsArray.slice(year1Index, year2Index+1);
};
