import { RootState } from "../../store";

export const errormessageSelector = (state: RootState) => state.toast.errorMessage;
export const successMessagSelector = (state: RootState) => state.toast.successMessage;
export const infoMessageSelector = (state:RootState) => state.toast.infoMessage;
export const warnMessageSelector= (state: RootState) => state.toast.warnMessage;