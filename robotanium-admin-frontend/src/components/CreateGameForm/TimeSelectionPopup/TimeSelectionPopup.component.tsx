import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { timeArray, emptyBlockedSlots, saveDuration } from "../../../Models";
import { useAppSelector, useAppDispatch } from "../../../Store/hooks";
import { bookableDatesState } from "../../../Store/Selectors";
import { requestBookableDates } from "../../../Store/Reducers/gamesReducer";
import { Button } from "primereact/button";
import "./TimeSelectionPopup.component.scss";

interface IDialog {
  visible: boolean;
  startDate: Date;
  closeDialog: () => void;
  saveDuration: (duration: saveDuration) => void;
}

export const TimeSelectionPopup: React.FC<IDialog> = ({ visible, startDate, saveDuration, closeDialog }) => {
  const dispatch = useAppDispatch();
  const bookableDates = useAppSelector(bookableDatesState);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endGameDate, setEndGameDate] = useState<string>(startDate.toDateString());
  const [endTime, setEndTime] = useState<string | null>(null);
  const [filteredTimes, setFilteredtimes] = useState<string[]>(timeArray);
  const [selectedTimes, setSelectedTimes] = useState<string[] | null>(null);
  const [duration, setDuration] = useState<number | undefined>(0);
  const blockedtimes = emptyBlockedSlots;

  const nextBlockedSlot = (indexOfStartTime: number): number | undefined => {
    let foundSlot;
    for (let i = indexOfStartTime + 1; i < timeArray.length; i++) {
      if (blockedtimes.includes(timeArray[i])) {
        foundSlot = i;
        break;
      }
    }
    return foundSlot;
  };

  const clearTimes = () => {
    setStartTime(null);
    setEndTime(null);
    setFilteredtimes(timeArray);
    setSelectedTimes(null);
    setDuration(0);
  };

  const calculateDuration = (startTime: string | null, endTime?: string) => {
    if (!startTime || !endTime) {
      return;
    }

    const indexOfStartTime = timeArray.indexOf(startTime);
    const indexofEndTime = timeArray.indexOf(endTime);
    return (indexofEndTime - indexOfStartTime) * 15;
  };

  useEffect(() => {
    dispatch(requestBookableDates({ startDate }));
  }, []);

  const handleSetEndTime = (value: string) => {
    setEndTime(value);
    if (startTime) {
      setSelectedTimes(filteredTimes.slice(filteredTimes.indexOf(startTime), filteredTimes.indexOf(value) + 1));
    }
    setDuration(calculateDuration(startTime, value));
  };

  const handleSetStartTime = (value: string) => {
    setStartTime(value);
    const startTimeIndex = timeArray.indexOf(value);
    const newFilteredTimes = timeArray.slice(startTimeIndex, nextBlockedSlot(startTimeIndex));
    setFilteredtimes(newFilteredTimes);
    setSelectedTimes([value]);
  };

  const handleClick = (value: string) => {
    if (!startTime) return handleSetStartTime(value);
    if (startTime && endTime) return clearTimes();

    handleSetEndTime(value);
  };
  const handleEndDateChange = (increment: number) => {
    if (!startTime && increment > 0) {
      return;
    }
    const date = new Date(endGameDate);
    date.setDate(date.getDate() + increment);
    setEndGameDate(date.toDateString());
  };
  const isNotValidated = () => {
    if (!startDate || !endGameDate.length || !duration || duration === undefined) {
      return true;
    }
  };
  const handleSave = () => {
    const newStartDate = startDate;
    const gameEndDate = new Date(endGameDate);
    newStartDate.setUTCHours(parseInt(startTime?.substring(0, 2) ?? "0"));
    newStartDate.setUTCMinutes(parseInt(startTime?.substring(3, 5) ?? "0"));
    newStartDate.setUTCSeconds(0);
    gameEndDate.setUTCHours(parseInt(endTime?.substring(0, 2) ?? "0"));
    gameEndDate.setUTCMinutes(parseInt(endTime?.substring(3, 5) ?? "0"));
    gameEndDate.setUTCSeconds(0);
    gameEndDate.setTime(gameEndDate.setTime(newStartDate.getTime() + (duration ? 60000 * duration : 0)));

    saveDuration({
      startDate: newStartDate,
      gameEndDate,
      duration: duration ?? 0,
    });
    closeDialog();
  };

  const headerNode = (): JSX.Element => {
    return (
      <div className="w-full">
        <Button label="Save" disabled={isNotValidated()} onClick={handleSave}></Button>
        <table className="w-full">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-4 text-center">{startDate.toDateString()}</td>
              <td className="w-4 text-center">{endGameDate}</td>
            </tr>
            <tr>
              <td className="text-center"></td>
              <td className="text-center">
                <Button
                  disabled={startDate.toDateString() === endGameDate}
                  onClick={() => handleEndDateChange(-1)}
                  label="<"
                ></Button>
                <Button disabled={!startTime} label=">" onClick={() => handleEndDateChange(1)}>
                  {}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="pt-5">
          <thead>
            <tr>
              <td className="">Start Time </td>
              <td className="pl-6">End Time </td>
              <td className="pl-6"> Duration </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pl-1 text-center">{startTime ?? "------------"}</td>
              <td className="pl-1 text-center">{endTime ?? "-----------"}</td>
              <td className="pl-6"> {duration}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Dialog visible={visible} header={headerNode()} onHide={closeDialog} style={{ width: "40vw" }}>
      <div className="flex flex-column">
        {bookableDates.map((dateArray) => {
          return (
            <div className="flex flex-column">
              {`${dateArray.date.toDateString()}`}
              {timeArray.map((item) => {
                return (
                  <Button
                    className={`mt-1 time-button ${selectedTimes?.includes(item) ? "bg-primary-reverse" : ""}`}
                    label={item}
                    disabled={dateArray.bookedSlots.includes(item) || !filteredTimes?.includes(item)}
                    onClick={(e) => handleClick(item)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </Dialog>
  );
};
