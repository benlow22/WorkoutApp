import { Navigate, Route } from "react-router";
import { LorcanaBuddyDashboard } from "../dashboard";
import { MyCollection } from "./pages/myCollection/MyCollection";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { BrowsePage } from "./pages/browse/BrowsePage";
import { AddItems } from "./pages/addItems/AddItems";
import { Inventory } from "./pages/inventory/Inventory";

export const LorcanaBuddy = [
	<Route index element={<LorcanaBuddyDashboard />} key={"LB1"} />,
	<Route path="myCollection" element={<MyCollection />} key={"LB2"} />,
	<Route path="browse" element={<BrowsePage />} key={"LB3"} />,
	<Route path="wishlist" element={<Wishlist />} key={"LB4"} />,
	<Route path="addItems" element={<AddItems />} key={"LB4"} />,
	<Route path="inventory" element={<Inventory />} key={"LB6"} />,
	<Route path="*" element={<Navigate to="" />} key={"LB5"} />,
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
