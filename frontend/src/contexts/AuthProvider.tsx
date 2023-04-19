import React, { FC, useEffect, useState } from "react";
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

const AuthProvider = () => {
	const [userId, setUserId] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [workouts, setWorkouts] = useState<IWorkout[]>([]);



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
			<App />
		</AuthContext.Provider>
	);
};

export default AuthProvider;
