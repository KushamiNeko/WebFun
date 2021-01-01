export const ERROR_SHOW_MESSAGE = "error_show_message";
export const ERROR_CLOSE_PANEL = "error_close_panel";

export function errorClosePanel() {
  return function (dispatch) {
    dispatch({
      type: ERROR_CLOSE_PANEL,
      payload: {},
    });
  };
}
