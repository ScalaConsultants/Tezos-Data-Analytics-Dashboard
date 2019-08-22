import {
  BLOKCHAIN_SET_TRANSACTIONS,
  BLOKCHAIN_FLUSH_TRANSACTIONS,
  BLOKCHAIN_SET_MORE_TRANSACTIONS
} from "../actions/blokchain";
import { Block } from "../../types";

const initState: Block[] = [];

export const blocks = (state = initState, action: any): Block[] => {
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
