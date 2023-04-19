import React, { useState, useEffect, useContext } from "react";

import "./App.css";
import { Header } from "./components/Header";
import "./index.css";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "./supabaseClient";
import { WorkoutsPage } from "./pages/WorkoutsPage";
import { IWorkout, workouts } from "./data";
import { CreateUsername } from "./components/CreateUsername";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Route, Switch } from "react-router-dom";
import { NewWorkoutPage } from "./pages/NewWorkoutPage";
import { EditWorkoutPage } from "./pages/EditWorkoutPage";
import AuthProvider, { AuthContext } from "./contexts/AuthProvider";

export default function App() {
	const {
		userId,
		username,
		isLoggedIn,
		workouts,
		isLoading,
		setIsLoggedIn,
		setUsername,
		setWorkouts,
		setUserId,
		setIsLoading,
	} = useContext(AuthContext);
	const [session, setSession] = useState<any | null>(null);

	useEffect(() => {
		setIsLoading(true)
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		setIsLoading(false)
		return () => subscription.unsubscribe();
	}, []);


	useEffect(() => {
		if (session) {
			getUserId();
			setIsLoggedIn(true);
		}
	}, [session]);

	useEffect(() => {
		if (userId) {
			getUsername();
		}
		setIsLoading(false);
	}, [userId]);

	useEffect(() => {
		if (!username) {
			setIsLoggedIn(false);
		}
	}, [username]);

	const getUserId = async () => {
		try {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			if (user) {
				setUserId(user.id);
			}
		} catch (error) {
			console.error("Error while getting User", error);
		}
	};

	const getUsername = async () => {
		try {
			const { data, error } = await supabase
				.from("profiles")
				.select("username")
				.eq("id", userId)
				.limit(1)
				.single();
			let username;
			if (data) {
				username = data.username;
			}
			username && setUsername(username);
			if (error) {
				console.log("ERROR getting userName: ", error);
			}
		} catch (error) {
			console.error("Error while getting Username", error);
		}
	};

	return (
		<>
			{!isLoggedIn && !isLoading ? (
				<div className="App">
					<Header />
					<div className="auth-page">
						<p>Please Login Below</p>
						<Auth
							supabaseClient={supabase}
							appearance={{
								theme: ThemeSupa,
								variables: {
									default: {
										colors: {
											brand: "red",
											brandAccent: "darkred",
										},
									},
								},
							}}
						/>
					</div>
				</div>
			) : (
				<div className="main">
					{/* {!username && <CreateUsername />} */}
					{isLoggedIn && (
						<>
							<Header />
							<Switch>
								{" "}
								{/* when invalid workout/name = redirect to homepage */}
								<Route path="/workouts/:workoutName">
									<EditWorkoutPage />
								</Route>
								<Route path="/newWorkout">
									<NewWorkoutPage />
								</Route>
								<Route path="/">
									<WorkoutsPage />
								</Route>
							</Switch>
						</>
					)}
				</div>
			)}
		</>
	);
}
// 	} else if (!session && !isLoading && !isLoggedIn) {
// 		return (
// 			<div>
// 				<Header />
// 				<p>Please Login Below</p>
// 				<Auth
// 					supabaseClient={supabase}
// 					appearance={{
// 						theme: ThemeSupa,
// 						variables: {
// 							default: {
// 								colors: {
// 									brand: "red",
// 									brandAccent: "darkred",
// 								},
// 							},
// 						},
// 					}}
// 				/>
// 			</div>
// 		);
// 	} else {
// 		return (
// 			<div>
// 				<Header />
// 				<h2>Loading...</h2>
// 			</div>
// 		);
// 	}
// }
