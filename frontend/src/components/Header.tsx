import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./LogOutButton";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { supabase } from "../supabaseClient";

export const Header: React.FC<{}> = () => {
	const { username, isLoggedIn, setUsername, userId } =
		useContext(AuthContext);
		const [isLoading, setIsLoading] = useState<boolean>(true);
		const [isUsername, setIsUsername] = useState<string>('');

	useEffect(() => {
		// const getUsername = async () => {
		// 	const { data, error } = await supabase.from('profiles').select('username').eq('id', userId);
		// 	console.log('ASDF ASDF ', data)
		// 	if (data && data.length > 0) {
		// 		setUsername(data[0].username)
		// 		setTimeout(()=>setIsLoading(false),1)
		// 	}
		// };
		// getUsername();
		if(username.length > 0) {
			setIsUsername(username)
			setIsLoading(false)
		}

	}, [username]);

	return (
		<div className="header">
			<Link to="/workouts">
				<h1>Workout Buddy</h1>
			</Link>
			<div className="account">
				{(isLoggedIn && !isLoading) && (
					<>
						<Link to="/createUsername">
							{!isUsername ? "Create Username" : isUsername}
						</Link>
						<LogoutButton />
					</>
				)}
			</div>
		</div>
	);
};
