import { put, call } from 'redux-saga/effects';
import {
  ConseilDataClient,
  ConseilOperator,
  ConseilQueryBuilder,
  ConseilSortDirection,
} from 'conseiljs';

import * as blokchainActions from '../actions/blokchain';
import { loadBlockchain, saveBlockchain } from '../localStorage';

const conseilServerInfo = {
  url: `${process.env.REACT_APP_CONSEIL_URL}`,
  apiKey: `${process.env.REACT_APP_CONSEIL_KEY}`,
};

const platform = 'tezos';
const network = 'alphanet';
const entity = 'operations';

const fetchTransactionsRequest = async () => {
  // Loads blockchain from localStorage
  const blockchain = loadBlockchain();
  if (blockchain) {
    return blockchain;
  }

  console.log('fetching from counselj');

  let sendQuery = ConseilQueryBuilder.blankQuery();
  sendQuery = ConseilQueryBuilder.addFields(
    sendQuery,
    'block_level',
    'timestamp',
    'source',
    'destination',
    'amount',
    'fee',
    'counter',
  );
  sendQuery = ConseilQueryBuilder.addPredicate(
    sendQuery,
    'kind',
    ConseilOperator.EQ,
    ['transaction'],
    false,
  );

  sendQuery = ConseilQueryBuilder.addPredicate(
    sendQuery,
    'status',
    ConseilOperator.EQ,
    ['applied'],
    false,
  );
  sendQuery = ConseilQueryBuilder.addOrdering(sendQuery, 'block_level', ConseilSortDirection.DESC);
  sendQuery = ConseilQueryBuilder.setLimit(sendQuery, 50000);

  let receiveQuery = ConseilQueryBuilder.blankQuery();
  receiveQuery = ConseilQueryBuilder.addFields(
    receiveQuery,
    'block_level',
    'timestamp',
    'source',
    'destination',
    'amount',
    'fee',
    'counter',
  );
  receiveQuery = ConseilQueryBuilder.addPredicate(
    receiveQuery,
    'kind',
    ConseilOperator.EQ,
    ['transaction'],
    false,
  );

  receiveQuery = ConseilQueryBuilder.addPredicate(
    receiveQuery,
    'status',
    ConseilOperator.EQ,
    ['applied'],
    false,
  );
  receiveQuery = ConseilQueryBuilder.addOrdering(
    receiveQuery,
    'block_level',
    ConseilSortDirection.DESC,
  );
  receiveQuery = ConseilQueryBuilder.setLimit(receiveQuery, 50000);

  const sendResult = await ConseilDataClient.executeEntityQuery(
    conseilServerInfo,
    platform,
    network,
    entity,
    sendQuery,
  );
  const receiveResult = await ConseilDataClient.executeEntityQuery(
    conseilServerInfo,
    platform,
    network,
    entity,
    receiveQuery,
  );
  const transactions = sendResult.concat(receiveResult).sort((a, b) => a.timestamp - b.timestamp);

  // Saves results into the localStorage
  saveBlockchain(transactions);

  return transactions;
};

export function* doFetchTransactions() {
  const response = yield call(fetchTransactionsRequest);
  if (response) yield put(blokchainActions.BlokchainSetTransactions(response));
  else {
    yield put(blokchainActions.BlokchainSetTransactions([]));
  }
}
