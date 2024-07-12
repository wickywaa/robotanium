import { current } from "@reduxjs/toolkit";
import { IGame, bookableDates, datesArray, saveGameDTO } from "../Models";
import axios from "axios";

const mode: "dev" | "prod" = "dev";

const baseUrl = mode === "dev" ? "http://localhost:8080" : "https://rawbotz.com";

export const getDates = (startDate: Date, endDate?: Date): bookableDates[] => {
  if (!endDate) {
    const returnedDate = datesArray.find((date) => date.date === startDate) ?? {
      date: new Date("Thu May 11 2023"),
      bookedSlots: ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30", "01:45"],
    };
    return [returnedDate];
  }
  let currentDate = startDate;
  let dates = [startDate];

  while (currentDate !== endDate) {
    const date = currentDate.setDate(currentDate.getDate() + 1);
    dates.push(new Date(date));
    currentDate = startDate;
  }
  const newBookableslots: bookableDates[] = dates.map((date) => {
    return {
      date,
      bookedSlots: ["23:00", "23:15", "23:30", "23:45"],
    };
  });
  return newBookableslots;
};

export const getBookableDates = (startDate: Date, endDate?: Date): bookableDates[] => {
  return getDates(startDate, endDate ?? undefined);
};
export const getGamesList = (startDate: Date, endDate: Date) => {
  return axios
    .get(`${baseUrl}/games?fromDate=${startDate.toISOString()}&toDate=${endDate.toISOString()}`)
    .then((data) => data.data);
};
