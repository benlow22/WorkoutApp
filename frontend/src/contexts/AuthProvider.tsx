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

    // when going to AuthPage, get session, set if logged in
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		setIsLoading(false);
		return () => subscription.unsubscribe();
	}, []);


    // if there is a session, get userId (sets it to provider), turn logged in to TRUE
	useEffect(() => {
		if (session) {
			getUserId();
			setIsLoggedIn(true);
		}
	}, [session]);

    // once user ID is set/changed, get username 
	useEffect(() => {
		if (userId) {
			getUsername();
		}
	}, [userId]);

    //once username is set or changed, check if id does not nexists, then set logged in to false 
    // logs user out if userID is gone, unnessary ??? 
	useEffect(() => {
		if (!userId) {
			setIsLoggedIn(false);
		}
	}, [username]);

    // once logged in and username is gotten, redirect to workouts 
    
	// useEffect(() => {
	// 	if (isLoggedIn) {
	// 		navigate('/workouts')
	// 	}
	// }, [username]);




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
			console.error("Error getting User", error);
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
			setIsLoading(false);
		} catch (error) {
			console.error("Error while getting Username", error);
		}
	};

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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
