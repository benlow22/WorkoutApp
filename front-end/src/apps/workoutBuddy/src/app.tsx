import { Navigate, Route } from "react-router-dom";
import { WorkoutsPage } from "./pages/workoutsPage/WorkoutsPage";
import { WorkoutPage } from "./pages/workoutPage/workoutPage";
import { ExercisesPage } from "./components/exercises/ExercisesPage";
import Exercise from "./components/exercises/Exercise";
import { NewWorkoutPage } from "./pages/newWorkoutPage/NewWorkoutPage";
import { WorkoutBuddyHomepage } from "./pages/homepage/WorkoutBuddyHomepage";
import { ExplorePage } from "./pages/explorePage/ExplorePage";
import { TipsPage } from "./pages/tipsPage/TipsPage";

export const WorkoutBuddy = [
	<Route index element={<WorkoutBuddyHomepage />} />,
	<Route path="workouts" element={<WorkoutsPage />} />,
	<Route path="workouts/:workoutUrl" element={<WorkoutPage />} />,
	<Route path="exercises" element={<ExercisesPage />} />,
	<Route path="exercises/:exerciseId" element={<Exercise />} />,
	<Route path="newWorkout" element={<NewWorkoutPage />} />,
	<Route path="explore" element={<ExplorePage />} />,

	<Route path="tips" element={<TipsPage />} />,

	<Route path="*" element={<Navigate to="" />} />,
];

// export const WorkoutBuddy = [
// 			<Route index element={<WelcomePage />}/>,
// 				<Route path="workouts" element={<WorkoutsPage />} />,
// 				<Route path="workouts/:workoutUrl" element={<WorkoutPage />} />,
// 				{/* <Route
// 					path=":edit-workout/:workoutUrl"
// 					element={<EditWorkoutPage />}
// 				/> */}
// 				<Route path="exercises" element={<ExercisesPage />} />,
// 				{/* <Route
// 					path="exercises/:exerciseName/new"
// 					element={<NewExercisePage />}
// 				/> */}
// 				<Route path="exercises/:exerciseId" element={<Exercise />} />,
// 				<Route path="newWorkout" element={<NewWorkoutPage />} />,
// 			{/* <Route exact path="/contact" element={<Contact />} />
// 			<Route exact path="/projects" element={<Projects />} /> */}

// 		]
