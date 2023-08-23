import "./styles/App.css";
import "./styles/index.css";

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import Root from "./containers/Root";
import { LoginPage } from "./components/auth/login/LoginPage";
import AuthRoute from "./AuthRoute";
import { BrowsePage } from "./apps/amiiboBuddy/src/components/BrowsePage";
import { AmiiboInventoryForm } from "./apps/amiiboBuddy/src/components/AmiiboInventoryForm";
import { AmiiboBuddyDashboard } from "./apps/amiiboBuddy/src/pages/AmiiboBuddyDashboard";
import { BuddySystemDashboard } from "./apps/buddySystem/BuddySystemDashboard";
import { LorcanaBuddyDashboard } from "./apps/lorcanaBuddy/dashboard";
import { BuddySystemHomepage } from "./pages/buddySystemHomepage/BuddySystemHomepage";
import { WorkoutBuddy } from "./apps/workoutBuddy/src/App";
import { WorkoutBuddyDashboard } from "./apps/workoutBuddy/src/pages/dashboard/WorkoutBuddyDashboard";
import { WorkoutBuddyHomepage } from "./apps/workoutBuddy/src/pages/homepage/WorkoutBuddyHomepage";
import { AmiiboBuddy } from "./apps/amiiboBuddy/src/App";
import { LorcanaBuddy } from "./apps/lorcanaBuddy/src/App";
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<BuddySystemHomepage />} />
			<Route path="login" element={<LoginPage />} />
			<Route element={<AuthRoute />}>
				{/* only authenticated users can use these routes  */}
				<Route path="buddySystem" element={<BuddySystemDashboard />} />
				<Route path="workoutBuddy">{WorkoutBuddy}</Route>
				<Route path="amiiboBuddy">{AmiiboBuddy}</Route>
				<Route path="lorcanaBuddy">{LorcanaBuddy}</Route>
				{/* <Route path="account"> 
				<Route path="createUsername" element={<CreateUsernamePage />} />
				</Route> */}
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
