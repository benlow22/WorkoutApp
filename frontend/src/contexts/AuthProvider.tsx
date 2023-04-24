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

type IChildren = {
	children: React.ReactNode
 }

const AuthProvider: React.FC<IChildren> = ({children }) => {
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
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
