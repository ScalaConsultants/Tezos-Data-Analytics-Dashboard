import { put, call } from "redux-saga/effects";
import {
  ConseilDataClient,
  ConseilOperator,
  ConseilQueryBuilder,
  ConseilSortDirection
} from "conseiljs";

import * as blokchainActions from "../actions/blokchain";

const conseilServerInfo = {
  url: `${process.env.REACT_APP_CONSEIL_URL}`,
  apiKey: `${process.env.REACT_APP_CONSEIL_KEY}`
};

const platform = "tezos";
const network = "alphanet";
const entity = "operations";
const initialFetchAmount = 500000;

const fetchTransactionsRequest = async (): Promise<any> => {
  console.log("fetching from counselj");

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
    initialFetchAmount
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

export function* doFetchTransactions(): any {
  const response = yield call(fetchTransactionsRequest);
  if (response) yield put(blokchainActions.BlokchainSetTransactions(response));
  else {
    yield put(blokchainActions.BlokchainSetTransactions([]));
  }
}
