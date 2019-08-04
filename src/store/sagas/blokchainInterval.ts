import { put, call, select } from "redux-saga/effects";
import {
  ConseilDataClient,
  ConseilOperator,
  ConseilQueryBuilder,
  ConseilSortDirection
} from "conseiljs";

import * as blokchainActions from "../actions/blokchain";

function getLastTransaction(state: any): any {
  return state.blokchain[state.blokchain.length - 1];
}

const conseilServerInfo = {
  url: `${process.env.REACT_APP_CONSEIL_URL}`,
  apiKey: `${process.env.REACT_APP_CONSEIL_KEY}`
};

const platform = "tezos";
const network = "alphanet";
const entity = "operations";
const consecutiveFetchAmount = 100;

const fetchMoreTransactionsRequest = async (): Promise<any> => {
  console.log("Fetching more from counselijs");

  let transactionQuery = ConseilQueryBuilder.blankQuery();
  transactionQuery = ConseilQueryBuilder.addFields(
    transactionQuery,
    "block_level",
    "timestamp",
    "source",
    "destination",
    "amount",
    "fee",
    "counter"
  );
  transactionQuery = ConseilQueryBuilder.addPredicate(
    transactionQuery,
    "kind",
    ConseilOperator.EQ,
    ["transaction"],
    false
  );
  transactionQuery = ConseilQueryBuilder.addPredicate(
    transactionQuery,
    "status",
    ConseilOperator.EQ,
    ["applied"],
    false
  );
  transactionQuery = ConseilQueryBuilder.addOrdering(
    transactionQuery,
    "block_level",
    ConseilSortDirection.DESC
  );
  transactionQuery = ConseilQueryBuilder.setLimit(
    transactionQuery,
    consecutiveFetchAmount
  );

  const result = await ConseilDataClient.executeEntityQuery(
    conseilServerInfo,
    platform,
    network,
    entity,
    transactionQuery
  );
  const transactions = result.sort(
    (a: any, b: any): number => a.timestamp - b.timestamp
  );

  return transactions;
};

export function* doFetchMoreTransactions(): any {
  const lastTransactionFromState = yield select(getLastTransaction);

  const response = yield call(fetchMoreTransactionsRequest);

  // Compare timestamps and blockchain_level of the last transaction in current state to the transactions received from api
  const sortedTransactions = response.sort(
    (a: any, b: any): number => a.timestamp - b.timestamp // From oldest to newest
  );
  const startIndex = sortedTransactions.findIndex(
    (st: any): boolean => st.timestamp > lastTransactionFromState.timestamp
  );

  // If api returned newer transactions
  if (startIndex !== -1) {
    const newTransactions = sortedTransactions.slice(
      startIndex,
      consecutiveFetchAmount
    );
    yield put(blokchainActions.BlokchainSetMoreTransactions(newTransactions));
  } else {
    console.log("There were no new transactions.");
  }
}
