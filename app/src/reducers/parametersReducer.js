const initialState = {
    KushamiNeko: [
      "CandleSticks",
      "Moving Averages",
      "Moving Averages 10",
      //"Moving Averages 60",
      "Moving Averages 100",
      "Moving Averages 300",
      "Volume",
      "Bollinger Bands",
      "Trading Level",
      //"EW Relative Strength",
      //"Advance Decline",
      "Volatility Summary",
      //"Volatility Zone",
      //"Entry Zone",
      "Distribution Days",
      //"Volatility Body Size",
    ],
    Magical: [3, 5, 7, 10, 20, 30, 60, 100, 300].map((n) => {
      return `Moving Averages ${n}`;
    }),
};

export default function parametersReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
