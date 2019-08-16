import { put, call, select } from "redux-saga/effects";
import {
  ConseilDataClient,
  ConseilOperator,
  ConseilQueryBuilder,
  ConseilSortDirection
} from "conseiljs";
import apiConfig from "./api-config";

import * as blokchainActions from "../actions/blokchain";
import { Block } from "../../types";

const consecutiveFetchAmount = 100;

function getLastTransaction(state: any): Block {
  return state.blokchain.blocks[state.blokchain.blocks.length - 1];
}

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
    apiConfig.conseilServerInfo,
    apiConfig.platform,
    apiConfig.network,
    apiConfig.entity,
    transactionQuery
  );
  const transactions = result.sort(
    (a: any, b: any): number => a.timestamp - b.timestamp
  );

  return transactions;
};

export function* doFetchMoreTransactions(): any {
  const lastTransactionFromState = yield select(getLastTransaction);
  console.log(lastTransactionFromState);

  const response = yield call(fetchMoreTransactionsRequest);

  // Compare timestamps and blockchain_level of the last transaction in current state to the transactions received from api
  const sortedTransactions = response.sort(
    (a: Block, b: Block): number => a.timestamp - b.timestamp // From oldest to newest
  );
  const startIndex = sortedTransactions.findIndex(
    (st: Block): boolean => st.timestamp > lastTransactionFromState.timestamp
  );

  // If api returned newer transactions
  if (startIndex !== -1) {
    const newTransactions = sortedTransactions.slice(
      startIndex,
      consecutiveFetchAmount
    );
    console.log(`Found ${newTransactions.length} new transactions.`);
    console.log(newTransactions);
    yield put(blokchainActions.BlokchainSetMoreTransactions(newTransactions));
  } else {
    console.log("There were no new transactions.");
  }
}
