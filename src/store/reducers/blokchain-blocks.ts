import {
  BLOKCHAIN_SET_TRANSACTIONS,
  BLOKCHAIN_FLUSH_TRANSACTIONS,
  BLOKCHAIN_SET_MORE_TRANSACTIONS
} from "../actions/blokchain";

export interface Block {
  source: string;
  timestamp: number;
  block_leve: number;
  amount: number;
  counter: number;
  destination: string;
  fee: number;
}

const initState: [] = [];

export const blocks = (state = initState, action: any): any => {
  switch (action.type) {
    case BLOKCHAIN_FLUSH_TRANSACTIONS:
      return initState;
    case BLOKCHAIN_SET_TRANSACTIONS:
      return action.transactions;
    case BLOKCHAIN_SET_MORE_TRANSACTIONS:
      return [...state, ...action.transactions];
    default:
      return state;
  }
};
