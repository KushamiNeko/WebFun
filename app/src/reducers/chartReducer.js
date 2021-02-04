import {
  CHART_START_WORKING,
  CHART_FINISH_WORKING,
  CHART_SET_CHART_DATA,
  CHART_SET_FUNCTION,
  CHART_REFRESH,
  CHART_SYMBOL_REQUEST,
  CHART_FREQUENCY_REQUEST,
  CHART_RANGE_REQUEST,
  CHART_RECORDS_REQUEST,
  CHART_INPUTS_REQUEST,
  CHART_RANDOM_DATE_REQUEST,
  CHART_PARAMETERS_REQUEST,
  CHART_INSPECT_REQUEST,
} from "../actions/chartActions";

const initialState = {
  image: "",
  quote: {},

  isWorking: false,

  function: "",
  symbol: "",
  date: "",
  frequency: "",
  range: "",

  book: "",
  showRecords: false,

  parameters: {
    Preset: "KushamiNeko",
    CandleSticks: "true",
    MovingAverages: "true",
    //MovingAverages100: "true",
    //MovingAverages300: "true",
    Volume: "true",
    Studies: "true",
  },

  timestamp: 0,
};

export default function chartReducer(state = initialState, action) {
  const now = new Date();
  const timestamp = Math.round(now.getTime() / 1000);

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

    case CHART_REFRESH:
      return {
        ...state,
        function: "simple",
        timestamp: timestamp,
      };

    case CHART_SET_FUNCTION:
      return {
        ...state,
        function: action.payload.function,
        timestamp: timestamp,
      };

    case CHART_SYMBOL_REQUEST:
      return {
        ...state,
        function: action.payload.function,
        symbol: action.payload.symbol,
        timestamp: timestamp,
      };

    case CHART_FREQUENCY_REQUEST:
      return {
        ...state,
        function: action.payload.function,
        frequency: action.payload.frequency,
        timestamp: timestamp,
      };

    case CHART_RANGE_REQUEST:
      return {
        ...state,
        function: action.payload.function,
        range: action.payload.range,
        timestamp: timestamp,
      };

    case CHART_INPUTS_REQUEST:
      return {
        ...state,
        function: action.payload.function,
        symbol: action.payload.symbol,
        date: action.payload.date,
        frequency: action.payload.frequency,
        book: action.payload.book,
        timestamp: timestamp,
      };

    case CHART_RECORDS_REQUEST:
      return {
        ...state,
        function: action.payload.function,
        showRecords: action.payload.showRecords,
        timestamp: timestamp,
      };

    case CHART_RANDOM_DATE_REQUEST:
      return {
        ...state,
        function: action.payload.function,
        timestamp: timestamp,
      };

    case CHART_PARAMETERS_REQUEST:
      return {
        ...state,
        function: action.payload.function,
        parameters: action.payload.parameters,
        timestamp: timestamp,
      };

    case CHART_INSPECT_REQUEST:
      return {
        ...state,
        function: action.payload.function,
        timestamp: timestamp,
      };

    case CHART_SET_CHART_DATA:
      return {
        ...state,
        image: action.payload.image,
        date: action.payload.quote.date,
        range: action.payload.range,
        quote: action.payload.quote,
        isWorking: false,
      };

    default:
      return state;
  }
}
