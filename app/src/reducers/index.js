import { combineReducers } from "redux";
import symbolsReducer from "./symbolsReducer";
import chartReducer from "./chartReducer";

export default combineReducers({
  symbols: symbolsReducer,
  chart: chartReducer,
});
