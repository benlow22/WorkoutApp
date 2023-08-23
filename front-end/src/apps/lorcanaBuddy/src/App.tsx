import { Navigate, Route } from "react-router";
import { LorcanaBuddyDashboard } from "../dashboard";
import { MyCollection } from "./pages/myCollection/MyCollection";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { BrowsePage } from "./pages/browse/BrowsePage";

export const LorcanaBuddy = [
	<Route index element={<LorcanaBuddyDashboard />} />,
	<Route path="myCollection" element={<MyCollection />} />,
	<Route path="browse" element={<BrowsePage />} />,
	<Route path="wishlist" element={<Wishlist />} />,
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
