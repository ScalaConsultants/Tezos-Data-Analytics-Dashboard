import React, {useState, useEffect} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import { ConseilMetadataClient, ConseilDataClient, ConseilQueryBuilder, ConseilSortDirection, ConseilOperator } from 'conseiljs'
import * as util from 'util';
import * as BlokchainActions from "../../store/actions/blokchain";
import BarChart from "../../components/charts/Bar/Bar";

const platform = 'tezos';
const network = 'alphanet';
const entity = 'operations';

const conseilServerInfo = {
  url: "" + process.env.REACT_APP_CONSEIL_URL,
  apiKey: "" + process.env.REACT_APP_CONSEIL_KEY
};

async function listEntities() {
  const platforms = await ConseilMetadataClient.getEntities(conseilServerInfo, 'tezos', 'alphanet');
  console.log(`${util.inspect(platforms, false, 2, false)}`);
}

async function listAccountTransactions() {
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

  console.log(`${util.inspect(transactions, false, 2, false)}`);
}

const mapState = (state: any) => ({
  blokchain: state.blokchain
});



const Transactions = () => {
  const dispatch = useDispatch();
  const { blokchain } = useMappedState(mapState);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    dispatch({
      type: BlokchainActions.BLOKCHAIN_FETCH_TRANSACTIONS
    });
  };

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My example chart',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  return (
    <div>
      <h1>Transactions:</h1>
      {blokchain.map((item: any, index: any) => <div key={index}>{item.source}</div>)}
      <BarChart
        data={chartData}
        width={100}
        height={200}
        options={{
        maintainAspectRatio: false
        }}
      />
    </div>
  );
};

export default Transactions;
