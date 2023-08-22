import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";
// import Header from "./Header";
import Counter from "remote/Counter";
// import counterWrapper from "remote/counterWrapper";
import Header from "./components/Header";

const App = () => (
	<div className="container">
		<Header />
		<Counter />
	</div>
);

ReactDOM.render(<App />, document.getElementById("app"));
