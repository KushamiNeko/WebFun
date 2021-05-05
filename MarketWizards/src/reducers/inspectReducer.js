import {
  INSPECT_SET_ACTIVE,
  INSPECT_SET_INFO,
  INSPECT_SET_ANCHORS,
  INSPECT_SET_INFO_POSItiON,
} from "../actions/inspectAction";

const initialState = {
  active: false,

  info: "",

  x: null,
  y: null,
  ax: null,
  ay: null,

  top: "",
  left: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INSPECT_SET_ACTIVE:
      return {
        ...state,
        active: action.payload.active,
      };

    case INSPECT_SET_INFO:
      return {
        ...state,
        info: action.payload.info,
      };

    case INSPECT_SET_ANCHORS:
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y,
        ax: action.payload.ax,
        ay: action.payload.ay,
      };

    case INSPECT_SET_INFO_POSItiON:
      return {
        ...state,
        top: action.payload.top,
        left: action.payload.left,
      };

    default:
      return state;
  }
}
