import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<AuthProvider>
		<App />
	</AuthProvider>
);
