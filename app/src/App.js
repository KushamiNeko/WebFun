import "./App.css";
import { Provider } from "react-redux";

import Navbar from "./components/navbar";
import PracticeView from "./view/practice";
import StatisticView from "./view/statistic";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <PracticeView />
    </Provider>
  );
}

<StatisticView />;
export default App;
