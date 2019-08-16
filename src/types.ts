export interface Config {
  chartType: string;
  label: string;
  title: string;
}

export interface Block {
  source: number;
  timestamp: number;
  block_leve: number;
  amount: number;
  counter: number;
  destination: number;
  fee: number;
}

export interface SummedBlock extends Block {
  transactions: number;
}

export interface Blockchain {
  blokchain: Block[];
}

export interface State {
  blokchain: {
    blocks: Block[];
  };
}

export interface EventTarget {
  target: {
    value: string;
  };
}

export interface DatePickerProps {
  label: string;
  date: Date | null;
  handleDateChange: (date: Date | null) => void;
}

export interface ActionType {
  type: string;
}

export interface FetchTransactionsAction extends ActionType {
  transactions: any[];
}

export interface LoaderActionType extends ActionType {
  type: string;
  show: boolean;
}
