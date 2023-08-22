import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import Counter from "./Counter";

const App = () => (
	<div className="mt-10 text-3xl mx-auto max-w-6xl">
		<div>Name: remote</div>
		<Counter />
	</div>
);

ReactDOM.render(<App />, document.getElementById("app"));
