import ReactDOM from "react-dom";
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Link,
	useParams,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import "./index.css";
import { AmiiboBuddyDashboard } from "./pages/Dashboard";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<AmiiboBuddyDashboard />}>
			{/* // 	<Route index element={<WelcomePage />} />
		// 	<Route path="login" element={<LoginPage />} />
		// 	<Route element={<AuthRoute />}> */}
			{/* only authenticated users can use these routes  */}
			<Route path="amiiboBuddy" element={<AmiiboBuddyDashboard />} />
			<Route path="amiiboBuddy/browse" element={<BrowsePage />} />
			<Route
				path="amiiboBuddy/addAmiibo"
				element={<AmiiboInventoryForm />}
			/>
			<Route path="lorcanaBuddy" element={<LorcanaBuddyDashboard />}>
				<Route path="browse" element={<BrowsePage />} />
				<Route path="myCollection" element={<BrowsePage />} />
				<Route path="browse" element={<BrowsePage />} />
				{/* </Route> */}
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}

ReactDOM.render(<App />, document.getElementById("app"));
