import { yearsArray, yearsType, monthsArray, monthsType, yearMonth } from "../Models";
import { getYearsArray, getMonthsArray } from "./";

export const getFinalGamesArray = (year1: yearsType, year2: yearsType, month1: monthsType, month2: monthsType) => {
  const yearsArray = getYearsArray(year1, year2);

  const getFirstYearMonths = (year: yearsType, month1: monthsType, month2: monthsType): yearMonth[] => {
    const months = getMonthsArray(month1, "December").map((month) => {
      return {
        year,
        month,
      } as yearMonth;
    });

    return months;
  };

  const getYearMonthArray = (year: yearsType): yearMonth[] => {
    return monthsArray.map((month) => {
      return {
        year,
        month,
      };
    });
  };

  const getLastYearMonths = (year: yearsType, month1: monthsType, month2: monthsType): yearMonth[] => {
    const month = getMonthsArray("January", month2).map((month) => {
      return {
        year,
        month,
      } as yearMonth;
    });

    return month;
  };

  const getmiddleYears = (years: yearsType[]): yearMonth[] => {
    let newArray: yearMonth[] = [];

    years.slice(1, -1).map((year) => {
      return (newArray = [...newArray, ...getYearMonthArray(year)]);
    });

    return newArray;
  };

  if (yearsArray.length === 1) {
    return getFirstYearMonths(year1, month1, month2);
  }
  if (yearsArray.length === 2) {
    return getFirstYearMonths(year1, month1, month2).concat(getLastYearMonths(year2, month1, month2));
  }
  if (yearsArray.length >= 2) {
    return getFirstYearMonths(year1, month1, month2)
      .concat(getmiddleYears(yearsArray))
      .concat(getLastYearMonths(year2, month1, month2));
  }
};
