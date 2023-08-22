import "./styles/App.css";
import "./styles/index.css";

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import Root from "./containers/Root";
import { NewWorkoutPage } from "./components/domains/workoutBuddy/newWorkoutPage/NewWorkoutPage";
import { WorkoutsPage } from "./components/domains/workoutBuddy/workoutsPage/WorkoutsPage";
import { CreateUsernamePage } from "./components/domains/workoutBuddy/createUsernamePage/CreateUsernamePage";
import { LoginPage } from "./components/domains/workoutBuddy/login/LoginPage";
import { WelcomePage } from "./components/domains/workoutBuddy/welcomePage/WelcomePage";
import AuthRoute from "./AuthRoute";
import { ExercisesPage } from "./apps/workoutBuddy/ExercisesPage";
import Exercise from "./components/domains/workoutBuddy/Exercise";
import { WorkoutPage } from "./components/domains/workoutBuddy/workoutPage/workoutPage";
import { BrowsePage } from "./apps/amiiboBuddy/components/BrowsePage";
import { AmiiboInventoryForm } from "./apps/amiiboBuddy/components/AmiiboInventoryForm";
import { AmiiboBuddyDashboard } from "./apps/amiiboBuddy/src/pages/AmiiboBuddyDashboard";
import { BuddySystemDashboard } from "./apps/buddySystem/BuddySystemDashboard";
import { WorkoutBuddyDashboard } from "./apps/workoutBuddy/workoutBuddyDashboard/WorkoutBuddyDashboard";
import { LorcanaBuddyDashboard } from "./apps/lorcanaBuddy/dashboard";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<WelcomePage />} />
			<Route path="login" element={<LoginPage />} />
			<Route element={<AuthRoute />}>
				{/* only authenticated users can use these routes  */}
				<Route path="buddySystem" element={<BuddySystemDashboard />} />
				<Route
					path="workoutBuddy"
					element={<WorkoutBuddyDashboard />}
				/>
				<Route
					path="workoutBuddy/workouts"
					element={<WorkoutsPage />}
				/>
				<Route
					path="workoutBuddy/workouts/:workoutUrl"
					element={<WorkoutPage />}
				/>
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
				</Route>
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
