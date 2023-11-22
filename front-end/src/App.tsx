import "./styles/App.css";
import "./styles/index.css";

import {
	Navigate,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import Root from "./containers/Root";
import { LoginPage } from "./components/auth/login/LoginPage";
import AuthRoute from "./AuthRoute";
import { BuddySystemDashboard } from "./apps/buddySystem/BuddySystemDashboard";
import { BuddySystemHomepage } from "./pages/buddySystemHomepage/BuddySystemHomepage";
import { AmiiboBuddy } from "./apps/amiiboBuddy/src/App";
import { LorcanaBuddy } from "./apps/lorcanaBuddy/src/App";
import { PokeBuddy } from "./apps/pokeBuddy/src/App";
import { WorkoutBuddy } from "./apps/workoutBuddy/src/App";
import { ResetPasswordPage } from "./components/auth/login/ResetPasswordPage";
import { NewUsername } from "./containers/header/newUsername";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<BuddySystemDashboard />} />

			<Route path=":domain/createUsername" element={<NewUsername />} />
			<Route path=":domain/login" element={<LoginPage />} />
			{/* only authenticated users can use these routes  */}
			{/* <Route path="buddySystem" element={<BuddySystemDashboard />} /> */}
			<Route path="workoutBuddy">{WorkoutBuddy}</Route>
			<Route path="amiiboBuddy">{AmiiboBuddy}</Route>
			{/* <Route element={<AuthRoute />}> */}
			<Route path="pokeBuddy">{PokeBuddy}</Route>
			<Route path="lorcanaBuddy">{LorcanaBuddy}</Route>
			{/* <Route path="account"> 
				<Route path="createUsername" element={<CreateUsernamePage />} />
				</Route> */}
			{/* </Route> */}
			<Route
				path="buddySystem/resetpassword"
				element={<ResetPasswordPage />}
			/>
			<Route path="*" element={<Navigate to="" />} />,
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
