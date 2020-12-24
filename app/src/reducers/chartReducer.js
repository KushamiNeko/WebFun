import {
  CHART_START_WORKING,
  CHART_FINISH_WORKING,
  CHART_SET_FUNCTION,
  CHART_SYMBOL_REQUEST,
  CHART_FREQUENCY_REQUEST,
  CHART_RECORDS_REQUEST,
  CHART_INPUTS_REQUEST,
  CHART_RANDOM_DATE_REQUEST,
  CHART_PARAMETERS_REQUEST,
  CHART_INSPECT_REQUEST,
} from "../actions/chartActions";

const initialState = {
  image: "",
  quote: {},

  //url: "",

  isWorking: false,

  func: "",
  symbol: "",
  date: "",
  freq: "",
  book: "",
  records: false,

  x: null,
  y: null,
  ax: null,
  ay: null,

  parameters: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHART_START_WORKING:
      return {
        ...state,
        isWorking: true,
      };

    case CHART_FINISH_WORKING:
      return {
        ...state,
        isWorking: false,
      };

    case CHART_SET_FUNCTION:
      return {
        ...state,
        func: action.payload.func,
      };

    case CHART_SYMBOL_REQUEST:
      return {
        ...state,
        func: action.payload.func,
        symbol: action.payload.symbol,
      };

    case CHART_FREQUENCY_REQUEST:
      return {
        ...state,
        func: action.payload.func,
        freq: action.payload.freq,
      };

    case CHART_INPUTS_REQUEST:
      return {
        ...state,
        func: action.payload.func,
        symbol: action.payload.symbol,
        date: action.payload.date,
        freq: action.payload.freq,
        book: action.payload.book,
      };

    case CHART_RECORDS_REQUEST:
      return {
        ...state,
        func: action.payload.func,
        records: action.payload.records,
      };

    case CHART_RANDOM_DATE_REQUEST:
      return {
        ...state,
        func: action.payload.func,
      };

    case CHART_PARAMETERS_REQUEST:
      return {
        ...state,
        func: action.payload.func,
        parameters: action.payload.params,
      };

    case CHART_INSPECT_REQUEST:
      return {
        ...state,
        func: action.payload.func,
        x: action.payload.x,
        y: action.payload.y,
        ax: action.payload.ax,
        ay: action.payload.ay,
      };

    default:
      return state;
  }
}
