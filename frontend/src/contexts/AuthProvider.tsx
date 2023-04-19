import React, { FC, useEffect, useState } from "react";
import { IWorkout } from "../data";
import { supabase } from "../supabaseClient";
import App from "../App";

type IAuthContext = {
	userId: string;
	username: string;
	isLoggedIn: boolean;
	workouts: IWorkout[];
	isLoading: boolean;
	setIsLoggedIn: (loggedIn: boolean) => void;
	setUsername: (newName: string) => void;
	setWorkouts: (usersWorkouts: IWorkout[]) => void;
    setUserId: (userId: string) => void;
	setIsLoading: (loadin: boolean) => void;
};

export const AuthContext = React.createContext<IAuthContext>({
	userId: "",
	username: "",
	isLoggedIn: false,
	workouts: [],
	isLoading: false, 
	setIsLoggedIn: () => {},
	setUsername: () => {},
	setWorkouts: () => {},
    setUserId: () => {},
	setIsLoading: () => {}

});

const AuthProvider = () => {
	const [userId, setUserId] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [workouts, setWorkouts] = useState<IWorkout[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);



	return (
		<AuthContext.Provider
			value={{
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

			}}
		>
			<App />
		</AuthContext.Provider>
	);
};

export default AuthProvider;
