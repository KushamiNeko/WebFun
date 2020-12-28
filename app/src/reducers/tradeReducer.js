import {
  TRADE_SHOW_PANEL,
  TRADE_START_WORKING,
  TRADE_FINISH_WORKING,
} from "../actions/tradeActions";

const initialState = {
  showPanel: false,

  isWorking: false,
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

    default:
      return state;
  }
}
