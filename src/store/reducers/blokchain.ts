import { combineReducers } from "redux";
import { blocks } from "./blokchain-blocks";
import { blokchainSummed } from "./blokchain-summed";

export default combineReducers({
  blocks,
  summedBlocks: blokchainSummed
});
