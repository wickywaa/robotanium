import { database } from "../firebase/UserFirebase";
import { yearsArray, yearsType, monthsArray, monthsType } from "../Models";
import { getMonthsArray, getYearsArray, getFinalGamesArray } from "../utils";
import { ref, get, set, push, getDatabase, onValue, update } from "firebase/database";

export const firebaseuserService = {
  getGames: (year1: yearsType, year2: yearsType, month1: monthsType, month2: monthsType) => {
    console.log(getFinalGamesArray(year1, year2, month1, month2));
  },
};
