export const BLOKCHAIN_FETCH_TRANSACTIONS = 'BLOKCHAIN_FETCH_TRANSACTIONS';
export const BLOKCHAIN_FLUSH_TRANSACTIONS = 'BLOKCHAIN_FLUSH_TRANSACTIONS';
export const BLOKCHAIN_SET_TRANSACTIONS = 'BLOKCHAIN_SET_TRANSACTIONS';

export const BlokchainFlushTransactions = () => ({
  type: BLOKCHAIN_FLUSH_TRANSACTIONS
});

export const BlokchainFetchTransactions = () => ({
  type: BLOKCHAIN_FETCH_TRANSACTIONS
});

export const BlokchainSetTransactions = (transactions: any) => ({
  type: BLOKCHAIN_SET_TRANSACTIONS,
  transactions: transactions
});





