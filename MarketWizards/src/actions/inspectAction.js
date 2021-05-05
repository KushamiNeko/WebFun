export const INSPECT_SET_ACTIVE = "inspect_set_active";
export const INSPECT_SET_INFO = "inspect_set_info";
export const INSPECT_SET_ANCHORS = "inspect_set_anchor";
export const INSPECT_SET_INFO_POSItiON = "inspect_set_info_position";

export function inspectSetActive(active) {
  return function (dispatch) {
    dispatch({
      type: INSPECT_SET_ACTIVE,
      payload: {
        active: active,
      },
    });
  };
}
