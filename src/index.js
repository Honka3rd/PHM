import ReactDOM from "react-dom";
import React from "react";
import Main from "./main";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import BoundledReducers from "./reducers";
import "semantic-ui-css/semantic.min.css";
import "normalize.css";
import "./style.css";

ReactDOM.render(
	<Provider store={createStore(BoundledReducers, applyMiddleware(thunk))}>
		<Main />
	</Provider>,
	document.getElementById("root")
);
