import { combineReducers } from "redux";
import symbolsReducer from "./symbolsReducer";
import chartReducer from "./chartReducer";
import parametersReducer from "./parametersReducer";
//import inspectReducer from "./inspectReducer";

export default combineReducers({
  symbols: symbolsReducer,
  parameters: parametersReducer,
  chart: chartReducer,
  //inspect: inspectReducer,
});
