import React from "react";
import { Dialog } from "primereact/dialog";
import { IDataBaseGame } from "../../Models";

interface IEditGameDialog {
  onHide: () => void;
  visible: boolean;
  game: IDataBaseGame;
}

export const EditGameDialog: React.FC<IEditGameDialog> = ({ onHide, visible }) => {
  return (
    <Dialog visible={visible} onHide={onHide}>
      EditGames Dialog
    </Dialog>
  );
};
