import "./App.css";
import { Provider } from "react-redux";

import Navbar from "./components/navbar";
import PracticeView from "./view/practice";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <PracticeView />
    </Provider>
  );
}

export default App;
