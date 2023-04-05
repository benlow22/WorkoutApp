import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Header } from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Router>
		<App />
	</Router>
);
