export const LOADER_STATE = "LOADER_STATE";

interface ActionType {
  type: string;
}

export const LoaderState = (show: any): any => ({
  type: LOADER_STATE,
  show: show
});
