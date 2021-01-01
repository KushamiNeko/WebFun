import { ERROR_SHOW_MESSAGE } from "./errorActions";

export const CHART_START_WORKING = "chart_start_working";
export const CHART_FINISH_WORKING = "chart_finish_working";

export const CHART_SET_CHART_DATA = "chart_set_chart_data";
export const CHART_SET_FUNCTION = "chart_set_function";

export const CHART_REFRESH = "chart_refresh";

export const CHART_SYMBOL_REQUEST = "chart_symbol_request";
export const CHART_FREQUENCY_REQUEST = "chart_frequency_request";
export const CHART_RANGE_REQUEST = "chart_range_request";

export const CHART_RECORDS_REQUEST = "chart_records_request";
export const CHART_INPUTS_REQUEST = "chart_inputs_request";

export const CHART_RANDOM_DATE_REQUEST = "chart_random_date_request";

export const CHART_PARAMETERS_REQUEST = "chart_parameters_request";

export const CHART_INSPECT_REQUEST = "chart_inspect_request";

function chartURL(state, anchors = null) {
  const origin = `${window.location.protocol}//${window.location.hostname}:5000`;

  let url = `${origin}/service/chart`;

  url = `${url}?timestamp=${state.timestamp}`;
  url = `${url}&symbol=${state.symbol}&frequency=${state.frequency}&function=${state.function}&date=${state.date}`;
  url = `${url}&book=${state.symbol.toUpperCase()}${
    state.book
  }&records=${state.showRecords.toString()}`;

  url = `${url}&range=${state.range}`;

  if (anchors) {
    if (anchors.x != null && anchors.y != null) {
      url = `${url}&x=${anchors.x}&y=${anchors.y}`;
    }

    if (anchors.ax != null && anchors.ay != null) {
      url = `${url}&ax=${anchors.ax}&ay=${anchors.ay}`;
    }
  }

  for (const [key, value] of Object.entries(state.parameters)) {
    //let v = parametersAdjustment(key, value);
    //url = `${url}&params_${key}=${v}`;

    url = `${url}&params_${key}=${value}`;
  }

  return url;
}

export function chartInspectRequest(
  callback,
  x = null,
  y = null,
  ax = null,
  ay = null
) {
  return function (dispatch, getState) {
    const url = chartURL(getState().chart, {
      x,
      y,
      ax,
      ay,
    });

    if (getState().chart.function === "inspect") {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (Object.keys(data).includes("error")) {
            console.error(`${data["error"]}`);
            dispatch({
              type: ERROR_SHOW_MESSAGE,
              payload: {
                message: data["error"],
              },
            });
            return;
          }

          if (data["inspect"]) {
            callback(data["inspect"]);

            //dispatch({
            //type: INSPECT_SET_INFO,
            //payload: {
            //info: data["inspect"],
            //},
            //});
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: ERROR_SHOW_MESSAGE,
            payload: {
              message: error,
            },
          });
        });
    } else {
      dispatch({
        type: CHART_INSPECT_REQUEST,
        payload: {
          function: "inspect",
        },
      });
    }

    return;
  };
}

export function chartImageRequest() {
  return function (dispatch, getState) {
    if (getState().chart.isWorking) {
      return;
    }

    dispatch({
      type: CHART_START_WORKING,
    });

    const url = chartURL(getState().chart);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          console.error(`${data["error"]}`);
          dispatch({
            type: ERROR_SHOW_MESSAGE,
            payload: {
              message: data["error"],
            },
          });

          dispatch({
            type: CHART_FINISH_WORKING,
          });
          return;
        }

        if (data["img"]) {
          const image = `data:image/png;base64,${data["img"]}`;
          const { img, range, ...quote } = data;

          dispatch({
            type: CHART_SET_CHART_DATA,
            payload: {
              image: image,
              range: range,
              quote: quote,
            },
          });
          return;
        } else {
          dispatch({
            type: CHART_FINISH_WORKING,
          });
          return;
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: ERROR_SHOW_MESSAGE,
          payload: {
            message: error,
          },
        });

        dispatch({
          type: CHART_FINISH_WORKING,
        });
      });
  };
}

export function chartRefresh() {
  return function (dispatch) {
    dispatch({
      type: CHART_SET_FUNCTION,
      payload: {
        function: "simple",
      },
    });
  };
}

export function chartForward() {
  return function (dispatch) {
    dispatch({
      type: CHART_SET_FUNCTION,
      payload: {
        function: "forward",
      },
    });
  };
}

export function chartBackward() {
  return function (dispatch) {
    dispatch({
      type: CHART_SET_FUNCTION,
      payload: {
        function: "backward",
      },
    });
  };
}

export function chartSetSymbol(symbol) {
  return function (dispatch) {
    dispatch({
      type: CHART_SYMBOL_REQUEST,
      payload: {
        function: "slice",
        symbol: symbol.toLowerCase(),
      },
    });
  };
}

export function chartSetFrequency(frequency) {
  return function (dispatch) {
    dispatch({
      type: CHART_FREQUENCY_REQUEST,
      payload: {
        function: "simple",
        frequency: frequency,
      },
    });
  };
}

export function chartSetRange(range) {
  return function (dispatch) {
    dispatch({
      type: CHART_RANGE_REQUEST,
      payload: {
        function: "slice",
        range: range,
      },
    });
  };
}

export function chartSetInputs(symbol, date, frequency, book) {
  return function (dispatch) {
    dispatch({
      type: CHART_INPUTS_REQUEST,
      payload: {
        function: "slice",
        symbol: symbol.toLowerCase(),
        date: date,
        frequency: frequency,
        book: book,
      },
    });
  };
}

export function chartSetShowRecords(active) {
  return function (dispatch) {
    dispatch({
      type: CHART_RECORDS_REQUEST,
      payload: {
        function: "simple",
        showRecords: active,
      },
    });
  };
}

export function chartRandomDate() {
  return function (dispatch) {
    dispatch({
      type: CHART_RANDOM_DATE_REQUEST,
      payload: {
        function: "randomDate",
      },
    });
  };
}

export function chartSetInspect() {
  return function (dispatch, getState) {
    if (getState().chart.function !== "inspect") {
      dispatch({
        type: CHART_INSPECT_REQUEST,
        payload: {
          function: "inspect",
        },
      });
    }
  };
}

export function chartSetParameters(parameters) {
  return function (dispatch) {
    dispatch({
      type: CHART_PARAMETERS_REQUEST,
      payload: {
        function: "slice",
        parameters: parameters,
      },
    });
  };
}
