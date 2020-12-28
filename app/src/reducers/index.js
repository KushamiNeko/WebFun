import { combineReducers } from "redux";
import symbolsReducer from "./symbolsReducer";
import chartReducer from "./chartReducer";
import parametersReducer from "./parametersReducer";
import tradeReducer from "./tradeReducer";

export default combineReducers({
  symbols: symbolsReducer,
  parameters: parametersReducer,
  chart: chartReducer,
  trade: tradeReducer,
});
