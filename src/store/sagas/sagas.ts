import {
  takeEvery,
  fork
} from "redux-saga/effects";
import * as blokchainActions from "../actions/blokchain";
import * as blokchainSagas from "./blokchain";
import * as blokchainIntervalSagas from "./blokchainInterval";

export function* startup(): any {
  // yield fork(checkAuthenticated);
}

export default function* root(): any {
  yield fork(startup);
  yield takeEvery(
    blokchainActions.BLOKCHAIN_FETCH_TRANSACTIONS,
    blokchainSagas.doFetchTransactions
  );
  yield takeEvery(
    blokchainActions.BLOKCHAIN_FETCH_MORE_TRANSACTIONS,
    blokchainIntervalSagas.doFetchMoreTransactions
  );
}
