const initialState = {
  Currencies: [
    // "USD",
    "DXY",
    "EURUSD",
    "USDJPY",
    "GBPUSD",
    "AUDUSD",
    "USDCAD",
    "USDCHF",
    "NZDUSD",
    "BTCUSD",
    "ETHUSD",
    "LTCUSD",
    "XRPUSD",
    "BCHUSD",
    "USDCUSD",
    //"JPYUSD",
    //"CADUSD",
    //"CHFUSD",
    //"EURJPY",
    //"EURGBP",
    //"EURAUD",
    //"EURCAD",
    //"EURCHF",
    //"GBPJPY",
    //"AUDJPY",
    //"CADJPY",
    // "NZDJPY",
    "DX",
    "E6",
    "J6",
    "B6",
    "A6",
    "D6",
    "S6",
    "N6",
  ],
  Cryptocurrencies: [
    "BTCUSD",
    "ETHUSD",
    "LTCUSD",
    "XRPUSD",
    "BCHUSD",
    "USDCUSD",
    "USDTUSD",
    "ADAUSD",
    "DOTUSD",
    "LINKUSD",
    "XMRUSD",
    "XLMUSD",
    "UNIUSD",
    "EOSUSD",
    "DASHUSD",
    "ZECUSD",
    "NEOUSD",
    "BNBUSD",
    "TRXUSD",
    //"BSVUSD",
    //"ETCUSD",
  ],
  "Stock Indexes": [
    "SPX",
    // "SPXEW",
    "VIX",
    "ES",
    "NDX",
    // "NDXEW",
    "VXN",
    "NQ",
    // "SML",
    // "SMLEW",
    "RUT",
    //"RVX",
    "QR",
    "DJI",
    "YM",
    // "VLE",
    // "ZN",
    // "HYG",
    "NIKK",
    // "TOPIX",
    "JNIV",
    "NP",
    // "EZU",
    "FX",
    "VSTX",
    "EEM",
    "HSI",
    "VHSI",
    "FXI",
    "VXFXI",
  ],
  Bonds: [
    "ZN",
    "ZF",
    "ZT",
    "ZB",
    "GE",
    "TJ",
    "GG",
    "JPST",
    "NEAR",
    "ICSH",
    "GSY",
    "SHV",
    "USHY",
    //"HYLB",
    "HYG",
    "JNK",
    "EMB",
    "LQD",
    "MBB",
    "SHY",
    "IEF",
    "IYR",
    "REET",
    "REM",
  ],
  Commodities: [
    "GC",
    // "GVZ",
    "CL",
    // "OVX",
  ],
};

export default function symbolsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
