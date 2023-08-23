import { Route } from "react-router";
import { Homepage } from "./pages/homepage/Homepage";

export const PokeBuddy = [
	<Route index element={<Homepage />} />,
	// <Route path="workouts" element={<WorkoutsPage />} />,
	// <Route path="workouts/:workoutUrl" element={<WorkoutPage />} />,
	// <Route path="exercises" element={<ExercisesPage />} />,
	// <Route path="exercises/:exerciseId" element={<Exercise />} />,
	// <Route path="newWorkout" element={<NewWorkoutPage />} />,
	// <Route path="explore" element={<ExplorePage />} />,

	// <Route path="tips" element={<TipsPage />} />,

	// <Route path="*" element={<Navigate to="" />} />,
];
