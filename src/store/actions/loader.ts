import { LoaderActionType } from "../../types";

export const LOADER_STATE = "LOADER_STATE";

export const LoaderState = (show: boolean): LoaderActionType => ({
  type: LOADER_STATE,
  show: show
});
