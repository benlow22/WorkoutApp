import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Router>
		<AuthProvider />
	</Router>
);
