import {put, call} from 'redux-saga/effects';
import * as blokchainActions from '../actions/blokchain';
import {ConseilDataClient, ConseilOperator, ConseilQueryBuilder, ConseilSortDirection} from "conseiljs";
import * as util from "util";

const conseilServerInfo = {
  url: "" + process.env.REACT_APP_CONSEIL_URL,
  apiKey: "" + process.env.REACT_APP_CONSEIL_KEY
};

const platform = 'tezos';
const network = 'alphanet';
const entity = 'operations';

const fetchTransactionsRequest = async () => {
  let sendQuery = ConseilQueryBuilder.blankQuery();
  sendQuery = ConseilQueryBuilder.addFields(sendQuery, 'block_level', 'timestamp', 'source', 'destination', 'amount', 'fee', 'counter');
  sendQuery = ConseilQueryBuilder.addPredicate(sendQuery, 'kind', ConseilOperator.EQ, ['transaction'], false);
  // sendQuery = ConseilQueryBuilder.addPredicate(sendQuery, 'source', ConseilOperator.EQ, ['tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z'], false);
  sendQuery = ConseilQueryBuilder.addPredicate(sendQuery, 'status', ConseilOperator.EQ, ['applied'], false);
  sendQuery = ConseilQueryBuilder.addOrdering(sendQuery, 'block_level', ConseilSortDirection.DESC);
  sendQuery = ConseilQueryBuilder.setLimit(sendQuery, 50000);

  let receiveQuery = ConseilQueryBuilder.blankQuery();
  receiveQuery = ConseilQueryBuilder.addFields(receiveQuery, 'block_level', 'timestamp', 'source', 'destination', 'amount', 'fee', 'counter');
  receiveQuery = ConseilQueryBuilder.addPredicate(receiveQuery, 'kind', ConseilOperator.EQ, ['transaction'], false);
  // receiveQuery = ConseilQueryBuilder.addPredicate(receiveQuery, 'destination', ConseilOperator.EQ, ['tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z'], false);
  receiveQuery = ConseilQueryBuilder.addPredicate(receiveQuery, 'status', ConseilOperator.EQ, ['applied'], false);
  receiveQuery = ConseilQueryBuilder.addOrdering(receiveQuery, 'block_level', ConseilSortDirection.DESC);
  receiveQuery = ConseilQueryBuilder.setLimit(receiveQuery, 50000);

  const sendResult = await ConseilDataClient.executeEntityQuery(conseilServerInfo, platform, network, entity, sendQuery);
  const receiveResult = await ConseilDataClient.executeEntityQuery(conseilServerInfo, platform, network, entity, receiveQuery);
  const transactions = sendResult.concat(receiveResult).sort((a, b) => { return a['timestamp'] - b['timestamp'] });

  let result = `${util.inspect(transactions, false, 2, false)}`;
  return transactions;
};

const fetchTransactionsRequest0 = async () => {
  let sendQuery = ConseilQueryBuilder.blankQuery();
  sendQuery = ConseilQueryBuilder.addFields(sendQuery, 'block_level', 'timestamp', 'source', 'destination', 'amount', 'fee', 'counter');
  sendQuery = ConseilQueryBuilder.addPredicate(sendQuery, 'kind', ConseilOperator.EQ, ['transaction'], false);
  sendQuery = ConseilQueryBuilder.addPredicate(sendQuery, 'source', ConseilOperator.EQ, ['tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z'], false);
  sendQuery = ConseilQueryBuilder.addPredicate(sendQuery, 'status', ConseilOperator.EQ, ['applied'], false);
  sendQuery = ConseilQueryBuilder.addOrdering(sendQuery, 'block_level', ConseilSortDirection.DESC);
  sendQuery = ConseilQueryBuilder.setLimit(sendQuery, 100);

  let receiveQuery = ConseilQueryBuilder.blankQuery();
  receiveQuery = ConseilQueryBuilder.addFields(receiveQuery, 'block_level', 'timestamp', 'source', 'destination', 'amount', 'fee', 'counter');
  receiveQuery = ConseilQueryBuilder.addPredicate(receiveQuery, 'kind', ConseilOperator.EQ, ['transaction'], false);
  receiveQuery = ConseilQueryBuilder.addPredicate(receiveQuery, 'destination', ConseilOperator.EQ, ['tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z'], false);
  receiveQuery = ConseilQueryBuilder.addPredicate(receiveQuery, 'status', ConseilOperator.EQ, ['applied'], false);
  receiveQuery = ConseilQueryBuilder.addOrdering(receiveQuery, 'block_level', ConseilSortDirection.DESC);
  receiveQuery = ConseilQueryBuilder.setLimit(receiveQuery, 100);

  const sendResult = await ConseilDataClient.executeEntityQuery(conseilServerInfo, platform, network, entity, sendQuery);
  const receiveResult = await ConseilDataClient.executeEntityQuery(conseilServerInfo, platform, network, entity, receiveQuery);
  const transactions = sendResult.concat(receiveResult).sort((a, b) => { return a['timestamp'] - b['timestamp'] });

  let result = `${util.inspect(transactions, false, 2, false)}`;
  return transactions;
};

export function* doFetchTransactions() {
  const response = yield call(fetchTransactionsRequest);
  if(response) yield put(blokchainActions.BlokchainSetTransactions(response));
  else  {
    yield put(blokchainActions.BlokchainSetTransactions([]));
  }
}
