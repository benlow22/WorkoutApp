import { Navigate, Route } from "react-router";
import { AmiiboBuddyHomePage } from "./components/HomePage";
import { MyCollection } from "./pages/myCollection/MyCollection";
import { Returns } from "./pages/returns/Returns";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { AddAmiibo } from "./pages/addAmiibo/AddAmiibo";

export const AmiiboBuddy = [
	<Route index element={<AmiiboBuddyHomePage />} />,
	<Route path="myCollection" element={<MyCollection />} />,
	<Route path="returns" element={<Returns />} />,
	<Route path="wishlist" element={<Wishlist />} />,
	<Route path="addAmiibo" element={<AddAmiibo />} />,
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
