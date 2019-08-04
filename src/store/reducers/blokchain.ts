import {
  BLOKCHAIN_SET_TRANSACTIONS,
  BLOKCHAIN_FLUSH_TRANSACTIONS,
  BLOKCHAIN_SET_MORE_TRANSACTIONS
} from "../actions/blokchain";

const initState: any[] = [];

export const blokchain = (state = initState, action: any): any => {
  switch (action.type) {
    case BLOKCHAIN_FLUSH_TRANSACTIONS:
      return initState;
    case BLOKCHAIN_SET_TRANSACTIONS:
      return action.transactions;
    case BLOKCHAIN_SET_MORE_TRANSACTIONS:
      console.log(action);
      return [...state, ...action.transactions];
    default:
      return state;
  }
};
