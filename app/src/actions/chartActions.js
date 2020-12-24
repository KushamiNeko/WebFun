export const CHART_START_WORKING = "chart_start_working";
export const CHART_FINISH_WORKING = "chart_finish_working";

export const CHART_SET_FUNCTION = "chart_set_function";

export const CHART_SYMBOL_REQUEST = "chart_symbol_request";
export const CHART_FREQUENCY_REQUEST = "chart_frequency_request";
export const CHART_RECORDS_REQUEST = "chart_records_request";
export const CHART_INPUTS_REQUEST = "chart_inputs_request";

export const CHART_RANDOM_DATE_REQUEST = "chart_random_date_request";

export const CHART_PARAMETERS_REQUEST = "chart_parameters_request";
export const CHART_INSPECT_REQUEST = "chart_inspect_request";

function getChartURL(state) {
  // const origin = "http://127.0.0.1:5000";

  const origin = `${window.location.protocol}//${window.location.hostname}:5000`;

  let url = `${origin}/service/chart`;

  const now = new Date();

  url = `${url}?timestemp=${Math.round(now.getTime() / 1000)}`;

  url = `${url}&symbol=${state.symbol}&frequency=${state.freq}&function=${state.func}&date=${state.date}`;
  // url = `${url}&book=${state.book}&records=${state.records.toString()}`;
  url = `${url}&book=${state.symbol.toUpperCase()}${
    state.book
  }&records=${state.records.toString()}`;

  if (state.x != null && state.y != null) {
    url = `${url}&x=${state.x}&y=${state.y}`;
  }

  if (state.ax != null && state.ay != null) {
    url = `${url}&ax=${state.ax}&ay=${state.ay}`;
  }

  for (const [key, value] of Object.entries(state.parameters)) {
    let v = value;
    //v = parametersAdjustment(key, value);
    url = `${url}&params_${key}=${v}`;

    // url = `${url}&params_${key}=${value}`;
  }

  return url;
}

//_parametersAdjustment(key: string, value: any): any {
//let volatility = [
//"vix",
//"vxn",
//"rvx",
//"jniv",
//"vstx",
//"vhsi",
//"vxfxi",
//"ovx",
//"gvz",
//];

//if (volatility.includes(this._symbol)) {
//let activated = ["BollingerBands"];
//let deactivated = [
//"MovingAverages10",
//"MovingAverages60",
//"MovingAverages100",
//"MovingAverages300",
//];

//if (activated.includes(key)) {
//return "true";
//}

//if (deactivated.includes(key)) {
//return "false";
//}
//}

//return value;
//}

export function chartRequest() {
  return function (dispatch, getState) {
    if (getState().chart.isWorking) {
      return;
    }

    console.log("dispatch working");

    dispatch({
      type: CHART_START_WORKING,
    });

    const url = getChartURL(getState().chart);

    console.log("chart request");
    console.log(url);

    dispatch({
      type: CHART_FINISH_WORKING,
    });

    return;
    //this._url = url;

    //const headers = new HttpHeaders().set(
    //"Content-Type",
    //"text/plain; charset=utf-8"
    //);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).includes("error")) {
          // console.error(`${data["error"]}`);

          console.error(data["error"]);

          dispatch({
            type: CHART_FINISH_WORKING,
          });

          return;
        }

        console.log(data);

        const src = `data:image/png;base64,${data["img"]}`;

        //this.image.next(src);
        //this.quote.next(data);
        //this._date = data["date"];

        //this.inputs.next({
        //symbol: this._symbol,
        //date: this._date,
        //freq: this._freq,
        //book: this._book,
        //});

        //this._completed();
        dispatch({
          type: CHART_FINISH_WORKING,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    //this._http.get(url).subscribe(
    //(data: object) => {
    //if (Object.keys(data).includes("error")) {
    //// console.error(`${data["error"]}`);
    //alert(`${data["error"]}`);
    //this._completed();
    //return;
    //}

    //const src = `data:image/png;base64,${data["img"]}`;
    //this.image.next(src);
    //this.quote.next(data);
    //this._date = data["date"];

    //this.inputs.next({
    //symbol: this._symbol,
    //date: this._date,
    //freq: this._freq,
    //book: this._book,
    //});

    //this._completed();
    //},
    //(error: HttpErrorResponse) =>
    //// console.error(`${error.status}: ${error.error}`)
    //alert(`${error.status}: ${error.error}`)
    //);
  };
}

export function chartRefresh() {
  return function (dispatch) {
    dispatch({
      type: CHART_SET_FUNCTION,
      payload: {
        func: "simple",
      },
    });
  };
}

export function chartForward() {
  return function (dispatch) {
    dispatch({
      type: CHART_SET_FUNCTION,
      payload: {
        func: "forward",
      },
    });
  };
}

export function chartBackward() {
  return function (dispatch) {
    dispatch({
      type: CHART_SET_FUNCTION,
      payload: {
        func: "backward",
      },
    });
  };
}

export function chartSetSymbol(symbol) {
  return function (dispatch) {
    dispatch({
      type: CHART_SYMBOL_REQUEST,
      payload: {
        func: "slice",
        symbol: symbol.toLowerCase(),
      },
    });
  };
}

export function chartSetFrequency(freq) {
  return function (dispatch) {
    dispatch({
      type: CHART_FREQUENCY_REQUEST,
      payload: {
        func: "simple",
        freq: freq,
      },
    });
  };
}

export function chartSetInputs(symbol, date, freq, book) {
  return function (dispatch) {
    dispatch({
      type: CHART_INPUTS_REQUEST,
      payload: {
        func: "slice",
        symbol: symbol,
        date: date,
        freq: freq,
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
        func: "simple",
        records: active,
      },
    });
  };
}

export function chartRandomDate() {
  return function (dispatch) {
    dispatch({
      type: CHART_RANDOM_DATE_REQUEST,
      payload: {
        func: "randomDate",
      },
    });
  };
}

export function chartSetParameters(parameters) {
  return function (dispatch) {
    dispatch({
      type: CHART_PARAMETERS_REQUEST,
      payload: {
        func: "slice",
        params: parameters,
      },
    });
  };
}

export function chartInspectRequest(x, y, ax = null, ay = null) {
  return function (dispatch) {
    //if (ax != null && ay != null) {
    dispatch({
      type: CHART_INSPECT_REQUEST,
      payload: {
        func: "inspect",
        x: x,
        y: y,
        ax: ax,
        ay: ay,
      },
    });
    //} else {
    //dispatch({
    //type: CHART_INSPECT_REQUEST,
    //payload: {
    //func: "inspect",
    //x: x,
    //y: y,
    //},
    //});
    //}
  };

  //let url = this._url.replace(/function=[^&]+/, "function=inspect");

  //url = `${url}&x=${x}&y=${y}`;

  //if (ax != null && ay != null) {
  //url = `${url}&ax=${ax}&ay=${ay}`;
  //}

  //const headers = new HttpHeaders().set(
  //"Content-Type",
  //"text/plain; charset=utf-8"
  //);

  //if (!this._isWorking) {
  //return this._http.get(url, { headers, responseType: "text" }).toPromise();
  //} else {
  //return "";
  //}
}
