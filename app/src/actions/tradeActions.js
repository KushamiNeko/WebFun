import { INFO_SHOW_MESSAGE } from "./infoActions";

import { CHART_REFRESH } from "./chartActions";

export const TRADE_SHOW_PANEL = "trade_show_panel";
export const TRADE_START_WORKING = "trade_start_working";
export const TRADE_FINISH_WORKING = "trade_finish_working";

export const TRADE_SET_BOOKS = "trade_set_books";
export const TRADE_SET_STOP_ORDERS = "trade_set_stop_orders";
export const TRADE_SET_STATISTIC = "trade_set_statistic";

export const TRADE_SET_STATISTIC_RANGE = "trade_set_statistic_range";

export const TRADE_SET_NOTE = "trade_set_note";

function tradeURL(gate) {
  // const origin = "http://127.0.0.1:5000";
  const origin = `${window.location.protocol}//${window.location.hostname}:5000`;

  let url = `${origin}/service/trade/${gate}`;

  const now = new Date();

  url = `${url}?timestemp=${Math.round(now.getTime() / 1000)}`;

  return url;
}

function updateOrderBook(order) {
  order["book"] = `${order["symbol"].toUpperCase()}@${order[
    "book"
  ].toUpperCase()}`;
  return order;
}

export function tradeShowPanel(active) {
  return function (dispatch) {
    dispatch({
      type: TRADE_SHOW_PANEL,
      payload: {
        showPanel: active,
      },
    });
  };
}

export function tradeNewMarketOrder(order) {
  return function (dispatch, getState) {
    const trade = getState().trade;

    if (trade.isWorking) {
      return;
    }

    dispatch({
      type: TRADE_START_WORKING,
    });

    order = updateOrderBook(order);

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `${tradeURL("order")}&order=market`;

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          console.error(`${data["error"]}`);
          dispatch({
            type: INFO_SHOW_MESSAGE,
            payload: {
              message: data["error"],
            },
          });
        }

        dispatch({
          type: TRADE_FINISH_WORKING,
        });

        dispatch({
          type: CHART_REFRESH,
        });

        dispatch({
          type: TRADE_SHOW_PANEL,
          payload: {
            showPanel: false,
          },
        });
      });
  };
}

export function tradeNewStopOrder(order) {
  return function (dispatch, getState) {
    const trade = getState().trade;

    if (trade.isWorking) {
      return;
    }

    dispatch({
      type: TRADE_START_WORKING,
    });

    order = updateOrderBook(order);

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `${tradeURL("order")}&order=stop`;

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          console.error(`${data["error"]}`);
          dispatch({
            type: INFO_SHOW_MESSAGE,
            payload: {
              message: data["error"],
            },
          });
        } else {
          dispatch({
            type: TRADE_SET_STOP_ORDERS,
            payload: {
              stopOrders: data["data"],
            },
          });
        }

        dispatch({
          type: TRADE_FINISH_WORKING,
        });

        dispatch({
          type: CHART_REFRESH,
        });

        dispatch({
          type: TRADE_SHOW_PANEL,
          payload: {
            showPanel: false,
          },
        });
      });
  };
}

export function tradeDeleteStopOrder(index) {
  return function (dispatch, getState) {
    const trade = getState().trade;

    if (trade.isWorking) {
      return;
    }

    dispatch({
      type: TRADE_START_WORKING,
    });

    const options = {
      method: "DELETE",
    };

    const url = `${tradeURL("order")}&index=${index}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          console.error(`${data["error"]}`);

          dispatch({
            type: INFO_SHOW_MESSAGE,
            payload: {
              message: data["error"],
            },
          });
        } else {
          dispatch({
            type: TRADE_SET_STOP_ORDERS,
            payload: {
              stopOrders: data["data"],
            },
          });
        }

        dispatch({
          type: TRADE_FINISH_WORKING,
        });

        dispatch({
          type: CHART_REFRESH,
        });
      });
  };
}

export function tradeReadAllStopOrders() {
  return function (dispatch, getState) {
    const trade = getState().trade;

    if (trade.isWorking) {
      return;
    }

    dispatch({
      type: TRADE_START_WORKING,
    });

    const url = `${tradeURL("order")}&order=stop`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          console.error(`${data["error"]}`);

          dispatch({
            type: INFO_SHOW_MESSAGE,
            payload: {
              message: data["error"],
            },
          });
        } else {
          dispatch({
            type: TRADE_SET_STOP_ORDERS,
            payload: {
              stopOrders: data["data"],
            },
          });
        }

        dispatch({
          type: TRADE_FINISH_WORKING,
        });
      });
  };
}

export function tradeReadAllBooks() {
  return function (dispatch, getState) {
    const trade = getState().trade;

    if (trade.isWorking) {
      return;
    }

    dispatch({
      type: TRADE_START_WORKING,
    });

    const url = `${tradeURL("statistic")}&function=books`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          console.error(`${data["error"]}`);

          dispatch({
            type: INFO_SHOW_MESSAGE,
            payload: {
              message: data["error"],
            },
          });
        } else {
          dispatch({
            type: TRADE_SET_BOOKS,
            payload: {
              books: data["data"],
            },
          });
        }

        dispatch({
          type: TRADE_FINISH_WORKING,
        });
      });
  };
}

export function tradeReadStatistic(titles) {
  return function (dispatch, getState) {
    if (!titles) {
      return;
    }

    const trade = getState().trade;

    if (trade.isWorking) {
      return;
    }

    dispatch({
      type: TRADE_START_WORKING,
    });

    const url = `${tradeURL(
      "statistic"
    )}&function=statistic&titles=${titles.join(",")}&startDate=${
      trade.startDate
    }&endDate=${trade.endDate}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          console.error(`${data["error"]}`);

          dispatch({
            type: INFO_SHOW_MESSAGE,
            payload: {
              message: data["error"],
            },
          });
        } else {
          dispatch({
            type: TRADE_SET_STATISTIC,
            payload: {
              statistic: data,
            },
          });
        }

        dispatch({
          type: TRADE_FINISH_WORKING,
        });
      });
  };
}

export function tradeSetStatisticRange(start, end) {
  return function (dispatch) {
    dispatch({
      type: TRADE_SET_STATISTIC_RANGE,
      payload: {
        startDate: start,
        endDate: end,
      },
    });
  };
}
