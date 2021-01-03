import { INFO_SHOW_MESSAGE, INFO_CLOSE_PANEL } from "../actions/infoActions";

const initialState = {
  showPanel: false,
  message: "",
};

export default function infoReducer(state = initialState, action) {
  switch (action.type) {
    case INFO_SHOW_MESSAGE:
      return {
        ...state,
        showPanel: true,
        message: action.payload.message,
      };

    case INFO_CLOSE_PANEL:
      return {
        ...state,
        showPanel: false,
      };

    default:
      return state;
  }
}
