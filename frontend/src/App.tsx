import React, { useState, useEffect, useContext } from "react";

import "./App.css";
import { Header } from "./components/Header";
import "./index.css";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "./supabaseClient";
import { WorkoutsPage } from "./pages/WorkoutsPage";
import { IWorkout, workouts } from "./data";
import CreateUsernamePage from "./components/CreateUsernamePage";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { NewWorkoutPage } from "./pages/NewWorkoutPage";
import { EditWorkoutPage } from "./pages/EditWorkoutPage";
import AuthProvider, { AuthContext } from "./contexts/AuthProvider";
import Root from "./components/Root";
import { AuthPage } from "./pages/AuthPage";
import { WelcomePage } from "./pages/WelcomePage";
import AuthRoute from "./AuthRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<WelcomePage />} />
			<Route path="login" element={<AuthPage />} />
			<Route element={<AuthRoute />}>
				<Route path="workouts" element={<WorkoutsPage />} />
				<Route
					path="workouts/:workoutName"
					element={<EditWorkoutPage />}
				/>
				<Route path="createUsername" element={<CreateUsernamePage />} />
				<Route path="newWorkout" element={<NewWorkoutPage />} />
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}

// <div className="App">
// <Header />
// {!isLoggedIn && !isLoading ? (
// 	<div className="auth-page">
// 		<p>Please Login Below</p>
// 		<Auth
// 			supabaseClient={supabase}
// 			appearance={{
// 				theme: ThemeSupa,
// 				variables: {
// 					default: {
// 						colors: {
// 							brand: "red",
// 							brandAccent: "darkred",
// 						},
// 					},
// 				},
// 			}}
// 		/>
// 	</div>
// ) : (
// 	<div className="main">
// 		{isLoggedIn && !isLoading && (
// 			<Switch>
// 				<Route path="/workouts/:workoutName">
// 					<EditWorkoutPage />
// 				</Route>
// 				<Route path="/newWorkout">
// 					<NewWorkoutPage />
// 				</Route>
// 				<Route path="/workouts">
// 					<WorkoutsPage />
// 				</Route>
// 				<Route path="/createUsername">
// 					<CreateUsernamePage />
// 				</Route>
// 				<Route path="/">
// 					<Redirect to="/workouts" />
// 				</Route>
// 			</Switch>
// 		)}{" "}
// 	</div>
// )}{" "}
// </div>
