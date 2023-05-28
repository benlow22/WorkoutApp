import "./App.css";
import "./index.css";

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import Root from "./components/Root";
import { NewWorkoutPage } from "./pages/NewWorkoutPage";
import { EditWorkoutPage } from "./pages/EditWorkoutPage";
import { WorkoutsPage } from "./pages/WorkoutsPage";
import CreateUsernamePage from "./components/CreateUsernamePage";
import { LoginPage } from "./pages/login/LoginPage";
import { WelcomePage } from "./pages/welcomePage/WelcomePage";
import AuthRoute from "./AuthRoute";
import { ExercisesPage } from "./pages/ExercisesPage";
import Exercise from "./components/Exercise";
import NewExercise from "./pages/NewExercisePage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<WelcomePage />} />
			<Route path="login" element={<LoginPage />} />
			<Route element={<AuthRoute />}>
				{/* only authenticated users can use these routes  */}
				<Route path="workouts" element={<WorkoutsPage />} />
				<Route
					path="workouts/:workoutName"
					element={<EditWorkoutPage />}
				/>
				<Route path="exercises" element={<ExercisesPage />} />
				<Route
					path="exercises/:exerciseName/new"
					element={<NewExercise />}
				/>
				<Route path="exercises/:exerciseId" element={<Exercise />} />
				<Route path="createUsername" element={<CreateUsernamePage />} />
				<Route path="newWorkout" element={<NewWorkoutPage />} />
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
