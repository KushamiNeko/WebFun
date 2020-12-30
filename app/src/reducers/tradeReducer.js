import {
  TRADE_SHOW_PANEL,
  TRADE_START_WORKING,
  TRADE_FINISH_WORKING,
  TRADE_SET_BOOKS,
  TRADE_SET_STATISTIC,
  TRADE_SET_STOP_ORDERS,
} from "../actions/tradeActions";

const initialState = {
  showPanel: false,

  isWorking: false,

  stopOrders: [],

  books: [],
  statistic: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRADE_START_WORKING:
      return {
        ...state,
        isWorking: true,
      };

    case TRADE_FINISH_WORKING:
      return {
        ...state,
        isWorking: false,
      };

    case TRADE_SHOW_PANEL:
      return {
        ...state,
        showPanel: action.payload.showPanel,
      };

    case TRADE_SET_STOP_ORDERS:
      return {
        ...state,
        stopOrders: action.payload.stopOrders,
      };

    case TRADE_SET_BOOKS:
      return {
        ...state,
        books: action.payload.books,
      };

    case TRADE_SET_STATISTIC:
      return {
        ...state,
        statistic: action.payload.statistic,
      };

    default:
      return state;
  }
}
