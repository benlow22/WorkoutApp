import { Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/welcomePage/WelcomePage";
import { WorkoutsPage } from "./pages/workoutsPage/WorkoutsPage";
import { WorkoutPage } from "./pages/workoutPage/workoutPage";
import { ExercisesPage } from "./components/exercises/ExercisesPage";
import Exercise from "./components/exercises/Exercise";
import { NewWorkoutPage } from "./pages/newWorkoutPage/NewWorkoutPage";

export const WorkoutBuddy = () => {
	return (
		<Routes>
			<Route path="/" element={<WelcomePage />}>
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
				<Route path="newWorkout" element={<NewWorkoutPage />} />
			</Route>
			{/* <Route exact path="/contact" element={<Contact />} />
			<Route exact path="/projects" element={<Projects />} /> */}
		</Routes>
	);
};
