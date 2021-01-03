export const INFO_SHOW_MESSAGE = "info_show_message";
export const INFO_CLOSE_PANEL = "info_close_panel";

export function infoClosePanel() {
  return function (dispatch) {
    dispatch({
      type: INFO_CLOSE_PANEL,
      payload: {},
    });
  };
}
