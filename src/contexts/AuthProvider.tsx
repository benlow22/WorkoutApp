import React, { FC, useContext, useEffect, useState } from "react";
import { IWorkout } from "../data";
import { supabase } from "../supabaseClient";
import App from "../App";

type IAuthContext = {
	userId: string;
	username: string;
	isLoggedIn: boolean;
	workouts: IWorkout[];
	setIsLoggedIn: (loggedIn: boolean) => void;
	setUsername: (newName: string) => void;
	setWorkouts: (usersWorkouts: IWorkout[]) => void;
	setUserId: (userId: string) => void;
	user: any;
	auth: boolean;
};

export const AuthContext = React.createContext<IAuthContext>({
	userId: "",
	username: "",
	isLoggedIn: false,
	workouts: [],
	setIsLoggedIn: () => {},
	setUsername: () => {},
	setWorkouts: () => {},
	setUserId: () => {},
	user: null,
	auth: false,
});

type IChildren = {
	children: React.ReactNode;
};

const AuthProvider: React.FC<IChildren> = ({ children }) => {
	const [userId, setUserId] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [workouts, setWorkouts] = useState<IWorkout[]>([]);
	const [session, setSession] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState<any>(null);
	const [auth, setAuth] = useState(false);

	// when going to AuthPage, get session, set if logged in
	useEffect(() => {
		setIsLoading(true);
		const getSessionData = async () => {
			supabase.auth.getSession().then(({ data: { session } }) => {
				if (session) {
					setSession(session);
					setAuth(true);
					setUserId(session.user.id);
					setUsername(session.user.user_metadata.username);
					setIsLoggedIn(true); // late can be removed and replaced with auth
					setUser(session.user);
				}
				setIsLoading(false);
				return;
			});
		};
		getSessionData();
	}, []);

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				if (event == "PASSWORD_RECOVERY") {
					setAuth(false);
				} else if (event === "SIGNED_IN") {
					// everytime there is a sign in event, context states will be triggered
					console.log("did this work");
					if (session) {
						setSession(session);
						console.log("statechangeauth");
						setAuth(true);
						setUserId(session.user.id);
						setUsername(session.user.user_metadata.username);
						setIsLoggedIn(true); // late can be removed and replaced with auth
						setUser(session.user);
					}
				} else if (event === "SIGNED_OUT") {
					setAuth(false);
					setUser(null);
				}
			}
		);
		setIsLoading(false);
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	useEffect(() => {
		setIsLoading(true);
		const getUser = async () => {
			const { data } = await supabase.auth.getUser();
			const { user: currentUser } = data;
			setUser(currentUser ?? null);
			setIsLoading(false);
		};
		getUser();
		// onAuthStateChange code below
	}, []);

	return (
		<AuthContext.Provider
			value={{
				userId,
				username,
				isLoggedIn,
				workouts,
				setIsLoggedIn,
				setUsername,
				setWorkouts,
				setUserId,
				user,
				auth,
			}}
		>
			{!isLoading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
