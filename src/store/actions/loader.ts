export const LOADER_STATE = "LOADER_STATE";

interface ActionType {
  type: string;
  show: boolean;
}

export const LoaderState = (show: boolean): ActionType => ({
  type: LOADER_STATE,
  show: show
});
