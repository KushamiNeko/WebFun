import { CHART_REFRESH } from "./chartActions";

export const TRADE_SHOW_PANEL = "trade_show_panel";
export const TRADE_START_WORKING = "trade_start_working";
export const TRADE_FINISH_WORKING = "TRADE_FINISH_WORKING";

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

function updateOrderBook(order) {
  order["book"] = `${order["symbol"].toUpperCase()}${order["book"]}`;
  return order;
}

function requestUrl(gate) {
  // const origin = "http://127.0.0.1:5000";
  const origin = `${window.location.protocol}//${window.location.hostname}:5000`;

  let url = `${origin}/service/trade/${gate}`;

  const now = new Date();

  url = `${url}?timestemp=${Math.round(now.getTime() / 1000)}`;
  return url;
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

    const url = `${requestUrl("order")}&order=market`;

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          console.error(`${data["error"]}`);
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

//findAllBooks(): void {
//if (this._isWorking) {
//return;
//}

//this._isWorking = true;

//this._http
//.get(`${this._requestUrl("statistic")}&function=books`)
//.subscribe((data) => {
//if (Object.keys(data).includes("error")) {
//alert(`${data["error"]}`);
//this._completed();
//return;
//}

//this.books.next(data["data"]);
//// this._isWorking = false;
//// this.isWorking.next(this._isWorking);
//this._completed();
//});
//}

//readStatistic(titles: Array<string> | null): void {
//if (titles == null) {
//this.statistic.next({});
//return;
//}

//if (this._isWorking) {
//return;
//}

//this._isWorking = true;

//this._http
//.get(
//`${this._requestUrl(
//"statistic"
//)}&function=statistic&titles=${titles.join(",")}`
//)
//.subscribe((data) => {
//if (Object.keys(data).includes("error")) {
//alert(`${data["error"]}`);
//this._completed();
//return;
//}

//this.statistic.next(data);
//// this._isWorking = false;
//// this.isWorking.next(this._isWorking);
//this._completed();
//});
//}
