import React, { useState, useEffect } from "react";

import "./App.css";
import { Header } from "./components/Header";
import "./index.css";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "./supabaseClient";
import { WorkoutsPage } from "./pages/WorkoutsPage";
import { IWorkout, workouts } from "./data";
import { CreateUsername } from "./components/CreateUsername";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NewWorkoutPage } from "./pages/NewWorkoutPage";
import { EditWorkoutPage } from "./pages/EditWorkoutPage";
import { hydrate, QueryClient, QueryClientProvider } from 'react-query'
type IAuthContext = {
	userid: string;
	username: string;
	isLoggedIn: boolean;
	workouts: IWorkout[];
	setIsLoggedIn: (loggedIn: boolean) => void;
	setUsername: (newName: string) => void;
	setWorkouts: (usersWorkouts: IWorkout[]) => void;
};

export const AuthContext = React.createContext<IAuthContext>({
	userid: "",
	username: "",
	isLoggedIn: false,
	workouts: [], 
	setIsLoggedIn: () => {},
	setUsername: () => {},
	setWorkouts: () => {}
});

export default function App() {
	// const [QueryClient] = useState(()=> new QueryClient());
	const [userid, setUserId] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [session, setSession] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [workouts, setWorkouts] = useState<IWorkout[]>([]);
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		return () => subscription.unsubscribe();
		setIsLoading(true);
	}, []);

	const getUserId = async () => {
		try {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();
			user && setUserId(user.id);
		} catch (error) {
			console.error("Error while getting User", error);
		}
	};

	const getUsername = async () => {
		try {
			const {
				data,
				error,
			} = await supabase
				.from("profiles")
				.select("username")
				.eq("id", userid)
				.limit(1)
				.single();
			let username;
			if (data) {
				username = data.username;
			}
			username && setUsername(username);
		} catch (error) {
			console.error("Error while getting Username", error);
		}
	};

	useEffect(() => {
		if (session) {
			getUserId();
			setIsLoggedIn(true);
		}
	}, [session]);

	useEffect(() => {
		if (userid) {
			getUsername();
		}
	}, [userid]);
	// if (!isLoading) {
	// 	return <p>Loading</p>
	// } else
	if (!session) {
		return (
			<div>
				<Header />
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
		);
	} else {
		// const getUserId = async () => {
		// 	try {
		// 		const {
		// 			data: { user },
		// 			error,
		// 		} = await supabase.auth.getUser();
		// 		user && setUserId(user.id);
		// 	} catch (error) {
		// 		console.error("Error while getting User", error);
		// 	}
		// };
		// getUserId();
		// console.log("after the big GET", userid);
		// const getUsername = async () => {
		// 	// try {

		// 	// }
		// }
		// setIsLoggedIn(true);
		return (
			<AuthContext.Provider
				value={{
					userid,
					username,
					isLoggedIn,
					workouts,
					setIsLoggedIn,
					setUsername,
					setWorkouts,
				}}
			>
				<div className="App">
					<Header />
					<div className="main">
						{!username && <CreateUsername />}
						<Switch> {/* when invalid workout/name = redirect to homepage */}
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
					</div>
				</div>
			</AuthContext.Provider>
		);
	}
}
