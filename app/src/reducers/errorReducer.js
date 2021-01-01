import { ERROR_SHOW_MESSAGE, ERROR_CLOSE_PANEL } from "../actions/errorActions";

const initialState = {
  showPanel: false,
  message: "",
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_SHOW_MESSAGE:
      return {
        ...state,
        showPanel: true,
        message: action.payload.message,
      };

    case ERROR_CLOSE_PANEL:
      return {
        ...state,
        showPanel: false,
      };

    default:
      return state;
  }
}
