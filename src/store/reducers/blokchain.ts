import {
  BLOKCHAIN_SET_TRANSACTIONS,
  BLOKCHAIN_FLUSH_TRANSACTIONS
} from '../actions/blokchain'

const initState: Array<any> = [];

export const blokchain = (state = initState, action: any) => {
    switch (action.type) {
      case BLOKCHAIN_FLUSH_TRANSACTIONS:
        return initState;
      case BLOKCHAIN_SET_TRANSACTIONS:
        return action.transactions;
      default:
        return state;
    }
};
