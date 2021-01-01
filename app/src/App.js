import "./App.css";
import { Provider } from "react-redux";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/navbar";
import PracticeView from "./view/practice";
import StatisticView from "./view/statistic";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/practice">
            <PracticeView />
          </Route>
          <Route path="/statistic">
            <StatisticView />
          </Route>
          <Redirect to="/practice" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
