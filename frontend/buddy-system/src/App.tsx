import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Counter from "remote/Counter";
import Header from "header/Header";

const App = () => (
	<div className="container">
		<Header />
		<div>Name: buddy-system</div>
		<Counter />
	</div>
);
ReactDOM.render(<App />, document.getElementById("app"));
