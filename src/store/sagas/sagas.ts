import {takeEvery, fork} from 'redux-saga/effects';
import * as blokchainActions from '../actions/blokchain';
import * as blokchainSagas from './blokchain';

export function* startup(): any {
  // yield fork(checkAuthenticated);
}

export default function* root() {
  yield fork(startup);
  yield takeEvery(blokchainActions.BLOKCHAIN_FETCH_TRANSACTIONS, blokchainSagas.doFetchTransactions);
}
