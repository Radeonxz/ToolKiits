import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

import { TipCalculator } from "./components/TipCalculator";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <TipCalculator />
    </Provider>
  );
}

export default App;
