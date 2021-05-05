import { combineReducers } from "redux";
import symbolsReducer from "./symbolsReducer";
import chartReducer from "./chartReducer";
import parametersReducer from "./parametersReducer";
import tradeReducer from "./tradeReducer";
import infoReducer from "./infoReducer";

export default combineReducers({
  symbols: symbolsReducer,
  parameters: parametersReducer,
  chart: chartReducer,
  trade: tradeReducer,
  info: infoReducer,
});
