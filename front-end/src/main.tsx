import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	// <React.StrictMode>
	<AuthProvider>
		<App />
	</AuthProvider>
	// </React.StrictMode>
);
