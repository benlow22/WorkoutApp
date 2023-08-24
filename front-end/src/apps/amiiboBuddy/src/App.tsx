import { Navigate, Route } from "react-router";
import { AmiiboBuddyHomePage } from "./components/HomePage";
import { MyCollection } from "./pages/myCollection/MyCollection";
import { Returns } from "./pages/returns/Returns";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { AddAmiibo } from "./pages/addAmiibo/AddAmiibo";

export const AmiiboBuddy = [
	<Route index element={<AmiiboBuddyHomePage />} key={"AB1"} />,
	<Route path="myCollection" element={<MyCollection />} key={"AB2"} />,
	<Route path="returns" element={<Returns />} key={"AB3"} />,
	<Route path="wishlist" element={<Wishlist />} key={"AB4"} />,
	<Route path="addAmiibo" element={<AddAmiibo />} key={"AB5"} />,
	<Route path="*" element={<Navigate to="" />} key={"AB5"} />,
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
