import "./App.css";
import "./index.css";
import { WorkoutsPage } from "./pages/WorkoutsPage";
import CreateUsernamePage from "./components/CreateUsernamePage";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { NewWorkoutPage } from "./pages/NewWorkoutPage";
import { EditWorkoutPage } from "./pages/EditWorkoutPage";
import Root from "./components/Root";
import { LoginPage } from "./pages/AuthPage";
import { WelcomePage } from "./pages/WelcomePage";
import AuthRoute from "./AuthRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<WelcomePage />} />
			<Route path="login" element={<LoginPage />} />
			<Route element={<AuthRoute />}>			{/* only authenticated users can use these routes  */}
				<Route path="workouts" element={<WorkoutsPage />} />
				<Route
					path="workouts/:workoutName"
					element={<EditWorkoutPage />}
				/>
				<Route path="createUsername" element={<CreateUsernamePage />} />
				<Route path="newWorkout" element={<NewWorkoutPage />} />
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}