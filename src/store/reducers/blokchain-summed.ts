import {
  BLOKCHAIN_SUM_TRANSACTIONS,
  BLOKCHAIN_SET_MORE_TRANSACTIONS
} from "../actions/blokchain";
import { Block, SummedBlock } from "../../types";

const initState: SummedBlock[] = [];

export const blokchainSummed = (state = initState, action: any): any => {
  switch (action.type) {
    case BLOKCHAIN_SUM_TRANSACTIONS:
      // Loops through an entire array of blocks and sums them up
      // by owner
      const { blocks } = action.payload;
      const blocksArr = blocks.reduce((acc: any, next: any): any => {
        const foundIndex = acc.findIndex(
          (a: any): any => a.source === next.source
        );
        if (foundIndex !== -1) {
          acc[foundIndex].transactions++;
        } else {
          next.transactions = 1;
          acc.push(next);
        }

        return acc;
      }, []);

      return blocksArr.sort(
        (a: SummedBlock, b: SummedBlock): number =>
          b.transactions - a.transactions
      );

    case BLOKCHAIN_SET_MORE_TRANSACTIONS:
      const { transactions } = action;

      return transactions.reduce((acc: any, next: Block): any => {
        const foundBlockIndex = acc.findIndex(
          (b: SummedBlock): boolean => b.source === next.source
        );
        if (foundBlockIndex !== -1) {
          acc[foundBlockIndex].transactions++;
        } else {
          acc.push(next);
        }

        return acc;
      }, state);
    default:
      return state;
  }
};
