import React, { useState, useEffect } from "react";

import "./App.css";
import Login from "./Login";
import { Header } from "./Header";
import "./index.css";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "./supabaseClient";
import { WorkoutsPage } from "./Workouts";
import { workouts } from "./data";
import { CreateUsername } from "./CreateUsername";
import { ThemeSupa } from "@supabase/auth-ui-shared";

type IAuthContext = {
	userid: string;
	username: string;
	isLoggedIn: boolean;
	setIsLoggedIn: (loggedIn: boolean) => void;
};

export const AuthContext = React.createContext<IAuthContext>({
	userid: "",
	username: "",
	isLoggedIn: false,
	setIsLoggedIn: () => {},
});

export default function App() {
	const [userid, setUserId] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [session, setSession] = useState<any | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		//return () => subscription.unsubscribe();
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
				data: { username },
				error,
			} = await supabase
				.from("profiles")
				.select("username")
				.eq("id", userid)
				.limit(1)
				.single();
			console.log("hello");
			username && setUsername(username);
		} catch (error) {
			console.error("Error while getting Username", error);
		}
	};

	useEffect(() => {
		if (session) {
			getUserId();
			setIsLoggedIn(true);
			console.log("called getUserId");
		}
	}, [session]);

	useEffect(() => {
		if (userid) {
			console.log("userID:", userid);
			getUsername();
			console.log("getting username");
		}
	}, [userid]);

	useEffect(() => {
		if (username) {
			console.log("1. new username:", username);
			console.log("2. new username:", userid);
			console.log("3. new username:", isLoggedIn);
		}
	}, [username]);

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
					setIsLoggedIn,
				}}
			>
				<div className="App">
					<Header />
					<div className="main">
						<Login />
					</div>
				</div>
			</AuthContext.Provider>
		);
	}
}
