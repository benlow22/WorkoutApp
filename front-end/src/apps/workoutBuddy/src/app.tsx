import { Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/welcomePage/WelcomePage";

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
				<Route path="createUsername" element={<CreateUsernamePage />} />
				<Route path="newWorkout" element={<NewWorkoutPage />} />
			</Route>
			{/* <Route exact path="/contact" element={<Contact />} />
			<Route exact path="/projects" element={<Projects />} /> */}
		</Routes>
	);
};
