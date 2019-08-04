export const BLOKCHAIN_FETCH_TRANSACTIONS = "BLOKCHAIN_FETCH_TRANSACTIONS";
export const BLOKCHAIN_FLUSH_TRANSACTIONS = "BLOKCHAIN_FLUSH_TRANSACTIONS";
export const BLOKCHAIN_SET_TRANSACTIONS = "BLOKCHAIN_SET_TRANSACTIONS";
export const BLOKCHAIN_FETCH_MORE_TRANSACTIONS =
  "BLOKCHAIN_FETCH_MORE_TRANSACTIONS";
export const BLOKCHAIN_SET_MORE_TRANSACTIONS =
  "BLOKCHAIN_SET_MORE_TRANSACTIONS";

interface ActionType {
  type: string;
}

interface FetchTransactionsAction extends ActionType {
  transactions: any[];
}

export const BlokchainFlushTransactions = (): ActionType => ({
  type: BLOKCHAIN_FLUSH_TRANSACTIONS
});

export const BlokchainFetchTransactions = (): ActionType => ({
  type: BLOKCHAIN_FETCH_TRANSACTIONS
});

export const BlokchainSetTransactions = (transactions: any): any => ({
  type: BLOKCHAIN_SET_TRANSACTIONS,
  transactions: transactions
});

export const BlokchainFetchMoreTransactions = (): ActionType => ({
  type: BLOKCHAIN_FETCH_MORE_TRANSACTIONS
});

export const BlokchainSetMoreTransactions = (transactions: any): any => ({
  type: BLOKCHAIN_SET_MORE_TRANSACTIONS,
  transactions: transactions
});
