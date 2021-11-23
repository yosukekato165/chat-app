import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Router from "./routes";
import configureStore from "./configureStore";

const initialState: any = {};
const store = configureStore(initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
