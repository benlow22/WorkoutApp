import "./styles/App.css";

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import Root from "./components/Root";
import { NewWorkoutPage } from "./pages/newWorkoutPage/NewWorkoutPage";
import { WorkoutsPage } from "./pages/workoutsPage/WorkoutsPage";
import { CreateUsernamePage } from "./pages/createUsernamePage/CreateUsernamePage";
import { LoginPage } from "./pages/login/LoginPage";
import { WelcomePage } from "./pages/welcomePage/WelcomePage";
import AuthRoute from "./AuthRoute";
import { ExercisesPage } from "./pages/ExercisesPage";
import Exercise from "./components/Exercise";
import { WorkoutPage } from "./pages/workoutPage/workoutPage";
import { BrowsePage } from "../amiiboBuddy/components/BrowsePage";
import { AmiiboInventoryForm } from "../amiiboBuddy/components/AmiiboInventoryForm";
import { AmiiboBuddyHomePage } from "../amiiboBuddy/components/HomePage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<WelcomePage />} />
			<Route path="login" element={<LoginPage />} />
			<Route element={<AuthRoute />}>
				{/* only authenticated users can use these routes  */}
				<Route path="workouts" element={<WorkoutsPage />} />
				<Route path="workouts/:workoutUrl" element={<WorkoutPage />} />
				{/* <Route
					path=":edit-workout/:workoutUrl"
					element={<EditWorkoutPage />}
				/> */}
				<Route path="exercises" element={<ExercisesPage />} />
				{/* <Route
					path="exercises/:exerciseName/new"
					element={<NewExercisePage />}
				/> */}
				<Route path="exercises/:exerciseId" element={<Exercise />} />
				<Route path="createUsername" element={<CreateUsernamePage />} />
				<Route path="newWorkout" element={<NewWorkoutPage />} />
				<Route path="amiiboBuddy" element={<AmiiboBuddyHomePage />} />
				<Route path="amiiboBuddy/browse" element={<BrowsePage />} />
				<Route
					path="amiiboBuddy/addAmiibo"
					element={<AmiiboInventoryForm />}
				/>
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
